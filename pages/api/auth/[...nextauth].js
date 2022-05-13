import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { gql } from "graphql-request";

import { verifyPassword } from "../../../services/auth";
import { graphcmsClient } from "../../../services/graphcms";

export const GetUserByEmail = gql`
  query GetUserByEmail($email: String!) {
    user: nextUser(where: { email: $email }, stage: DRAFT) {
      id
      password
    }
  }
`;

export const CreateNextUserByEmail = gql`
  mutation CreateNextUserByEmail($email: String!, $password: String!) {
    newUser: createNextUser(data: { email: $email, password: $password }) {
      id
    }
  }
`;


export default NextAuth({
    // pages: {
    //   signIn: "/signin",
    //   signOut: "/",
    // },
    providers: [
      CredentialsProvider({
        name: "Email & Password",
        credentials: {
          email: {
            label: "Email",
            type: "email",
            placeholder: "Email",
          },
          password: {
            label: "Password",
            type: "password",
            placeholder: "Password",
          },
        },
        authorize: async ({ email, password }) => {
          const { user } = await graphcmsClient.request(GetUserByEmail, {
            email,
          });

            if (!user || !user.password) {
            throw new Error("User not found");
          }
          
          const isValid = await verifyPassword(password, user.password);
        
          if (!isValid) {
            throw new Error("Wrong credentials. Try again.");
          }
        
          return {
            id: user.id,
            username: email,
            email,
          };
        },
      }),
    ],

    events: {
      signIn: ({user}) => {
        console.log(user.username)  
      }
    },
    secret: process.env.JWT_SECRET,

  });