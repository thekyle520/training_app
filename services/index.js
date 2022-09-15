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
          quiz
          content {
            raw
          }
        }
      }
    `;
  
    const result = await request(graphqlAPI, query, { slug });
  
    return result.post;
  };

  export const getUserContent = async (email) => {
    const query = gql`
    query GetUserContent($email: String!) {
      nextUsers(where: {email: $email}, stage: DRAFT) {
        posts {
          id
          clause
          slug
          section
          title
        }
        completed {
          slug
        }
      }
    }`
      
      const result = await request(graphqlAPI, query, { email });
  
    return result
  }

  export const getCompleteData = async (email) => {
    const query = gql`
    query GetCompleteData($email: String!) {
      nextUsers(where: {email: $email}) {
        completed {
          slug
        }
      }
    }`
      
    const result = await request(graphqlAPI, query, { email });
  
    return result
  }

  export const updateUserCompletion = async (email, slug) => {
    const query = gql`
    mutation UpdatePostCompletion ($email: String!, $slug: String!) {
      updateNextUser(
        where: {email: $email}
        data: {completed: {connect: {where: {slug: $slug}}}}
      ) {
        id
        completed {
          slug
        }
      }
    }`
      
      const result = await request(graphqlAPI, query, { email, slug });
  
    return result
  }

  export const getAdminStatus = async (email) => {
    const query = gql`
    query GetAdminStatus ($email: String!) {
      nextUser(where: {email: $email}, stage: DRAFT) {
        admin
      }
    }`
      
      const result = await request(graphqlAPI, query, { email });
  
    return result
  }
  
  export const getAllUsers = async () => {
    const query = gql`
    query GetAllUsers {
      nextUsers(stage: DRAFT) {
        email
        id
      }
    }
    `
      
      const result = await request(graphqlAPI, query);
  
    return result
  }
  
