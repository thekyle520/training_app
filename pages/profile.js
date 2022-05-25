import React from 'react'
import { getSession } from 'next-auth/react'
import { getUserContent } from '../services'
import LinearProgress, { linearProgressClasses } from '@mui/material/LinearProgress';
import { Box } from '@mui/system';
import { styled } from '@mui/material/styles';




const Profile = ({data}) => {

    const posts = data[0].nextUsers[0].posts
    const complete = data[0].nextUsers[0].completed
    const progress = complete.length/posts.length * 100
    



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
    <div className="container mx-auto px-10 mb-8">
         <div className='flex flex-col rounded-lg bg-white	border-2 border-solid border-slate-200 '>
                <div className='flex justify-center items-center rounded-lg border-2 border-solid border-gray-400 m-5'>
                    <h1 className='p-4'>{`${progress}%`}</h1>
                    <Box sx={{ width: '80%' }}>
                        <BorderLinearProgress variant="determinate" value={progress} />
                    </Box>
                </div>
        </div>
    </div>

   

  )
}

export default Profile

export async function getServerSideProps(context) {
    const session = await getSession(context)
    const email = session.user.email
    const data = (await getUserContent(email)) || []

    return {
        props: { 
           data: [data]
        }
    }
}