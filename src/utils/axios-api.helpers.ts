import Cookies from "js-cookie";

export const setTokenInCookies = (access_token: string) => {
  Cookies?.set("token", access_token);
};

export const getTokenFromCookies = () => {
  return Cookies?.get("token");
};

export const removeTokenFromCookies = () => {
  Cookies?.remove("token");
};

export const getAuthTokenFromLocalStore = (): string | null => {
  const auth = localStorage.getItem("auth");
  if (auth) {
    return JSON.parse(auth).token;
  }
  return null;
};

export const clearUserSessionFromLocalStore = () => {
  removeTokenFromCookies();
  // Perform any necessary cleanup tasks, e.g., clearing local storage
  localStorage.clear();
  // Redirect to the login page or perform any other required action
  // window.alert(
  //   "Attention: Your session has expired. Please log in again to continue accessing the system. Thank you!",
  // );
  // window.location.href = "/login"; // Replace with your desired logout destination
};
