import SEO from "@/components/pages/admin/SEO";

const API_HOST = import.meta.env.VITE_APP_API_HOST;
const API_PORT = import.meta.env.VITE_APP_API_PORT;

const Constants = Object.freeze({
  BASE_URL: `${API_HOST}:${API_PORT}`,
  // BASE_URL: `${API_HOST}`,

  //pages
  CLIENT_PAGE: "client",
  TEAM_PAGE: "team",
  TESTIMONIALS: "testimonials",
  PRODUCTS: "products",
  SERVICES: "services",
  PRICING: "pricing",
  BLOGS: "blogs",
  WHY_CHOOSE_US: "whyChooseuse",
  SEO: "SEO",

  //header text
  HEADER_TEXT: "/headers/",

  //footer header
  FOOTER_HEADER: "/footer-header/",

  //product category
  PRODUCT_CATEGORY: "/product-categories/",

  //service category
  SERVICE_CATEGORY: "/service-categories/",

  //blog category
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

  //service page
  SERVICES_PAGE: "/services/",

  //blogs page
  BLOGS_PAGE: "/blogs/",

  //faq page
  FAQ_PAGE: "/faq/",

  //dynamic page
  DYNAMIC_PAGE: "/dynamic-page/",

  //contact page
  CONTACT_PAGE: "/contact/",

  //social media page
  SOCIAL_MEDIA: "/social-media/",

  //why choose us page
  WHY_CHOOSE_US_PAGE: "/why-choose-us/",

  //footer section
  FOOTER_SECTION: "/footer-section/",

  //footer section headers
  FOOTER_SECTION_HEADERS: "headers/",

  //paths
  PATH_PAGE: "/path/",

  BULK_UPLOAD: "/bulk/path",

  //subscribers
  SUBSCRIBERS: "/subscribers/",

  //get in touch
  GET_IN_TOUCH: "/get_in_touch/",

  //subscriber mail
  SUBSCRIBER_MAIL: "/send-subscription-email/",

  //query mai
  QUERY_MAIL: "/send-query-email/",

  //reset password
  RESET_PASSWORD: "/reset-password/",

  //reset password mail
  RESET_PASSWORD_MAIL: "/resend-reset-email/",

  //login
  LOGIN: "/login/",

  //meeting
  MEETING: "/meeting/",

  //seo
  SEO: "/seo_tags/",
});

export default Constants;
