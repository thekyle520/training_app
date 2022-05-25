import React, { useEffect } from 'react'
import Table from '../components/Table'
import { getUserContent } from '../services'
import { getSession } from 'next-auth/react'
import LinearProgress, { linearProgressClasses } from '@mui/material/LinearProgress';
import { Box } from '@mui/system';
import { styled } from '@mui/material/styles';


const list = ({data}) => {
    const posts = (data[0].nextUsers[0].posts)
    const complete = (data[0].nextUsers[0].completed.map((item, i) => item.slug))
    const progress = complete.length/posts.length * 100
    sessionStorage.setItem('posts', JSON.stringify(data[0].nextUsers[0]));
    
     
    const BorderLinearProgress = styled(LinearProgress)
    (({theme}) => ({
    height: 10,
    borderRadius: 5,
    [`&.${linearProgressClasses.colorPrimary}`]: {
        backgroundColor: theme.palette.grey[200],
    },
    [`& .${linearProgressClasses.bar}`]: {
        borderRadius: 5,
        backgroundColor: '#1a90ff'

    },
    }));
    

   
    return ( 
    <div className="container mx-auto px-15 mb-8">
         <div className='flex flex-col rounded-md bg-white my-2'>
                <div className='flex justify-center items-center rounded-lg py-2'>
                    <h1 className='px-4'>{`${progress}%`}</h1>
                    <Box sx={{ width: '80%' }}>
                        <BorderLinearProgress variant="determinate" value={progress} />
                    </Box>
                </div>
        </div>
        <Table posts={posts} complete={complete}/>
    </div>
  )
}

export default list

export async function getServerSideProps(context) {
    const session = await getSession(context)
    const email = session.user.email
    const posts = (await getUserContent(email)) || []

    return {
        props: { 
           data: [posts]
        }
    }
}