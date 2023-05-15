import { useEffect, useState, useCallback, useContext } from "react";
import alanBtn from "@alan-ai/alan-sdk-web";
import { useNavigate } from "react-router-dom";
import { addToCart } from "./service/api";
import { DataContext } from "./context/DataProvider";
// import { DataContext } from "./context/DataProvider";

const COMMANDS = {
  CLOSE_CART: "close-cart",
  ADD_ITEM: "addItem",
  REMOVE_ITEM: "remove-item",
  PURCHASE_ITEMS: "purchase-items",
  CHOOSE_CAT: "choseCat",
  BACK: "back",
  HOME: "home",
  CHECKOUT: "checkout",
  LOGINOPEN: "loginOpen",
  ACTION: "action"
};

export default function useAlan() {
  const { account, setAccount } = useContext(DataContext);
  const navigate = useNavigate();
  const [alanInstance, setAlanInstance] = useState(null);
  // const {
  //   setShowCartItems,
  //   isCartEmpty,
  //   addToCart,
  //   removeFromCart,
  //   cart,
  // checkout,
  // } = useCart();


  const addItem = useCallback(
    async ({ detail: { name } }) => {
      console.log(name);
      if (account === null || account === undefined)
        return alanInstance.playText(
          `Please login to add the ${name} item to your cart`
        );
      if (name === "" || name == null || name === undefined)
        return alanInstance.playText(`I cannot find the ${name}`);
      const response = await fetch("http://localhost:5000/products");
      const data = await response.json();
      const item = data.find((i) =>
        i.Title.toLowerCase().includes(name.toLowerCase())
      );
      if (item == null) {
        alanInstance.playText(`I cannot find the ${name} item`);
      } else {
        const res = await addToCart(item, account);
        setAccount(res ? res.message : account);
        localStorage.setItem(
          "account",
          JSON.stringify(res ? res.message : account)
        );
        alanInstance.playText(`Added the ${name} item to your cart`);
      }
    },
    [alanInstance, account, setAccount]
  );

  const choseCat = useCallback(
    ({ detail: { name } }) => {
      alanInstance.playText("Sure, going to " + name + " category");
      navigate("/category/" + name);
    },
    [alanInstance, navigate]
  );

  const back = useCallback(() => {
    alanInstance.playText("Going Back");
    navigate(-1);
  }, [alanInstance, navigate]);

  const checkout = useCallback(async () => {
    alanInstance.playText("Ok, Checking out");
    const res = await fetch("http://localhost:5000/checkout", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        products: account.Cart,
        account
      })
    });
    const data = await res.json();
    console.log(data);
    window.location.href = data.url;
  }, [alanInstance, account]);

  const home = useCallback(() => {
    alanInstance.playText("Going to Home Page");
    navigate("/");
  }, [alanInstance, navigate]);


  const actionDo = useCallback(
    ({ detail: { name } }) => {
      switch (name) {
        case "login":
          document.getElementById("login").click();
    alanInstance.playText("Opened Login, Enter Username, Press Tab, Enter Password And press Enter");
    document.getElementById("username").focus();
    document.getElementById("password").addEventListener("focus",(e)=>{
      alanInstance.playText("Enter Password");
    }
      )
          break;
        case "signup":
          document.getElementById("signup").click();
          document.getElementById("username").focus();
          alanInstance.playText("Opened Signup");

          break;
        case "cart":
          document.getElementById("cart").click();
          break;
        case "logout":
          setAccount(null);
          localStorage.removeItem("account");
          alanInstance.playText("Logged Out");

          break;
        default:
          alanInstance.playText("I cannot find the " + name + " action");
      }
    },
    [alanInstance, setAccount]
  );

  useEffect(() => {
    window.addEventListener(COMMANDS.ADD_ITEM, addItem);
    window.addEventListener(COMMANDS.ACTION, actionDo);
    window.addEventListener(COMMANDS.CHOOSE_CAT, choseCat);
    window.addEventListener(COMMANDS.CHECKOUT, checkout);
    window.addEventListener(COMMANDS.BACK, back);
    window.addEventListener(COMMANDS.HOME, home);

    return () => {
      window.removeEventListener(COMMANDS.ADD_ITEM, addItem);
      window.removeEventListener(COMMANDS.ACTION, actionDo);
      window.removeEventListener(COMMANDS.CHOOSE_CAT, choseCat);
      window.removeEventListener(COMMANDS.CHECKOUT, checkout);
      window.removeEventListener(COMMANDS.HOME, home);
      window.removeEventListener(COMMANDS.BACK, back);
    };
  }, [choseCat, back, home, checkout, addItem, actionDo]);

  useEffect(() => {
    if (alanInstance != null) return;
    setAlanInstance(
      alanBtn({
        key: process.env.REACT_APP_ALAN_KEY,
        onCommand: ({ command, payload }) => {
          window.dispatchEvent(new CustomEvent(command, { detail: payload }));
        }
      })
      );
    }, [alanInstance]);
    
// const [greetingWasSaid, setGreetingWasSaid] = useState(false);
//   useEffect(() => {
//     if (alanInstance === null) return;
//     console.log(alanInstance);
//     (async () => {
//       console.log(await alanInstance.updateButtonState("Online"));

//       alanInstance.playText("Hello, I am Alan. How can I help you?");
//       setGreetingWasSaid(true);
//     })();
//   }, [alanInstance, greetingWasSaid]);
//   return null;
// }
}