import React, { useState } from 'react';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import MenuRoundedIcon from '@mui/icons-material/MenuRounded';
import { IconButton } from '@mui/material';

export default function TemporaryDrawer() {
  const [open, setOpen] = React.useState(false) ; 

  return (
    <div>
          <IconButton onClick={()=>setOpen(true)}>
            <MenuRoundedIcon className='link' />
          </IconButton>
          <Drawer anchor={"right"} open={open} onClose={()=> setOpen(false)} >
            <div className='drawer-div'>
            <a href='/'>
            <p className='link'>Home</p>
            </a>
            <a href='/'>
                <p className='link'>Compare</p>
            </a>
            {/* <a href='/'>
                <p className='link'>Watchlist</p>
            </a> */}
            <a href='/'>
                <p className='link'>Dashbaord</p>
            </a> 
            </div>
          </Drawer>
    </div>
  );
}