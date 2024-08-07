import axios from "axios";

var loginService = {
  endpoint: "http://localhost:5173/",
};

const loginUser = (payload) => {
  const config = {
    method: "POST",
    url: `${loginService.endpoint}`,
    data: payload,
    withCredentials: true,
    crossdomain: true,
    headers: { "Content-Type": "application/json" },
  };
  return axios(config);
};

export default loginUser;
