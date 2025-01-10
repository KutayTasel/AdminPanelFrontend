import { ApiRequests } from "../api/Api";
import ToastService from "../services/ToastService";

const AuthService = {
  async LoginServiceAsync(data) {
    try {
      console.log("Starting login request:", data);
      const response = await ApiRequests.handleRequestPostAsync(
        "Auth/Login",
        data,
        null,
        false
      );

      if (response.status === 200 && response.data.token) {
        console.log("Login successful, received token:", response.data.token);
        return response;
      } else {
        const errorMessage =
          response.data.message || "Invalid username or password.";
        ToastService.toastError(errorMessage);
        return { status: response.status, error: errorMessage };
      }
    } catch (error) {
      const errorMessage = error.response?.data?.message;
      if (errorMessage) {
        ToastService.toastError(errorMessage);
      } else {
        console.error("Unexpected error:", error);
      }
      return { status: error.response?.status, error: errorMessage || null };
    }
  },

  async RegisterServiceAsync(data) {
    try {
      console.log("Starting registration request:", data);
      const response = await ApiRequests.handleRequestPostAsync(
        "Auth/Register",
        data,
        null,
        false
      );
      if (response.status === 201) {
        console.log("Registration successful! Redirecting...:", response.data);

        ToastService.toastSuccess(
          response.data.message || "Registration successful! Redirecting..."
        );

        return response;
      } else {
        const errorMessage = response.data?.message || "Registration failed.";
        ToastService.toastError(errorMessage);
        return { status: response.status, error: errorMessage };
      }
    } catch (error) {
      const errorMessage = error.response?.data?.message;
      if (errorMessage) {
        ToastService.toastError(errorMessage);
      } else {
        console.error("Unexpected error:", error);
      }
      return { status: error.response?.status, error: errorMessage || null };
    }
  },
  Logout() {
    sessionStorage.clear();
    console.log("User logged out, session cleared.");
    ToastService.toastInfo("Logged out successfully.");
  },
};

export default AuthService;
