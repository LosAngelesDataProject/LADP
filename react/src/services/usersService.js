import axios from "axios";

var userService = {
  endpoint: "http://localhost:5197/api/user",
};

const registerUser = (payload) => {
  const config = {
    method: "POST",
    url: `${userService.endpoint}`,
    data: payload,
    withCredentials: true,
    crossdomain: true,
    headers: { "Content-Type": "application/json" },
  };
  console.log("register working right?");
  return axios(config);
};

const getCurrentUser = () => {
  const config = {
    method: "GET",
    url: `${userService.endpoint}/current`,
    crossdomain: true,
    headers: { "Content-Type": "application/json" }
  }
  return axios(config)
}

const updateUser = (payload) => {
  const config = {
    method: "PUT",
    url: `${userService.endpoint}`,
    data: payload,
    withCredentials: true,
    crossdomain: true,
    headers: { "Content-Type": "application/json" },
  }
  return axios(config)
}

const confirmAccount = (tokenId) => {
  const config = {
    method: "PUT",
    url: `${userService.endpoint}/confirmuser?tokenId=${tokenId}`,
    withCredentials: true,
    crossdomain: true,
    headers: { "Content-Type": "application/json" },

  }
  console.log("user information updated")
  return axios(config)
}

export default { registerUser, updateUser, getCurrentUser, confirmAccount };
