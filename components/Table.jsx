import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

import IconButton from '@mui/material/IconButton';
import Link from 'next/link';


import PlaylistAddCheckIcon from '@mui/icons-material/PlaylistAddCheck';
import ArrowCircleRightIcon from '@mui/icons-material/ArrowCircleRight';
import CheckIcon from '@mui/icons-material/Check';


export default function BasicTable({ posts, complete }) {

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell align="left"><PlaylistAddCheckIcon /></TableCell>
            <TableCell align="left">Title</TableCell>
            <TableCell align="left">Section</TableCell>
            <TableCell align="left">Clause</TableCell>
            <TableCell align="left"></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
            {posts.map((post) => (
              <TableRow
              key={post.id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell align="left">
                {complete.includes(post.slug) && <CheckIcon color="success"/>}
              </TableCell>
              <TableCell align="left" component="th" scope="row">
                {post.title}
              </TableCell>
              <TableCell align="left">{post.section}</TableCell>
              <TableCell align="left">{post.clause}</TableCell>
              <TableCell>
                <Link href={`/content/${post.slug}`}>
                    <IconButton 
                        color="primary" 
                        aria-label="select">
                        <ArrowCircleRightIcon />
                    </IconButton>
                </Link>
              </TableCell>
            </TableRow>      
            ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}




