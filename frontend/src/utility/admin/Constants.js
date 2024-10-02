const API_HOST = import.meta.env.VITE_APP_API_HOST;
const API_PORT = import.meta.env.VITE_APP_API_PORT;

const Constants = Object.freeze({
  BASE_URL: `${API_HOST}:${API_PORT}`,

  //dashboard

  //favicon settings
  FAVICON: "/favicon-settings/",
});

export default Constants;
