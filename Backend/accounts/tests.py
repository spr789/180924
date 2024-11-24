import { AuthService } from './services/auth'; // Update path based on your structure

const authService = new AuthService();

const credentials = {
  phone_number: "7893343436",
  password: "123",
};

authService
  .login(credentials)
  .then(response => {
    console.log('Login successful!');
    console.log('Access Token:', response.data.access);
    console.log('Refresh Token:', response.data.refresh);
    console.log('User Info:', response.data.user);
  })
  .catch(error => {
    console.error('Login failed:', error.response?.data || error.message);
  });
