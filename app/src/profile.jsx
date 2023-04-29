
import {Typography,Box, Button} from '@mui/material';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { useState } from 'react';

import PowerSettingsNewIcon from '@mui/icons-material/PowerSettingsNew';
import {styled} from '@mui/material';

const Component = styled(Menu)`
margin-top : 2rem;
`


const Logout = styled(Typography) `
font-size : 14px;
margin-left : 10px;

`
export const Profile = ({account,setAccount})=>
{

    const [open,setOpen] = useState(false);

    const logoutUser = () =>{
        setAccount();
        localStorage.removeItem('account');
    }

    const handleClick = (event)=>{
        setOpen(event.currentTarget);
    }

    const handleClose = ()=>{
        setOpen(false);
    }

    return (
    <>
        <Box onClick = {handleClick}>
            <Button color='inherit'>
                <Typography style={ {marginTop : 2 ,cursor :"cursor"}}>
                    {account.firstName}
                </Typography>
            </Button>
        </Box>
        <Component
            anchorEl={open}
            open={Boolean(open)}
            onClose={handleClose}
            anchorOrigin={{
            vertical: 'top',
            horizontal: 'left',
        }}
            transformOrigin={{
            vertical: 'top',
            horizontal: 'left',
            }}
        >
       
        <MenuItem onClick={()=>{handleClose(); logoutUser()}}>
        <PowerSettingsNewIcon color='primary'></PowerSettingsNewIcon>
        <Logout>Logout</Logout>
        </MenuItem>
      </Component>
    </>
    )
}
