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

  //footer header info
  getFooterHeaderInfo: async () => {
    try {
      const response = await axios.get(
        `${Constants.BASE_URL}${Constants.FOOTER_HEADER}`
      );
      return response.data;
    } catch (error) {
      console.log("error getting footer header info", error);
      throw error;
    }
  },

  saveFooterHeaderInfo: async (payload) => {
    try {
      const response = await axios.post(
        `${Constants.BASE_URL}${Constants.FOOTER_HEADER}`,
        payload
      );
      return response.data;
    } catch (error) {
      console.log("error saving footer header info", error);
      throw error;
    }
  },

  updateFooterHeaderInfo: async (payload, id) => {
    try {
      const response = await axios.put(
        `${Constants.BASE_URL}${Constants.FOOTER_HEADER}${id}`,
        payload
      );
      return response.data;
    } catch (error) {
      console.log("error updating footer header info", error);
      throw error;
    }
  },

  //footer sections
  getSectionHeaders: async () => {
    try {
      const response = await axios.get(
        `${Constants.BASE_URL}${Constants.FOOTER_SECTION}${Constants.FOOTER_SECTION_HEADERS}`
      );
      return response.data;
    } catch (error) {
      console.log("error getting FooterSection info", error);
      throw error;
    }
  },
  getFooterSectionInfo: async () => {
    try {
      const response = await axios.get(
        `${Constants.BASE_URL}${Constants.FOOTER_SECTION}`
      );
      return response.data;
    } catch (error) {
      console.log("error getting FooterSection info", error);
      throw error;
    }
  },

  saveFooterSectionInfo: async (payload) => {
    try {
      const response = await axios.post(
        `${Constants.BASE_URL}${Constants.FOOTER_SECTION}`,
        payload
      );
      return response.data;
    } catch (error) {
      console.log("error saving FooterSection info", error);
      throw error;
    }
  },

  updateFooterSectionInfo: async (payload, id) => {
    try {
      const response = await axios.put(
        `${Constants.BASE_URL}${Constants.FOOTER_SECTION}${id}`,
        payload
      );
      return response.data;
    } catch (error) {
      console.log("error updating FooterSection info", error);
      throw error;
    }
  },

  deleteFooterSectionInfo: async (id) => {
    try {
      const response = await axios.delete(
        `${Constants.BASE_URL}${Constants.FOOTER_SECTION}${id}`
      );
      return response.data;
    } catch (error) {
      console.log("error updating FooterSection info", error);
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

  //price plan
  getPricingPlanDetails: async () => {
    try {
      const response = await axios.get(
        `${Constants.BASE_URL}${Constants.PRICE_PLAN}`
      );
      return response.data;
    } catch (error) {
      console.log("error while getting the PricingPlan data", error);
    }
  },

  savePricingPlanDetails: async (payload) => {
    try {
      const response = await axios.post(
        `${Constants.BASE_URL}${Constants.PRICE_PLAN}`,
        payload
      );
      return response.data;
    } catch (error) {
      console.log("error while creating PricingPlan details", error);
      throw error;
    }
  },

  updatePricingPlanDetails: async (payload, id) => {
    try {
      const response = await axios.put(
        `${Constants.BASE_URL}${Constants.PRICE_PLAN}${id}`,
        payload
      );
      return response.data;
    } catch (error) {
      console.log("error while updating PricingPlan details", error);
      throw error;
    }
  },

  deletePricingPlanDetails: async (id) => {
    try {
      const response = await axios.delete(
        `${Constants.BASE_URL}${Constants.PRICE_PLAN}${id}`
      );
      return response.data;
    } catch (error) {
      console.log("error while deleteing Testimonials details", error);
      throw error;
    }
  },

  //pricing settings

  getPricingDetails: async () => {
    try {
      const response = await axios.get(
        `${Constants.BASE_URL}${Constants.PRICING_PAGE}`
      );
      return response.data;
    } catch (error) {
      console.log("error while getting the Pricing data", error);
    }
  },

  savePricingDetails: async (payload) => {
    try {
      const response = await axios.post(
        `${Constants.BASE_URL}${Constants.PRICING_PAGE}`,
        payload
      );
      return response.data;
    } catch (error) {
      console.log("error while creating Pricing details", error);
      throw error;
    }
  },

  updatePricingDetails: async (payload, id) => {
    try {
      const response = await axios.put(
        `${Constants.BASE_URL}${Constants.PRICING_PAGE}${id}`,
        payload
      );
      return response.data;
    } catch (error) {
      console.log("error while updating Pricing details", error);
      throw error;
    }
  },

  deletePricingDetails: async (id) => {
    try {
      const response = await axios.delete(
        `${Constants.BASE_URL}${Constants.PRICING_PAGE}${id}`
      );
      return response.data;
    } catch (error) {
      console.log("error while deleteing Pricing details", error);
      throw error;
    }
  },

  //social media page

  getSocialMediaDetails: async () => {
    try {
      const response = await axios.get(
        `${Constants.BASE_URL}${Constants.SOCIAL_MEDIA}`
      );
      return response.data;
    } catch (error) {
      console.log("error getting the social media details", error);
      throw error;
    }
  },
  saveSocialMediaDetails: async (payload) => {
    try {
      const response = await axios.post(
        `${Constants.BASE_URL}${Constants.SOCIAL_MEDIA}`,
        payload
      );
      return response.data;
    } catch (error) {
      console.log("error saving the social media details", error);
      throw error;
    }
  },
  updateSocialMediaDetails: async (payload, id) => {
    try {
      const response = await axios.put(
        `${Constants.BASE_URL}${Constants.SOCIAL_MEDIA}${id}`,
        payload
      );
      return response.data;
    } catch (error) {
      console.log("error updating the social media details", error);
      throw error;
    }
  },

  deleteSocialMediaDetails: async (id) => {
    try {
      const response = await axios.delete(
        `${Constants.BASE_URL}${Constants.SOCIAL_MEDIA}${id}`
      );
      return response.data;
    } catch (error) {
      console.log("error deleting the social media details", error);
      throw error;
    }
  },
  //product category page
  getProductCategoryDetails: async () => {
    try {
      const response = await axios.get(
        `${Constants.BASE_URL}${Constants.PRODUCT_CATEGORY}`
      );
      return response.data;
    } catch (error) {
      console.log("error getting the product category details", error);
      throw error;
    }
  },
  saveProductCategoryDetails: async (payload) => {
    try {
      const response = await axios.post(
        `${Constants.BASE_URL}${Constants.PRODUCT_CATEGORY}`,
        payload
      );
      return response.data;
    } catch (error) {
      console.log("error saving the product category details", error);
      throw error;
    }
  },
  updateProductCategoryDetails: async (payload, id) => {
    try {
      const response = await axios.put(
        `${Constants.BASE_URL}${Constants.PRODUCT_CATEGORY}${id}`,
        payload
      );
      return response.data;
    } catch (error) {
      console.log("error updating the product category details", error);
      throw error;
    }
  },

  deleteProductCategoryDetails: async (id) => {
    try {
      const response = await axios.delete(
        `${Constants.BASE_URL}${Constants.PRODUCT_CATEGORY}${id}`
      );
      return response.data;
    } catch (error) {
      console.log("error deleting the product category details", error);
      throw error;
    }
  },

  //blog categories

  getBlogCategoryDetails: async () => {
    try {
      const response = await axios.get(
        `${Constants.BASE_URL}${Constants.BLOG_CATEGORY}`
      );
      return response.data;
    } catch (error) {
      console.log("error getting the Blog category details", error);
      throw error;
    }
  },
  saveBlogCategoryDetails: async (payload) => {
    try {
      const response = await axios.post(
        `${Constants.BASE_URL}${Constants.BLOG_CATEGORY}`,
        payload
      );
      return response.data;
    } catch (error) {
      console.log("error saving the Blog category details", error);
      throw error;
    }
  },
  updateBlogCategoryDetails: async (payload, id) => {
    try {
      const response = await axios.put(
        `${Constants.BASE_URL}${Constants.BLOG_CATEGORY}${id}`,
        payload
      );
      return response.data;
    } catch (error) {
      console.log("error updating the Blog category details", error);
      throw error;
    }
  },

  deleteBlogCategoryDetails: async (id) => {
    try {
      const response = await axios.delete(
        `${Constants.BASE_URL}${Constants.BLOG_CATEGORY}${id}`
      );
      return response.data;
    } catch (error) {
      console.log("error deleting the Blog category details", error);
      throw error;
    }
  },

  //product page
  getProductDetails: async () => {
    try {
      const response = await axios.get(
        `${Constants.BASE_URL}${Constants.PRODUCTS_PAGE}`
      );
      return response.data;
    } catch (error) {
      console.log("error getting the Product details", error);
      throw error;
    }
  },
  saveProductDetails: async (payload) => {
    try {
      const response = await axios.post(
        `${Constants.BASE_URL}${Constants.PRODUCTS_PAGE}`,
        payload
      );
      return response.data;
    } catch (error) {
      console.log("error saving the Product details", error);
      throw error;
    }
  },
  updateProductDetails: async (payload, id) => {
    try {
      const response = await axios.put(
        `${Constants.BASE_URL}${Constants.PRODUCTS_PAGE}${id}`,
        payload
      );
      return response.data;
    } catch (error) {
      console.log("error updating the Product details", error);
      throw error;
    }
  },

  deleteProductDetails: async (id) => {
    try {
      const response = await axios.delete(
        `${Constants.BASE_URL}${Constants.PRODUCTS_PAGE}${id}`
      );
      return response.data;
    } catch (error) {
      console.log("error deleting the Product details", error);
      throw error;
    }
  },

  //blog details
  getBlogDetails: async () => {
    try {
      const response = await axios.get(
        `${Constants.BASE_URL}${Constants.BLOGS_PAGE}`
      );
      return response.data;
    } catch (error) {
      console.log("error while getting the Blog data", error);
    }
  },

  saveBlogDetails: async (formdata) => {
    try {
      const response = await axios.post(
        `${Constants.BASE_URL}${Constants.BLOGS_PAGE}`,
        formdata,
        { headers: { "Content-Type": "multipart/form-data" } }
      );
      return response.data;
    } catch (error) {
      console.log("error while creating Blog details", error);
      throw error;
    }
  },

  updateBlogDetails: async (formdata, id) => {
    try {
      const response = await axios.put(
        `${Constants.BASE_URL}${Constants.BLOGS_PAGE}${id}`,
        formdata,
        { headers: { "Content-Type": "multipart/form-data" } }
      );
      return response.data;
    } catch (error) {
      console.log("error while updating Blog details", error);
      throw error;
    }
  },

  deleteBlogDetails: async (id) => {
    try {
      const response = await axios.delete(
        `${Constants.BASE_URL}${Constants.BLOGS_PAGE}${id}`
      );
      return response.data;
    } catch (error) {
      console.log("error while deleteing Blog details", error);
      throw error;
    }
  },
};

export default api;
