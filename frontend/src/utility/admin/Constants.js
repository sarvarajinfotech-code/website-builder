const API_HOST = import.meta.env.VITE_APP_API_HOST;
const API_PORT = import.meta.env.VITE_APP_API_PORT;

const Constants = Object.freeze({
  BASE_URL: `${API_HOST}:${API_PORT}`,

  //pages
  CLIENT_PAGE: "client",
  TEAM_PAGE: "team",
  TESTIMONIALS: "testimonials",
  PRODUCTS: "products",
  PRICING: "pricing",
  Blog: "blogs",

  //header text
  HEADER_TEXT: "/headers/",

  //category
  PRODUCT_CATEGORY: "/product-categories/",
  BLOG_CATEGORY: "/blog-categories/",

  //favicon settings
  FAVICON: "/favicon-settings/",

  //email settings
  EMAIL_SETTINGS: "/email_settings/",

  //banner settings
  BANNER_SETTINGS: "/banners/",

  //colors settings
  COLORS_SETTINGS: "/color-themes/",

  //navigation settings
  NAVIGATION_SETTINGS: "/navigation-settings/",

  //home page
  HOME_PAGE_SETTINGS: "/home-page-settings/",

  //client page
  CLIENT_SETTINGS: "/clients/",

  //team page
  TEAM_SETTINGS: "/team/",

  //testimonial page
  TESTIMONIAL_PAGE: "/testimonials/",

  //pricing page
  PRICING_PAGE: "/prices/",

  //price plan
  PRICE_PLAN: "/price-plans/",

  //products page
  PRODUCTS_PAGE: "/products/",

  //social media page
  SOCIAL_MEDIA: "/social-media/",
});

export default Constants;
