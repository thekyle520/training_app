import React from 'react'
import { getSession } from 'next-auth/react'
import { getAdminStatus, getAllUsers } from '../../services'
import UserTable  from '../../components/UsersTable'



const Users = ({data, users}) => {
    console.log(data)

   
  return (
    <div className="container mx-auto px-15 mb-8">
        <UserTable users={users}/>
    </div>
  )
}

export default Users

export async function getServerSideProps(context) {
    const session = await getSession(context)
    const email = session.user.email
    const status = (await getAdminStatus(email)) || false
    const users = (await getAllUsers()) || [false]
    

    return {
        props: { 
           data: status.nextUser.admin, 
           users: users
        }
    }
}