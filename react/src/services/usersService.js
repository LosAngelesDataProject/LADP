import axios from "axios";

var userService = {
  endpoint: "http://localhost:5173/",
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
  console.log("user information updated")
  return axios(config)
}

export { registerUser, updateUser, getCurrentUser };
