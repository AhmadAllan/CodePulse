import { logout } from './authSlice';

const setupLogoutOnClose = (store) => {
  const LOGOUT_TIMEOUT = 3000; // Adjust the timeout duration as needed (in milliseconds)
  let tabClosedTimestamp = null;

  // Listen for the unload event to track tab closure
  window.addEventListener('unload', () => {
    // Store the current timestamp in localStorage
    localStorage.setItem('tabClosedTimestamp', Date.now());
  });

  // Listen for page load event
  window.addEventListener('load', () => {
    // Get the stored timestamp from localStorage
    const storedTimestamp = localStorage.getItem('tabClosedTimestamp');

    if (storedTimestamp) {
      const timeSinceClose = Date.now() - parseInt(storedTimestamp, 10);

      // If the tab was closed and reopened quickly, consider it a refresh
      if (timeSinceClose < LOGOUT_TIMEOUT) {
        localStorage.removeItem('tabClosedTimestamp'); // Remove the stored timestamp
      } else {
        // Dispatch the logout action to log the user out
        store.dispatch(logout());
      }
    }
  });
};

export default setupLogoutOnClose;