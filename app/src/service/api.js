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

export const addToCart = async (prod, account) => {
  try {
    // return await axios.post(`${URL}/cart/add`, { pid, account });
    // rewrite with fetch
    const response = await fetch(`${URL}/add`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ product:prod, account:account })
    });
    
    return response.json();
  } catch (error) {
    console.log("Error while adding to cart", error);
  }
};
export const handleQuantityChange = async (prod, account, change) => {
  try {
    // return await axios.post(`${URL}/cart/add`, { pid, account });
    // rewrite with fetch
    const response = await fetch(`${URL}/change`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ product:prod, account:account , change})
    });
    return response.json();
  } catch (error) {
    console.log("Error while adding to cart", error);
  }
};
export const isInCart = async (prod, account) => {
  try {
    // return await axios.post(`${URL}/cart/add`, { pid, account });
    // rewrite with fetch
    const response = await fetch(`${URL}/check`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ product:prod, account:account })
    });
    
    return await response.json();
  } catch (error) {
    console.log("Error while adding to cart", error);
  }
}