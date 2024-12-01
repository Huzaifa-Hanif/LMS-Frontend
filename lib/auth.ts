"use client";
// export const getUserDataFromLocalStorage = () => {
//   if (typeof window !== "undefined") {

//   try {
//     const user = localStorage.getItem("user");
//     if (user) {
//       return JSON.parse(user);
//     }
//     console.log("No user data found in localStorage.");
//     return null; // Return null if no user data
//   } catch (error) {
//     console.error("Error parsing user data from localStorage:", error);
//     return null; // Return null in case of an error
//   }}
// };
export const getUserDataFromLocalStorage = () => {
  if (typeof window !== "undefined") {
    try {
      const user = localStorage.getItem("user");
      if (user) {
        return JSON.parse(user);
      }

      // If user data doesn't exist, check for the access token
      const accessToken = localStorage.getItem("accessToken");
      if (accessToken) {
        const userData = parseAccessToken(accessToken);
        console.log(userData, "usss");
        return userData;
      }

      console.log("No user data or access token found in localStorage.");
      return null; // Return null if no user data or access token
    } catch (error) {
      console.error("Error parsing data from localStorage:", error);
      return null; // Return null in case of an error
    }
  }
};

const parseAccessToken = (token) => {
  try {
    const base64Url = token.split(".")[1];
    const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    const decoded = JSON.parse(atob(base64));
    return decoded;
  } catch (error) {
    console.error("Error decoding access token:", error);
    return null;
  }
};

export const isUserType = () => {
  const userData = getUserDataFromLocalStorage();
  return userData && userData.type === "TEACHER";
};
