import axios from "axios";

const API_BASE_URL = "https://frontend-take-home-service.fetch.com";

export const AuthService = {
  async login(name, email) {
    try {
      const response = await axios.post(
        `${API_BASE_URL}/auth/login`,
        { name, email },
        {
          withCredentials: true,
          headers: { "Content-Type": "application/json" },
        },
      );

      return response;
    } catch (error) {
      throw error;
    }
  },

  async logout() {
    try {
      await axios.post(
        `${API_BASE_URL}/auth/logout`,
        {},
        { withCredentials: true },
      );
    } catch (error) {
      console.error("Logout failed:", error);
    }
  },

  async isAuthenticated() {
    try {
      await axios.get(`${API_BASE_URL}/dogs/search`, {
        withCredentials: true,
      });

      return true;
    } catch (error) {
      return false;
    }
  },
};
