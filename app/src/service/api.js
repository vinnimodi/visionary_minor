import axios from "axios";
const URL = "http://localhost:5000";
export const authenticateSignUp = async (data) => {
  try {
    return await axios.post(`${URL}/signup`, data);
  } catch (error) {
    console.log("Error while Sign Up", error);
  }
};

export const authenticateLogin = async (data) => {
  try {
    return await axios.post(`${URL}/login`, data);
  } catch (error) {
    console.log("Error while log in", error);
    return error.response;
  }
};
