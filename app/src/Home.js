import React, { useContext } from "react";
import { CategoryContext } from "./App";
import "./App.css";
import Container from "./Container.js";
import "./index.css";
import Navbar from "./navbar";
import { useSearchParams } from "react-router-dom";
import Stripe from 'stripe';

export default function Home() {
  const [searchParams, ] = useSearchParams();
  const { setCat } = useContext(CategoryContext);
  setCat(null);
  const items = [
    "Fruits & Vegetables",
    "Dairy",
    "Daily Essentials",
    "Beverages",
    "Personal Care",
    "Cleaning & Household",
  ];
if(searchParams?.has("session_id"))
(async()=>{
  const stripe = Stripe("sk_test_51N4dnmSEnpfqtNkeX0laTgMUwVEST4756tO2goF9qDkX25padBfjLHIBaxYcwWttLJ3SohzmPA24b0lJqmE2a5rK00xlrL1KsT");
  const session = await stripe.checkout.sessions.retrieve(searchParams.get("session_id"))
  console.log(session);
  const customer = await stripe.customers.retrieve(session.customer);
  console.log(customer);
  return(
    <div className="App">
    <Navbar />
    <main className={"main"}>
      {/* {session.payment_status==="paid"? <h1>Payment Successful</h1>:<h1>Payment Failed</h1>}
      {session.payment_status==="paid"? <h1>Order Placed</h1>:<h1>Order Not Placed</h1>}
      {session.payment_status==="paid"? <h1>Order ID: {session.id}</h1>:<h1>Order ID: {session.id}</h1>}
      {customer.email}
      {customer.name} */}
      Payed
      {items.map((item, index) => {
        return <Container key={index} name={item} />;
      })}
    </main>
  </div>
  )
  })()
  return (
    <div className="App">
      <Navbar />
      <main className={"main"}>
        
        {items.map((item, index) => {
          return <Container key={index} name={item} />;
        })}
      </main>
    </div>
  );
}
