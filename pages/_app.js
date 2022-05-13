import React from 'react';
import '../styles/globals.scss';
import { SessionProvider } from 'next-auth/react';
import  {Layout}  from '../components'




function MyApp({ 
  Component, 
  pageProps: { session, ...pageProps }
 }) {

  return (
    <SessionProvider session={session}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
    </SessionProvider>
      
    
  );
}

export default MyApp;