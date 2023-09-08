import { logout } from './authSlice'; // Import your logout action from authSlice.js

const setupLogoutOnClose = (store) => {
  // Listen for the beforeunload event
  window.addEventListener('beforeunload', (event) => {
    // Dispatch the logout action to log the user out
    store.dispatch(logout());
    // Customize the confirmation message if needed
    event.returnValue = 'Are you sure you want to leave?';
  });
};

export default setupLogoutOnClose;