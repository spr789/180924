// /lib/api/utils/validation.ts

// Example of validating a required field in a form or API request
export function validateRequiredFields(fields: Record<string, any>, requiredFields: string[]): boolean {
  for (const field of requiredFields) {
    if (!fields[field]) {
      console.error(`Validation Error: ${field} is required.`);
      return false; // Return false if any required field is missing
    }
  }
  return true; // Return true if all required fields are present
}

// Example of validating an email format
export function validateEmail(email: string): boolean {
  const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
  if (!emailRegex.test(email)) {
    console.error('Validation Error: Invalid email format.');
    return false;
  }
  return true;
}

// Example of validating a phone number (basic validation)
export function validatePhoneNumber(phone: string): boolean {
  const phoneRegex = /^[0-9]{10}$/;
  if (!phoneRegex.test(phone)) {
    console.error('Validation Error: Invalid phone number format.');
    return false;
  }
  return true;
}
