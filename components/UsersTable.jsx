import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

import { getAllUsers } from '../services'



export default function BasicTable({ users }) {

    const data = users.nextUsers

  return (
      
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell align="left">Email</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
            {data.map((user) => (
              <TableRow
              key={user.id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell align="left">{user.email}</TableCell>
            </TableRow>      
            ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}


export async function getServerSideProps() {
   
    const users = (await getAllUsers()) || []

    return {
        props: { 
           users: users
        }
    }
}




