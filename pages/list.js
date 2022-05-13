import React, { useEffect } from 'react'
import Table from '../components/Table'
import { getUserContent } from '../services'




const list = ({data, session}) => {
    const posts = (data[0].nextUsers[0].posts)
    const complete = (data[0].nextUsers[0].completed.map((item, i) => item.slug))
    
    useEffect(() => {
        sessionStorage.setItem('posts', JSON.stringify(data[0].nextUsers[0]));
        console.log(session)
    }, [])
    

   
    return ( 
    <div className="container mx-auto px-15 mb-8">
        <Table posts={posts} complete={complete}/>
    </div>
  )
}

export default list

export async function getServerSideProps(context) {
    const email = context.query.email
    const posts = (await getUserContent(email)) || []

    return {
        props: { 
           data: [posts]
        }
    }
}