import React, {useEffect, useState} from 'react'
import CheckIcon from '@mui/icons-material/Check';
import Button from '@mui/material/Button';
import ArrowCircleLeftIcon from '@mui/icons-material/ArrowCircleLeft';
import ArrowCircleRightIcon from '@mui/icons-material/ArrowCircleRight';
import Link from 'next/link';
import { useSession } from "next-auth/react"
import Alert from '@mui/material/Alert';
import Collapse from '@mui/material/Collapse';
import CloseIcon from '@mui/icons-material/Close';
import IconButton from '@mui/material/IconButton';
import {updateUserCompletion} from '../services';







const PostDetailBar = ({post}) => {

  const { data: session, status } = useSession();
  const loading = status === "loading";
  if (loading) return null;

  const [complete, setComplete] = useState([])
  const [slugs, setSlugs] = useState("")
  const [nextTraining, setNextTraining] = useState("")
  const [prevTraining, setPrevTraining] = useState("")
  const [open, setOpen] = useState(false);


  //Init
  useEffect(() => {
    let data = JSON.parse(sessionStorage.getItem('posts'))
    let complete = data.completed.map((item, i) => item.slug)
    let slugs = data.posts.map((item, i) => item.slug)
    setComplete(complete)
    setSlugs(slugs)
    setNextTraining(handleNextTraining(slugs, post.slug))
    setPrevTraining(handlePrevTraining(slugs, post.slug))
  })

  

  const handleNextTraining = (slugs, postSlug) => {
      let index = slugs.indexOf(postSlug)
      index++
      if(slugs.length === index) {
        return null
      } else {
        return slugs[index]
      }
  }

  const handlePrevTraining = (slugs, postSlug) => {
      if(slugs.indexOf(postSlug) === 0 ) {
        return null
      } else {
        let index = slugs.indexOf(postSlug)
        index--
        return slugs[index]
      }
  }

  const handleCompleteMutation = async () => {
    await updateUserCompletion(session.user.email, post.slug);
    let data = JSON.parse(sessionStorage.getItem('posts'))
    data.completed.push({slug: post.slug})
    sessionStorage.setItem('posts', JSON.stringify(data))
    setOpen(true)
  }

  
  
  return (
    <div>
        <Collapse in={open}>
        <Alert
          action={
            <IconButton
              aria-label="close"
              color="inherit"
              size="small"
              onClick={() => {
                setOpen(false);
              }}
            >
              <CloseIcon fontSize="inherit" />
            </IconButton>
          }
          sx={{ mb: 2 }}
        >
          {`Congrats! ${post.title} is complete.` }
        </Alert>
      </Collapse>
          <div className='flex flex-row rounded-lg bg-white	border-2 border-solid border-slate-200 h-12'>
            <div className='flex-1 justify-self-center self-center'>
              {complete.includes(post.slug) ? 
                <CheckIcon color="success" /> : 
                <Button color="success" onClick={handleCompleteMutation} variant="contained"> 
                  Complete
                </Button>
              }
            </div>
            <div className='flex-2 mx-2 self-center justify-self-center bg-slate-200'>
              {prevTraining !== null ? 
                <Link href={`/content/${prevTraining}`}>
                  <Button variant='outlined' startIcon={<ArrowCircleLeftIcon />}>
                    Prev
                  </Button>
                </Link>
                :
                <Button disabled variant='outlined' startIcon={<ArrowCircleLeftIcon />}>
                  Prev
                </Button>
              }
            </div>
            <div className='flex-3 mx-2 self-center justify-self-center bg-slate-200'> 
              {nextTraining !== null ? 
                <Link href={`/content/${nextTraining}`}>
                  <Button variant='outlined' endIcon={<ArrowCircleRightIcon />}>
                    Next
                  </Button>
                </Link>
                :
                <Button disabled variant='outlined' endIcon={<ArrowCircleRightIcon />}>
                  Next
                </Button>
              } 
            </div>
          
          </div>
          <div className='h-6'></div>
        </div>
    
    
  )
}


export default PostDetailBar;