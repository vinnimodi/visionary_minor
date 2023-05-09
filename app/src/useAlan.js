import { useEffect, useState, useCallback, useContext } from "react";
import alanBtn from "@alan-ai/alan-sdk-web";
import { useNavigate } from "react-router-dom";
import { addToCart } from "./service/api";
import { DataContext } from "./context/DataProvider";
// import { DataContext } from "./context/DataProvider";
// import { useCart } from "../context/CartContext";
// import storeItems from "../items.json";

const COMMANDS = {
  OPEN_CART: "open-cart",
  CLOSE_CART: "close-cart",
  ADD_ITEM: "addItem",
  REMOVE_ITEM: "remove-item",
  PURCHASE_ITEMS: "purchase-items",
  CHOOSE_CAT: "choseCat",
  BACK: "back",
  HOME: "home",
  CHECKOUT: "checkout"
};

export default function useAlan() {
  const { account } = useContext(DataContext);
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

  // const openCart = useCallback(() => {
  //   if (isCartEmpty) {
  //     alanInstance.playText("You have no items in your cart");
  //   } else {
  //     alanInstance.playText("Opening cart");
  //     setShowCartItems(true);
  //   }
  // }, [alanInstance, isCartEmpty, setShowCartItems]);

  // const closeCart = useCallback(() => {
  //   if (isCartEmpty) {
  //     alanInstance.playText("You have no items in your cart");
  //   } else {
  //     alanInstance.playText("Closing cart");
  //     setShowCartItems(false);
  //   }
  // }, [alanInstance, isCartEmpty, setShowCartItems]);

  const addItem = useCallback(
    async({ detail: { name } }) => {
      console.log(name);
      // if(name===""|| name==null || name===undefined) return alanInstance.playText(`I cannot find the ${name}`);
      const response = await fetch("http://localhost:5000/products");
      const data = await response.json();
      const item = data.find(
        (i) => i.Title.toLowerCase().includes(name.toLowerCase())
      );
      if (item == null) {
        alanInstance.playText(`I cannot find the ${name} item`);
      } else {
        addToCart(item,account);
        alanInstance.playText(
          `Added the ${name} item to your cart`
        );
      }
    },
    [alanInstance]
  );

  // const removeItem = useCallback(
  //   ({ detail: { name } }) => {
  //     const entry = cart.find(
  //       (e) => e.item.name.toLowerCase() === name.toLowerCase()
  //     );
  //     if (entry == null) {
  //       alanInstance.playText(`I cannot find the ${name} item in your cart`);
  //     } else {
  //       removeFromCart(entry.itemId);
  //       alanInstance.playText(`Removed the ${name} item from your cart`);
  //     }
  //   },
  //   [alanInstance, removeFromCart, cart]
  // );

  // const purchaseItems = useCallback(() => {
  //   if (isCartEmpty) {
  //     alanInstance.playText("Your cart is empty");
  //   } else {
  //     alanInstance.playText("Checking out");
  //     checkout();
  //   }
  // }, [alanInstance, isCartEmpty, checkout]);

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
  const checkout = useCallback(async() => {
    alanInstance.playText("Ok, Checking out");
    const res=await fetch("http://localhost:5000/checkout",{
      method:"POST",
      headers:{
        "Content-Type":"application/json"
      },
      body:JSON.stringify({
        products:account.Cart,
        account
      })
    })
    const data=await res.json();
    console.log(data);
    window.location.href=data.url;
  }, [alanInstance,account]);
  
  const home = useCallback(() => {
    alanInstance.playText("Going to Home Page");
    navigate("/");
  }, [alanInstance, navigate]);

  useEffect(() => {
    // window.addEventListener(COMMANDS.OPEN_CART, openCart);
    // window.addEventListener(COMMANDS.CLOSE_CART, closeCart);
    window.addEventListener(COMMANDS.ADD_ITEM, addItem);
    // window.addEventListener(COMMANDS.REMOVE_ITEM, removeItem);
    // window.addEventListener(COMMANDS.PURCHASE_ITEMS, purchaseItems);
    window.addEventListener(COMMANDS.CHOOSE_CAT, choseCat);
    window.addEventListener(COMMANDS.CHECKOUT, checkout);
    window.addEventListener(COMMANDS.BACK, back);
    window.addEventListener(COMMANDS.HOME, home);

    return () => {
      // window.removeEventListener(COMMANDS.OPEN_CART, openCart);
      // window.removeEventListener(COMMANDS.CLOSE_CART, closeCart);
      window.removeEventListener(COMMANDS.ADD_ITEM, addItem);
      // window.removeEventListener(COMMANDS.REMOVE_ITEM, removeItem);
      // window.removeEventListener(COMMANDS.PURCHASE_ITEMS, purchaseItems);
      window.removeEventListener(COMMANDS.CHOOSE_CAT, choseCat);
      window.removeEventListener(COMMANDS.CHECKOUT, checkout);
      window.removeEventListener(COMMANDS.HOME, home);
      window.removeEventListener(COMMANDS.BACK, back);
    };
  }, [choseCat, back, home, checkout, addItem]);
  // openCart, closeCart, addItem, removeItem, purchaseItems

  const [greetingWasSaid, setGreetingWasSaid] = useState(false);
  // var greetingWasSaid = false
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
    // console.log(alanInstance);
    //   if (greetingWasSaid) return;
    //   alanInstance?.activate();
      
    //   console.log("hi "+greetingWasSaid);
    
  }, [alanInstance]);
  
  useEffect(() => {
    if (alanInstance === null) return;
    console.log(alanInstance);
    (async()=>{
      console.log(await alanInstance.updateButtonState("Online"));

        alanInstance.playText("Hello, I am Alan. How can I help you?");
      setGreetingWasSaid(true);})()
  }, [alanInstance, greetingWasSaid]);
  return null;
}
