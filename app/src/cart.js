// import DeleteIcon from '@mui/icons-material/Delete';
// import React, { useContext } from "react";
// import Navbar from "./navbar";
// import { DataContext } from "./context/DataProvider";
// import {
//   Box,
//   Button,
//   Card,
//   CardActions,
//   CardContent,
//   Typography
// } from "@mui/material";

// export default function Cart() {
//   const { account } = useContext(DataContext);
//   return (

//     <>
//       <Navbar />
//       <h1 style={{justifyContent: "center", fontFamily:"monospace"}}>Cart</h1>
//       {account?.Cart?.map((item) => {
//         console.log(item);
//         return (
          
// <Box sx={{ display: 'flex', flexDirection: 'column', gap: '10px', border: '2px solid grey', p: '15px' }}>
//   {account?.Cart?.map((item) => {
//     console.log(item);
//     return (
//       <Card
//         // variant="outlined"
//         sx={{
//           display: "flex",
//           flexDirection: "row",
//           alignItems: "center",
//           justifyContent: "space-between",
//           maxWidth: 345,
//         }}
//       >
//         <CardContent sx={{ display: "flex", flexDirection: "row", alignItems: "left" ,border: '1px solid black' }}>
//           <Typography sx={{ fontSize: 15, marginRight:"15px" }} color="text.primary">
//             {item?.Title}
//           </Typography>
//           <Typography sx={{ fontSize: 15, marginLeft: "15px" }} color="text.primary">
//             Price: ₹{item?.Price}
//           </Typography>
//         <CardActions>
//           <Button variant="contained" startIcon={<DeleteIcon />}>Delete</Button>
//         </CardActions>
//         </CardContent>
//       </Card>
//     );
//   })}
// </Box>


//         );
//       })}
//     </>
//   );
// }
import DeleteIcon from '@mui/icons-material/Delete';
import React, { useContext } from "react";
import Navbar from "./navbar";
import { DataContext } from "./context/DataProvider";
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Grid,
  Typography
} from "@mui/material";

export default function Cart() {
  const { account } = useContext(DataContext);

  return (
    <>
      <Navbar />
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', py: '20px' }}>
        <Typography variant="h4" sx={{ fontFamily: 'monospace', fontWeight: 'bold', mb: '20px' }}>Cart</Typography>
        <Grid container spacing={2} sx={{ justifyContent: 'center' }}>
          {account?.Cart?.map((item) => (
            <Grid item key={item.Id}>
              <Card sx={{ maxWidth: 345 }}>
                <CardContent sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', p: '20px' }}>
                  <Typography variant="h6">{item?.Title}</Typography>
                  <Typography variant="h6">Price: ₹{item?.Price}</Typography>
                  <CardActions>
                    <Button variant="contained" startIcon={<DeleteIcon />} size="small">Delete</Button>
                  </CardActions>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>
    </>
  );
}
