import axios from "axios";
import Constants from "./Constants";

const api = {
  // fetch image from local
  getImage: async (imagePath) => {
    try {
      const response = await axios.get(imagePath, {
        responseType: "blob",
      });

      const file = new File(
        [response.data],
        { imagePath },
        {
          type: response.headers["content-type"],
        }
      );
      return file;
    } catch (error) {
      console.error("Error fetching the image file:", error);
      throw error;
    }
  },

  //header info
  getHeaderInfo: async (page) => {
    try {
      const response = await axios.get(
        `${Constants.BASE_URL}${Constants.HEADER_TEXT}`,
        {
          params: {
            page: page,
          },
        }
      );
      return response.data;
    } catch (error) {
      console.error("Error getting header text details:", error);
      throw error;
    }
  },

  saveHeaderInfo: async (payload) => {
    try {
      const response = await axios.post(
        `${Constants.BASE_URL}${Constants.HEADER_TEXT}`,
        payload
      );
      return response.data;
    } catch (error) {
      console.error("Error creating header text details:", error);
      throw error;
    }
  },
  updateHeaderInfo: async (payload, id) => {
    try {
      const response = await axios.put(
        `${Constants.BASE_URL}${Constants.HEADER_TEXT}${id}`,
        payload
      );
      return response.data;
    } catch (error) {
      console.error("Error updating header text details:", error);
      throw error;
    }
  },

  //Favicon settings
  getFaviconDetails: async () => {
    try {
      const response = await axios.get(
        `${Constants.BASE_URL}${Constants.FAVICON}`
      );
      return response.data;
    } catch (error) {
      console.error("Error getting favicon details:", error);
      throw error;
    }
  },

  saveFaviconSettings: async (formData) => {
    try {
      const response = await axios.post(
        `${Constants.BASE_URL}${Constants.FAVICON}`,
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );
      return response.data;
    } catch (error) {
      console.error("Error saving favicon settings:", error);
      throw error;
    }
  },

  updateFaviconSettings: async (formData, id) => {
    try {
      const response = await axios.put(
        `${Constants.BASE_URL}${Constants.FAVICON}${id}`,
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );
      return response.data;
    } catch (error) {
      console.error("Error updating favicon settings:", error);
      throw error;
    }
  },

  //Email settings
  getEmailSettingsDetails: async () => {
    try {
      const response = await axios.get(
        `${Constants.BASE_URL}${Constants.EMAIL_SETTINGS}`
      );
      return response.data;
    } catch (error) {
      console.error("Error getting email settings details:", error);
      throw error;
    }
  },

  saveEmailSettings: async (payload) => {
    try {
      const response = await axios.post(
        `${Constants.BASE_URL}${Constants.EMAIL_SETTINGS}`,
        payload
      );
      return response.data;
    } catch (error) {
      console.error("Error saving email settings:", error);
      throw error;
    }
  },

  updateEmailSettings: async (payload, id) => {
    try {
      const response = await axios.put(
        `${Constants.BASE_URL}${Constants.EMAIL_SETTINGS}${id}`,
        payload
      );
      return response.data;
    } catch (error) {
      console.error("Error updating email settings:", error);
      throw error;
    }
  },

  //Banner settings
  getBannerSettingsDetails: async () => {
    try {
      const response = await axios.get(
        `${Constants.BASE_URL}${Constants.BANNER_SETTINGS}`
      );
      return response.data;
    } catch (error) {
      console.error("Error getting email settings details:", error);
      throw error;
    }
  },

  saveBannerSettings: async (payload) => {
    try {
      const response = await axios.post(
        `${Constants.BASE_URL}${Constants.BANNER_SETTINGS}`,
        payload
      );
      return response.data;
    } catch (error) {
      console.error("Error saving banner settings:", error);
      throw error;
    }
  },

  updateBannerSettings: async (payload, id) => {
    try {
      const response = await axios.put(
        `${Constants.BASE_URL}${Constants.BANNER_SETTINGS}${id}`,
        payload
      );
      return response.data;
    } catch (error) {
      console.error("Error updating banner settings:", error);
      throw error;
    }
  },

  //Colors settings
  getColorsSettingsDetails: async () => {
    try {
      const response = await axios.get(
        `${Constants.BASE_URL}${Constants.COLORS_SETTINGS}`
      );
      return response.data;
    } catch (error) {
      console.error("Error getting colors settings details:", error);
      throw error;
    }
  },

  saveColorsSettings: async (payload) => {
    try {
      const response = await axios.post(
        `${Constants.BASE_URL}${Constants.COLORS_SETTINGS}`,
        payload
      );
      return response.data;
    } catch (error) {
      console.error("Error saving colors settings:", error);
      throw error;
    }
  },

  updateColorsSettings: async (payload, id) => {
    try {
      const response = await axios.put(
        `${Constants.BASE_URL}${Constants.COLORS_SETTINGS}${id}`,
        payload
      );
      return response.data;
    } catch (error) {
      console.error("Error updating colors settings:", error);
      throw error;
    }
  },

  //naviagtion settings
  getNavigationSettingsDetails: async () => {
    try {
      const response = await axios.get(
        `${Constants.BASE_URL}${Constants.NAVIGATION_SETTINGS}`
      );
      return response.data;
    } catch (error) {
      console.error("Error getting Navigation settings details:", error);
      throw error;
    }
  },

  saveNavigationSettings: async (formData) => {
    try {
      const response = await axios.post(
        `${Constants.BASE_URL}${Constants.NAVIGATION_SETTINGS}`,
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );
      return response.data;
    } catch (error) {
      console.error("Error saving Navigation settings:", error);
      throw error;
    }
  },

  updateNavigationSettings: async (formdata, id) => {
    try {
      const response = await axios.put(
        `${Constants.BASE_URL}${Constants.NAVIGATION_SETTINGS}${id}`,
        formdata,
        { headers: { "Content-Type": "multipart/form-data" } }
      );
      return response.data;
    } catch (error) {
      console.error("Error updating Navigation settings:", error);
      throw error;
    }
  },

  //home settings
  getHomePageDetails: async () => {
    try {
      const response = await axios.get(
        `${Constants.BASE_URL}${Constants.HOME_PAGE_SETTINGS}`
      );
      return response.data;
    } catch (error) {
      console.error("Error getting HomePage settings details:", error);
      throw error;
    }
  },

  saveHomePageSettings: async (formData) => {
    try {
      const response = await axios.post(
        `${Constants.BASE_URL}${Constants.HOME_PAGE_SETTINGS}`,
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );
      return response.data;
    } catch (error) {
      console.error("Error saving HomePage settings:", error);
      throw error;
    }
  },

  updateHomePageSettings: async (formdata, id) => {
    try {
      const response = await axios.put(
        `${Constants.BASE_URL}${Constants.HOME_PAGE_SETTINGS}${id}`,
        formdata,
        { headers: { "Content-Type": "multipart/form-data" } }
      );
      return response.data;
    } catch (error) {
      console.error("Error updating HomePage settings:", error);
      throw error;
    }
  },

  deleteHomePageSettings: async (id) => {
    try {
      const response = await axios.delete(
        `${Constants.BASE_URL}${Constants.HOME_PAGE_SETTINGS}${id}`
      );
      return response.data;
    } catch (error) {
      console.error("Error deleting HomePage settings:", error);
      throw error;
    }
  },

  //client page
  getClientDetails: async () => {
    try {
      const response = await axios.get(
        `${Constants.BASE_URL}${Constants.CLIENT_SETTINGS}`
      );
      return response.data;
    } catch (error) {
      console.log("error while getting client details", error);
      throw error;
    }
  },

  saveClientDetails: async (formdata) => {
    try {
      const response = await axios.post(
        `${Constants.BASE_URL}${Constants.CLIENT_SETTINGS}`,
        formdata,
        { headers: { "Content-Type": "multipart/form-data" } }
      );
      return response.data;
    } catch (error) {
      console.log("error while creating client details", error);
      throw error;
    }
  },

  updateClientDetails: async (formdata, id) => {
    try {
      const response = await axios.put(
        `${Constants.BASE_URL}${Constants.CLIENT_SETTINGS}${id}`,
        formdata,
        { headers: { "Content-Type": "multipart/form-data" } }
      );
      return response.data;
    } catch (error) {
      console.log("error while updating client details", error);
      throw error;
    }
  },

  deleteClientDetails: async (id) => {
    try {
      const response = await axios.delete(
        `${Constants.BASE_URL}${Constants.CLIENT_SETTINGS}${id}`
      );
      return response.data;
    } catch (error) {
      console.log("error while deleteing client details", error);
      throw error;
    }
  },

  //team page
  getTeamDetails: async () => {
    try {
      const response = await axios.get(
        `${Constants.BASE_URL}${Constants.TEAM_SETTINGS}`
      );
      return response.data;
    } catch (error) {
      console.log("error while getting the team data", error);
    }
  },

  saveTeamDetails: async (formdata) => {
    try {
      const response = await axios.post(
        `${Constants.BASE_URL}${Constants.TEAM_SETTINGS}`,
        formdata,
        { headers: { "Content-Type": "multipart/form-data" } }
      );
      return response.data;
    } catch (error) {
      console.log("error while creating team details", error);
      throw error;
    }
  },

  updateTeamDetails: async (formdata, id) => {
    try {
      const response = await axios.put(
        `${Constants.BASE_URL}${Constants.TEAM_SETTINGS}${id}`,
        formdata,
        { headers: { "Content-Type": "multipart/form-data" } }
      );
      return response.data;
    } catch (error) {
      console.log("error while updating team details", error);
      throw error;
    }
  },

  deleteTeamDetails: async (id) => {
    try {
      const response = await axios.delete(
        `${Constants.BASE_URL}${Constants.TEAM_SETTINGS}${id}`
      );
      return response.data;
    } catch (error) {
      console.log("error while deleteing team details", error);
      throw error;
    }
  },

  //testimonials
  getTestimonialsDetails: async () => {
    try {
      const response = await axios.get(
        `${Constants.BASE_URL}${Constants.TESTIMONIAL_PAGE}`
      );
      return response.data;
    } catch (error) {
      console.log("error while getting the Testimonials data", error);
    }
  },

  saveTestimonialsDetails: async (formdata) => {
    try {
      const response = await axios.post(
        `${Constants.BASE_URL}${Constants.TESTIMONIAL_PAGE}`,
        formdata,
        { headers: { "Content-Type": "multipart/form-data" } }
      );
      return response.data;
    } catch (error) {
      console.log("error while creating Testimonials details", error);
      throw error;
    }
  },

  updateTestimonialsDetails: async (formdata, id) => {
    try {
      const response = await axios.put(
        `${Constants.BASE_URL}${Constants.TESTIMONIAL_PAGE}${id}`,
        formdata,
        { headers: { "Content-Type": "multipart/form-data" } }
      );
      return response.data;
    } catch (error) {
      console.log("error while updating Testimonials details", error);
      throw error;
    }
  },

  deleteTestimonialsDetails: async (id) => {
    try {
      const response = await axios.delete(
        `${Constants.BASE_URL}${Constants.TESTIMONIAL_PAGE}${id}`
      );
      return response.data;
    } catch (error) {
      console.log("error while deleteing Testimonials details", error);
      throw error;
    }
  },
};

export default api;
