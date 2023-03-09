import { useEffect, useState, useCallback } from "react";
import alanBtn from "@alan-ai/alan-sdk-web";
import { useNavigate } from "react-router-dom";
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
  HOME: "home"
};

export default function useAlan() {
  const navigate = useNavigate();
  const [alanInstance, setAlanInstance] = useState(null);
  // const {
  //   setShowCartItems,
  //   isCartEmpty,
  //   addToCart,
  //   removeFromCart,
  //   cart,
  //   checkout,
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

  // const addItem = useCallback(
  //   ({ detail: { name, quantity } }) => {
  //     const item = storeItems.find(
  //       (i) => i.name.toLowerCase() === name.toLowerCase()
  //     );
  //     if (item == null) {
  //       alanInstance.playText(`I cannot find the ${name} item`);
  //     } else {
  //       addToCart(item.id, quantity);
  //       alanInstance.playText(
  //         `Add ${quantity} of the ${name} item to your cart`
  //       );
  //     }
  //   },
  //   [alanInstance, addToCart]
  // );

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
  const home = useCallback(() => {
    alanInstance.playText("Going to Home Page");
    navigate("/");
  }, [alanInstance, navigate]);

  useEffect(() => {
    // window.addEventListener(COMMANDS.OPEN_CART, openCart);
    // window.addEventListener(COMMANDS.CLOSE_CART, closeCart);
    // window.addEventListener(COMMANDS.ADD_ITEM, addItem);
    // window.addEventListener(COMMANDS.REMOVE_ITEM, removeItem);
    // window.addEventListener(COMMANDS.PURCHASE_ITEMS, purchaseItems);
    window.addEventListener(COMMANDS.CHOOSE_CAT, choseCat);
    window.addEventListener(COMMANDS.BACK, back);
    window.addEventListener(COMMANDS.HOME, home);

    return () => {
      // window.removeEventListener(COMMANDS.OPEN_CART, openCart);
      // window.removeEventListener(COMMANDS.CLOSE_CART, closeCart);
      // window.removeEventListener(COMMANDS.ADD_ITEM, addItem);
      // window.removeEventListener(COMMANDS.REMOVE_ITEM, removeItem);
      // window.removeEventListener(COMMANDS.PURCHASE_ITEMS, purchaseItems);
      window.removeEventListener(COMMANDS.CHOOSE_CAT, choseCat);
      window.removeEventListener(COMMANDS.HOME, home);
      window.removeEventListener(COMMANDS.BACK, back);
    };
  }, [choseCat, back, home]);
  // openCart, closeCart, addItem, removeItem, purchaseItems

  // var [greetingWasSaid, setGreetingWasSaid] = useState(false);
  // var greetingWasSaid = false;
  // const greet = useCallback(
  //   async (status) => {
  //     if (status === "ONLINE" && !greetingWasSaid) {
  //       await alanInstance.activate();
  //       alanInstance.playText(
  //         "Hello, This is Visionary, I am here to help you. You can ask me to do various activities in the website."
  //       );
  //       setGreetingWasSaid(true);
  //     }
  //   },
  //   [greetingWasSaid, alanInstance]
  // );

  useEffect(() => {
    if (alanInstance != null) return;
    setAlanInstance(
      alanBtn({
        // onButtonState: async function (e) {
        //   if (e === "ONLINE" && !greetingWasSaid) {
        //   }
        // },
        key: process.env.REACT_APP_ALAN_KEY,
        onCommand: ({ command, payload }) => {
          window.dispatchEvent(new CustomEvent(command, { detail: payload }));
        }
      })
    );
  }, [alanInstance]);
  // useEffect(() => {
  //   if (alanInstance != null) return;

  //   async function newFunction() {
  //     alanInstance?.onButtonState(greet);
  //   }
  //   newFunction();
  // }, [alanInstance, greet]);
  return null;
}
