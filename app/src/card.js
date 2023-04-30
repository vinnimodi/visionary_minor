import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Typography
} from "@mui/material";
import { ShoppingCart } from "@mui/icons-material";
import { addToCart } from "./service/api";
import { useContext } from "react";
import { DataContext } from "./context/DataProvider";

export default function ProductCard({ item }) {
  // const [isLoading, setLoading] = useState(false);
  const { account,setAccount } = useContext(DataContext);

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
        <Button
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
        </Button>
      </CardActions>
    </Card>
  );
}
