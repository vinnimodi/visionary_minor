import {
  AppBar,
  Toolbar,
  // IconButton,
  Typography,
  Stack,
  Button,
  Box,
  TextField,
  IconButton,
  InputBase
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { styled, alpha } from "@mui/material/styles";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
// import SearchBar from "./searchBar.js";
import SearchIcon from "@mui/icons-material/Search";

import { useContext } from "react";
import { CategoryContext } from "./App";

function Navbar() {
  const { setCat, cat } = useContext(CategoryContext);
  const navigate = useNavigate();
  const items = [
    "Fruits & Vegetables",
    "Dairy",
    "Daily Essentials",
    "Beverages",
    "Personal Care",
    "Cleaning & Household"
  ];
  // const Search = styled()(({ theme }) => ({
  //   variant: "outlined",
  //   position: "relative",
  //   borderRadius: theme.shape.borderRadius,
  //   backgroundColor: alpha(theme.palette.common.white, 0.15),
  //   "&:hover": {
  //     backgroundColor: alpha(theme.palette.common.white, 0.25),
  //   },
  //   marginLeft: 0,
  //   width: "100%",
  //   [theme.breakpoints.up("sm")]: {
  //     marginLeft: theme.spacing(1),
  //     width: "auto",
  //   },
  // }));

  // const SearchIconWrapper = styled("div")(({ theme }) => ({
  //   padding: theme.spacing(0, 2),
  //   height: "100%",
  //   position: "absolute",
  //   right: 0,
  //   pointerEvents: "none",
  //   display: "flex",
  //   alignItems: "center",
  //   justifyContent: "center",
  // }));

  // const StyledInputBase = styled(InputBase)(({ theme }) => ({
  //   color: "inherit",
  //   "& .MuiInputBase-input": {
  //     padding: theme.spacing(1, 1, 1, 0),
  //     // vertical padding + font size from searchIcon
  //     paddingLeft: `1em`,
  //     transition: theme.transitions.create("width"),
  //     width: "100%",
  //     [theme.breakpoints.up("sm")]: {
  //       width: "12ch",
  //       "&:focus": {
  //         width: "20ch",
  //         "&>div": {
  //           display: "block",
  //         },
  //       },
  //     },
  //   },
  // }));

  return (
    <div>
      <AppBar position="static">
        <Toolbar>
          <Button
            sx={{
              flexGrow: 0.2,
              display: "flex",
              justifyContent: "space-around"
            }}
            color="inherit"
            onClick={() => navigate("/")}
          >
            <VisibilityIcon />
            <Typography
              variant="h6"
              component="div"
              sx={{ display: { xs: "none", md: "block" } }}
            >
              Visionary
            </Typography>
          </Button>
          <Stack direction="row" spacing={2} sx={{ flexGrow: 2 }}>
            {/* <Button color="inherit" onClick={() => navigate("/")}>
              Home
            </Button> */}
            <Button color="inherit" onClick={() => navigate("/about")}>
              About Us
            </Button>
            <Button color="inherit" onClick={() => navigate("/contact")}>
              Contact Us
            </Button>
          </Stack>
          {/* <SearchBar /> */}
          <form>
            <TextField
              id="search-bar"
              className="text"
              color="secondary"
              onInput={(e) => {
                // setSearchQuery(e.target.value);
              }}
              label="Search"
              variant="filled"
              size="small"
            />
            <IconButton type="submit" aria-label="search">
              <SearchIcon />
            </IconButton>
          </form>
          {/* <Search>
            <StyledInputBase
              placeholder="Search…"
              inputProps={{ "aria-label": "search" }}
            />
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
          </Search> */}
          <Stack direction="row" spacing={2}>
            <Button color="inherit">Log in</Button>
            <Button color="inherit">Sign Up</Button>
            <Button color="inherit">
              <ShoppingCartIcon />
            </Button>
          </Stack>
        </Toolbar>
      </AppBar>
      {cat !== null ? (
        <Box justify="center" sx={{ flexGrow: 1 }}>
          <Stack
            direction="row"
            spacing={2}
            justify="center"
            sx={{ backgroundColor: "#EEEEEE", flexGrow: 1.5 }}
          >
            {items.map((item) => (
              <Button
                color="inherit"
                sx={{ flexGrow: 0.2 }}
                onClick={() => {
                  setCat(item);
                  navigate(`/category/${item}`);
                }}
              >
                {item}
              </Button>
            ))}
          </Stack>
        </Box>
      ) : null}
    </div>
  );
}

export default Navbar;
