interface User {
  fullName: string;
  email: string;
  password: string;
}

// Check if there's existing user data in localStorage
const getSavedUsers = (): User[] => {
  const savedData = localStorage.getItem('users');
  if (savedData) {
    return JSON.parse(savedData);
  }
  return []; // Return an empty array if no users are found
};

// Save user data to localStorage
export const saveUser = (user: User) => {
  const users = getSavedUsers(); // Get current users from localStorage
  users.push(user); // Add new user
  localStorage.setItem('users', JSON.stringify(users)); // Save updated users back to localStorage
};

// Retrieve all users from localStorage
export const getUsers = (): User[] => {
  return getSavedUsers();
};
