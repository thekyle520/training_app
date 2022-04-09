import { request, gql } from 'graphql-request';

const graphqlAPI = process.env.NEXT_PUBLIC_GRAPHCMS_ENDPOINT;

export const getPosts = async () => {
    const query = gql`
    query getPosts {
      postsConnection {
        edges {
          node {
            id
            section
            slug
            title 
            clause
          }
        }
      }
    }
    `;
  
    const result = await request(graphqlAPI, query);
  
    return result.postsConnection.edges;
  };

  export const getPostDetails = async (slug) => {
    const query = gql`
      query GetPostDetails($slug : String!) {
        post(where: {slug: $slug}) {
          title
          slug
          content {
            raw
          }
        }
      }
    `;
  
    const result = await request(graphqlAPI, query, { slug });
  
    return result.post;
  };