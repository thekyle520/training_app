import React, {useEffect, useState} from 'react'
import CheckIcon from '@mui/icons-material/Check';
import Button from '@mui/material/Button';
import ArrowCircleLeftIcon from '@mui/icons-material/ArrowCircleLeft';
import ArrowCircleRightIcon from '@mui/icons-material/ArrowCircleRight';
import Link from 'next/link';
import { useSession } from "next-auth/react"



const PostDetailBar = ({post}) => {

  const { data: session, status } = useSession();

  const [complete, setComplete] = useState([])
  const [slugs, setSlugs] = useState("")
  const [nextTraining, setNextTraining] = useState("")
  const [prevTraining, setPrevTraining] = useState("")
  
  


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

  return (
    <div>
          <div className='h-6'></div>

          
          <div className='flex flex-row rounded-lg bg-white	border-2 border-solid border-slate-200 h-12'>
            <div className='mx-4 justify-self-start self-center'>
              {complete.includes(post.slug) && <CheckIcon color="success" /> }
            </div>
            

            
            <div className='w-full flex flex-row justify-end items-center'>
              <div className='mx-2 flex'>
                {prevTraining !== null ? 
                  <Link href={`/content/${prevTraining}`}>
                    <Button variant='contained' startIcon={<ArrowCircleLeftIcon />}>
                      Prev
                    </Button>
                  </Link>
                  :
                  <Button disabled variant='contained' startIcon={<ArrowCircleLeftIcon />}>
                    Prev
                  </Button>
                }
              </div>
              <div className='mx-2 flex'> 
                {nextTraining !== null ? 
                  <Link href={`/content/${nextTraining}`}>
                    <Button variant='contained' endIcon={<ArrowCircleRightIcon />}>
                      Next
                    </Button>
                  </Link>
                  :
                  <Button disabled variant='contained' endIcon={<ArrowCircleRightIcon />}>
                    Next
                  </Button>
                } 
              </div>
            </div>
          
        </div>
    </div>
    
    
  )
}


export default PostDetailBar;
