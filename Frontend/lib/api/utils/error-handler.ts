import { AxiosError } from 'axios'; // Import AxiosError type
import { ERROR_MESSAGES } from './constants'; // Import error messages from constants

// Standardize error messages from the API response
export function handleError(error: AxiosError): void {
  if (error.response) {
    // Server-side errors
    const { status, data } = error.response as { status: number; data: { message?: string } }; // Type assertion for response
    let errorMessage = data.message || ERROR_MESSAGES.INTERNAL_SERVER_ERROR; // Use specific error message if available

    // Handle different HTTP status codes
    switch (status) {
      case 400:
        console.error(`Bad Request: ${errorMessage}`);
        break;
      case 401:
        console.error(`Unauthorized: ${errorMessage}`);
        break;
      case 403:
        console.error(`Forbidden: ${errorMessage}`);
        break;
      case 404:
        console.error(`Not Found: ${ERROR_MESSAGES.NOT_FOUND}`);
        break;
      case 500:
        console.error(`Internal Server Error: ${errorMessage}`);
        break;
      default:
        console.error(`Error: ${errorMessage}`);
    }
  } else {
    // Client-side or network errors
    console.error(`Network or unexpected error: ${error.message}`);
  }
}

// Optionally, you can implement a retry mechanism for failed API calls
export function retryRequest(fn: Function, retries: number = 3): Promise<any> {
  return new Promise((resolve, reject) => {
    function attempt() {
      fn()
        .then(resolve)
        .catch((error: any) => {
          if (retries > 0) {
            console.log(`Retrying... Attempts left: ${retries}`);
            retries -= 1;
            attempt();
          } else {
            reject(error);
          }
        });
    }

    attempt();
  });
}
