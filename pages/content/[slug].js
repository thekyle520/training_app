import React from 'react';
import { useSession } from "next-auth/react"

import { PostDetail, PostDetailBar, Loader } from '../../components';
import { getPosts, getPostDetails } from '../../services';

const PostDetails = ({ post }) => {

  const { data: session, status } = useSession();
  const loading = status === "loading";
  if (loading) return null;

  


  // // if (router.isFallback) {
  // //   return <Loader />;
  // // }

  
  
  return (
    <>
      <div className="container mx-auto px-10 mb-8">
          <PostDetailBar post={post}/>
        <div>
          <PostDetail post={post} />
        </div>
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