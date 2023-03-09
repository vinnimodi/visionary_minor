import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";
import { ShoppingCart } from "@mui/icons-material";

export default function ProductCard({ item }) {
  // const [isLoading, setLoading] = useState(false);
  return (
    <Card sx={{ maxWidth: 345 }}>
      {/* {isLoading ? (
          <p>Loading...</p>
        ) : (
            )} */}
      <CardMedia component="img" image={item.image} alt="" />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {item.Title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          ₹{item.Price}
        </Typography>
      </CardContent>
      <CardActions>
        <Button variant="contained">
          <ShoppingCart />
          Add To Cart
        </Button>
      </CardActions>
    </Card>
  );
}
