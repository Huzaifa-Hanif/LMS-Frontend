export interface ApiResponse<T> {
  success: boolean;
  message?: string; // Optional message for errors or success
  data?: T; // Generic data field for successful responses
}
