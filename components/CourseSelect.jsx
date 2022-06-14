import React from 'react'

import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Link from 'next/link'


const CourseSelect = () => {
  return (
        
            <div className='p-5'>
            <Card sx={{  }}>
                <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                    ISO 9001 Training
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                    Learn about ISO 9001
                    </Typography>
                </CardContent>
                <CardActions>
                <Button variant="contained" size="small" > 
                    <Link href='/list'>
                        <span className='cursor-pointer text-white'>
                            Head to Training
                        </span>
                    </Link>   
                </Button>
                </CardActions>
            </Card> 
            </div>
             
        
        
  )
}

export default CourseSelect