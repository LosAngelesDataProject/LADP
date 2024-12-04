import axios from "axios";

const foodResourcesService = {
  endpoint: "http://localhost:5197/api/FoodResources",
};

const getFoodResources = () => {
  const config = {
    method: "GET",
    url: foodResourcesService.endpoint,
    withCredentials: true,
    crossdomain: true,
    headers: { "Content-Type": "application/json" },
  };

  return axios(config)
    .then((response) => response.data)
    .catch((error) => {
      console.error("Error loading food resources.", error);
      throw error;
    });
};

export { getFoodResources };
