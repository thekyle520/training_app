import React, {useState, useEffect} from 'react'
import Quiz from './Quiz'

import Alert from '@mui/material/Alert';
import Collapse from '@mui/material/Collapse';
import CloseIcon from '@mui/icons-material/Close';
import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';

import {updateUserCompletion} from '../services';
import { useSession } from "next-auth/react"

const Continuation = ({questions, post, handleSetComplete}) => {

  const { data: session, status } = useSession();


  const [quiz, setQuiz] = useState(false)
  const [open, setOpen] = useState(false);
  
  
  useEffect(() => {
    setOpen(false)
    if(questions.length > 0) {
        setQuiz(true)
    } else {
        setQuiz(false)
    }
}, [])

const handleCompleteMutation = async () => {
    await updateUserCompletion(session.user.email, post.slug);
    let data = JSON.parse(sessionStorage.getItem('posts'))
    data.completed.push({slug: post.slug})
    sessionStorage.setItem('posts', JSON.stringify(data))
    setOpen(true)
    handleSetComplete()
  }


  return (
    <div>
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
        </div>

        <div>
        {quiz ? 
            <Quiz questions={questions} handleComplete={handleCompleteMutation}/> : 
            <Button color="success" onClick={handleCompleteMutation} loading={open} variant="contained"> 
                Complete
            </Button>}
        </div>
    <div>
        </div>
    </div>
  )
}

export default Continuation