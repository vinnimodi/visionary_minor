import React, { useContext } from "react";
import Navbar from "./navbar";
import { DataContext } from "./context/DataProvider";

export default function Cart() {
  const { account } = useContext(DataContext);
  // console.log(account.Cart);
  return (
    <>
      <Navbar />
      <h1>Cart</h1>
      {account?.Cart?.map((item) => {
        console.log(item);
        return (
        <div key={item?._id}>
          <h1>{item?.Title}</h1>
          <h1>{item?.quantity}</h1>
        </div>
      )})}
    </>
  );
}
