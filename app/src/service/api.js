import axios from "axios";
const URL = "https://visionary-api.onrender.com";
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

export const addToCart = async (prod, account) => {
  try {
    const response = await fetch(`${URL}/add`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ product:prod, account:account })
    });
    // Returns new account data
    return response.json();
  } catch (error) {
    console.log("Error while adding to cart", error);
  }
};
export const handleQuantityChange = async (prod, account, change) => {
  try {
    const response = await fetch(`${URL}/change`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ product:prod, account:account , change})
    });
    // Returns new account data
    return response.json();
  } catch (error) {
    console.log("Error while adding to cart", error);
  }
};
export const isInCart = async (prod, account) => {
  try {
    const response = await fetch(`${URL}/check`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ product:prod, account:account })
    });
    // Returns new account data
    return await response.json();
  } catch (error) {
    console.log("Error while adding to cart", error);
  }
}