import React from 'react'

import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { signIn } from "next-auth/react";



const LoginBox = () => {
  return (
        
            <div className='p-5'>
            <Card sx={{  }}>
                <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                    Please Log In
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                    Login in to access training data
                    </Typography>
                </CardContent>
                <CardActions>
                    <Button onClick={signIn} variant="contained" size="small"> 
                        Sign In
                    </Button>
                </CardActions>
            </Card> 
            </div>
             
        
        
  )
}

export default LoginBox