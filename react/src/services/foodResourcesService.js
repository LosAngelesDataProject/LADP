import axios from "axios";

const foodResourcesService = {
  endpoint: "http://localhost:5197/api/FoodResources",
};

foodResourcesService.getFoodResources = () => {
  const config = {
    method: "GET",
    url: foodResourcesService.endpoint,
    // withCredentials: true,
    crossdomain: true,
    headers: { "Content-Type": "application/json" },
  };

  return axios(config);
};

export default foodResourcesService;
