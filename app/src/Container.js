import React, { useContext } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";
import { CategoryContext } from "./App";
import { useNavigate } from "react-router-dom";

export default function Container({ name }) {
  const { setCat } = useContext(CategoryContext);
  const navigate = useNavigate();
  const useHandleClick = () => {
    setCat(name);
    navigate(`/category/${name}`);
  };
  return (
    <Card
      sx={{
        width: "19rem",
      }}
    >
      <CardActionArea onClick={useHandleClick}>
        <CardMedia
          sx={{
            width: "100%",
            height: "13.5rem",
          }}
          component="img"
          image={`/images/${name}.jpg`}
          alt=""
        />
        <CardContent>
          <Typography variant="h5" component="div">
            {name}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
