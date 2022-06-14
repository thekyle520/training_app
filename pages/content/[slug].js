import React, { useEffect, useState } from 'react';
import { useSession } from "next-auth/react"

import { PostDetail, PostDetailBar, Loader } from '../../components';
import Continuation from '../../components/Continuation';
import { getPosts, getPostDetails } from '../../services';

const PostDetails = ({ post }) => {

  const { data: session, status } = useSession();

 
  // // if (router.isFallback) {
  // //   return <Loader />;
  // // }

  const [complete, setComplete] = useState(false)
  

  //Init
  useEffect(() => {
    let data = JSON.parse(sessionStorage.getItem('posts'))
    let completed = data.completed.map((item, i) => item.slug)
    if(completed.includes(post.slug)) {
      setComplete(true)
    } else {
      setComplete(false)
    }
  })

  const handleSetComplete = () => {
    setComplete(true)
  }


  
  return (
    <>
      <div className="container mx-auto px-10 mb-8">
        
        <div>
          <PostDetail post={post} />
        </div>
        {!complete && <Continuation questions={post.quiz} post={post} handleSetComplete={handleSetComplete}/> }
          <PostDetailBar post={post}/>
      </div>
      
    </>
  );
};

export default PostDetails;

export async function getStaticProps(context) {
  return {
    props: {
      post: await getPostDetails(context.params.slug)
    },
  };
}

export async function getStaticPaths() {
  const posts = await getPosts();
  return {
    paths: posts.map(({ node: { slug } }) => ({ params: { slug } })),
    fallback: true,
  };
}