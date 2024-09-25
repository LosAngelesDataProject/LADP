import axios from "axios";

var developersService = {
  endpoint: "https://localhost:7035/api/Developers", 
};

const getDevelopers = () => {
  const config = {
    method: "GET",
    url: developersService.endpoint,
    headers: { "Content-Type": "application/json" },
    withCredentials: true,
  };

  return axios(config)
    .then((response) => response.data)
    .catch((error) => {
      console.error("Error fetching developers:", error);
      throw error;
    });
};

export { getDevelopers };
