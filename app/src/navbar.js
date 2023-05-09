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
  Badge
  // InputBase
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import VisibilityIcon from "@mui/icons-material/Visibility";
// import { styled, alpha } from "@mui/material/styles";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
// import SearchBar from "./searchBar.js";
import SearchIcon from "@mui/icons-material/Search";
import { useContext, useState } from "react";
import { CategoryContext } from "./App";
import SignUp from "./signInDialog";
import { DataContext } from "./context/DataProvider";
import Login from "./LoginDialog";
import { Profile } from "./profile";
function Navbar() {
  const { setCat } = useContext(CategoryContext);
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
  const [searchQuery, setSearchQuery] = useState("");
  const { account, setAccount } = useContext(DataContext);
  const [open, setOpen] = useState(false);
  const openDialog = () => {
    setOpen(true);
  };
  const [openSignUp, setOpenSignUp] = useState(false);
  const openDialogSignUp = () => {
    setOpenSignUp(true);
  };
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
                setSearchQuery(e.target.value);
                navigate(`/search?q=${searchQuery}`);
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
            {(account?.firstName?.length > 0) ? (
              <Stack direction="row" spacing={2}>
                <Profile account={account} setAccount={setAccount} />
                <Button id="cart" onClick={() => navigate("/cart")} color="inherit">

                  <Badge color="secondary" badgeContent={
                    account?.Cart?.length > 0 ? (
                      account?.Cart?.reduce((acc, item) =>  acc + item.quantity, 0)
                    ) : 0
                  }> 
                    <ShoppingCartIcon />
                  </Badge>
                </Button>
              </Stack>
            ) : (
              <div>
                <Button id="login" color="inherit" onClick={() => openDialog()}>
                  Log in
                </Button>
                <Button id="signup" color="inherit" onClick={() => openDialogSignUp()}>
                  Sign Up
                </Button>
              </div>
            )}
          </Stack>
        </Toolbar>
      </AppBar>
      {/* Dialog boxes */}
      <SignUp open={openSignUp} setOpen={setOpenSignUp} />
      <Login open={open} setOpen={setOpen} />

      {true ? (
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
                sx={{
                  flexGrow: 0.2
                  // backgroundColor: cat === item ? "#EEEEEE" : "#FFFFFF"
                }}
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
