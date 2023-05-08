import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  IconButton,
  Typography
} from "@mui/material";
import { ShoppingCart } from "@mui/icons-material";
import { addToCart, handleQuantityChange, isInCart } from "./service/api";
import { useContext, useEffect, useState } from "react";
import { DataContext } from "./context/DataProvider";
import RemoveIcon from "@mui/icons-material/Remove";
import AddIcon from "@mui/icons-material/Add";
export default function ProductCard({ item }) {
  // const [isLoading, setLoading] = useState(false);
  const { account,setAccount } = useContext(DataContext);
  // console.log(isInCart(item,account));
  // Write a useEffect hook to check if the item is in the cart and set the state accordingly
  const [quantity,setQuantity] = useState(0)
  useEffect(()=>{
    const check=async()=>{
      const res=await isInCart(item,account);
      // console.log(res);
      setQuantity(res?.qty || 0);
    }
    if(account?.firstName) check();
  },[account,item])


  return (
    <Card sx={{ maxWidth: 345 }}>
      {/* {isLoading ? (
          <p>Loading...</p>
        ) : (
            )} */}
      <CardMedia component="img" image={item.image} alt="" />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {/* {item._id} */}
          {item.Title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          ₹{item.Price}
        </Typography>
      </CardContent>
      <CardActions>
        {
         (!account?.firstName || !account ) ?(<></>):
          ((quantity)?(
            <div style={{ display: "flex", alignItems: "center",  }}>
                  <IconButton
                  variant="outlined"
                    size="small"
                    onClick={async() => {
                      // item.quantity--;
                      const res= await handleQuantityChange({...item,quantity},account,-1);
                      console.log(res);
                                  setAccount(res ? res.message : account);
                        localStorage.setItem("account", JSON.stringify(res ? res.message : account));
                        // console.log(res);
                    }}
                  >
                    <RemoveIcon />
                  </IconButton>
                  <Typography variant="h6" style={{ margin: "0 1rem" }}>
                    {quantity.toString()}
                  </Typography>
                  <IconButton
                    size="small"
                    onClick={async() => {
                      // item.quantity++;
                      const res= await handleQuantityChange({...item,quantity},account,+1);
                                  setAccount(res ? res.message : account);
                        localStorage.setItem("account", JSON.stringify(res ? res.message : account));
                        // console.log(res.message.Cart.find((i)=>i._id===item._id));
                    }}
                  >
                    <AddIcon />
                  </IconButton>
                </div>
          ):(<Button
          variant="contained"
          onClick={async () => {
            const res = await addToCart(item, account);
            setAccount(res ? res.message : account);
            localStorage.setItem("account", JSON.stringify(res ? res.message : account));
            console.log(res);
          }}
        >
          <ShoppingCart />
          Add To Cart
        </Button>))}
      </CardActions>
    </Card>
  );
}
