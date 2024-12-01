// Decode JWT token without an external package (works on the client side)
export const DecodeToken = (token: string) => {
  try {
    // JWT tokens consist of 3 parts: header, payload, and signature
    // The payload is the middle part and contains the user data
    const payload = token.split(".")[1];
    const decoded = JSON.parse(atob(payload)); // Decode base64 payload
    return decoded;
  } catch (error) {
    console.error("Error decoding token:", error);
    return null;
  }
};
