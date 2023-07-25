import RemoveIcon from "@mui/icons-material/Remove";
import AddIcon from "@mui/icons-material/Add";
import React, { useContext } from "react";
import Navbar from "./navbar";
import { DataContext } from "./context/DataProvider";
import {
  Box,
  Button,
  Card,
  CardContent,
  Grid,
  IconButton,
  Typography
} from "@mui/material";
import { handleQuantityChange } from "./service/api";

export default function Cart() {
  const { account, setAccount } = useContext(DataContext);
  return (
    <>
      <Navbar />
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          py: "20px"
        }}
      >
        <Typography
          variant="h4"
          sx={{ fontFamily: "monospace", fontWeight: "bold", mb: "20px" }}
        >
          Cart
        </Typography>
        <Grid
          container
          direction="column"
          spacing={2}
          sx={{ justifyContent: "center", alignItems: "center" }}
        >
          {account?.Cart?.map((item) => (
            <Grid item key={item.Id}>
              <Card sx={{ width: 645 }}>
                <CardContent
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-around",
                    p: "20px"
                  }}
                >
                  <Typography variant="h6">{item?.Title}</Typography>
                  <Typography variant="h6">Price: ₹{item?.Price}</Typography>
                  <div style={{ display: "flex", alignItems: "center" }}>
                    <IconButton
                      variant="outlined"
                      size="small"
                      onClick={async () => {
                        const res = await handleQuantityChange(
                          item,
                          account,
                          -1
                        );
                        setAccount(res ? res.message : account);
                        localStorage.setItem(
                          "account",
                          JSON.stringify(res ? res.message : account)
                        );
                        console.log(res);
                      }}
                    >
                      <RemoveIcon />
                    </IconButton>
                    <Typography variant="h6" style={{ margin: "0 1rem" }}>
                      {item?.quantity}
                    </Typography>
                    <IconButton
                      size="small"
                      onClick={async () => {
                        const res = await handleQuantityChange(
                          item,
                          account,
                          +1
                        );
                        setAccount(res ? res.message : account);
                        localStorage.setItem(
                          "account",
                          JSON.stringify(res ? res.message : account)
                        );
                      }}
                    >
                      <AddIcon />
                    </IconButton>
                  </div>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
        <Button
          variant="contained"
          sx={{ mt: "20px" }}
          onClick={async () => {
            const res = await fetch("https://visionary-api.onrender.com//checkout", {
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
          }}
        >
          Checkout
        </Button>
      </Box>
    </>
  );
}
