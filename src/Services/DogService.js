import axios from "axios";

const API_BASE_URL = "https://frontend-take-home-service.fetch.com";

export const DogService = {
  async searchDogs({
    breeds = [],
    zipCodes = [],
    ageMin,
    ageMax,
    size = 12,
    from,
    sort = "breed:asc",
  }) {
    try {
      const params = new URLSearchParams();

      if (breeds.length)
        breeds.forEach((breed) => params.append("breeds", breed));
      if (zipCodes.length)
        zipCodes.forEach((zip) => params.append("zipCodes", zip));
      if (ageMin) params.append("ageMin", ageMin);
      if (ageMax) params.append("ageMax", ageMax);
      if (size) params.append("size", size);
      if (from) {
        params.append("from", from);
      }
      if (sort) params.append("sort", sort);

      const response = await axios.get(
        `${API_BASE_URL}/dogs/search?${params.toString()}`,
        {
          withCredentials: true,
          headers: { "Content-Type": "application/json" },
        },
      );

      return response.data;
    } catch (error) {
      console.error("Error searching for dogs:", error);
      throw error;
    }
  },

  async getDogs(dogIds) {
    try {
      if (!dogIds.length) return [];

      const response = await axios.post(`${API_BASE_URL}/dogs`, dogIds, {
        withCredentials: true,
        headers: { "Content-Type": "application/json" },
      });

      return response.data;
    } catch (error) {
      console.error("Error fetching dog details:", error);
      throw error;
    }
  },

  async getMatch(dogIds) {
    try {
      if (!dogIds.length) return null;

      const response = await axios.post(`${API_BASE_URL}/dogs/match`, dogIds, {
        withCredentials: true,
        headers: { "Content-Type": "application/json" },
      });

      return response.data.match;
    } catch (error) {
      console.error("Error getting a match:", error);
      throw error;
    }
  },
};
