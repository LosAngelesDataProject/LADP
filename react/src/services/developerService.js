import axios from "axios";

var developersService = {
  endpoint: "http://localhost:3001/developers", 
};

const getDevelopers = () => {
  const config = {
    method: "GET",
    url: developersService.endpoint,
    headers: { "Content-Type": "application/json" }
  };

  return axios(config)
    .then((response) => response.data)
    .catch((error) => {
      console.error("Error fetching developers:", error);
      throw error;
    });
};

export { getDevelopers };
