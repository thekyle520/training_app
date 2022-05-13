import Head from 'next/head'
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import Button from '@mui/material/Button';




export default function Home({ posts }) {

  const { data: session, status } = useSession();
  const loading = status === "loading";
  if (loading) return null;

  if (status === "authenticated") {
    if (sessionStorage.getItem("session")) {
      sessionStorage.removeItem("session")
    }
    sessionStorage.setItem('session', JSON.stringify(session.user.email))
  };
  
  return (
    <div className="container mx-auto px-15 mb-8">
      <Head>
        <title>Encompass Training</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {session ? 
      (
        <div>
        <Button variant="contained" > 
          <Link href={{
              pathname: "list",
              query: {
                  email: session.user.email
              }
            }}
            as={`list`}>
            <span className='cursor-pointer text-white'>
                Head to Training
            </span>
          </Link>   
        </Button>
        <p>{sessionStorage.getItem('session')}</p>
        </div>
      ) : 
      (<h1>Please log in</h1>)}
    </div>
   


  )
}






