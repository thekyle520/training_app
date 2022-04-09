import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import ArrowCircleRightIcon from '@mui/icons-material/ArrowCircleRight';
import IconButton from '@mui/material/IconButton';
import Link from 'next/link';



export default function BasicTable({ posts }) {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Title</TableCell>
            <TableCell align="right">Section</TableCell>
            <TableCell align="right">Clause</TableCell>
            <TableCell align="right"></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
            {posts.map((post) => (
              <TableRow
              key={post.node.id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {post.node.title}
              </TableCell>
              <TableCell align="right">{post.node.section}</TableCell>
              <TableCell align="right">{post.node.clause}</TableCell>
              <TableCell>
                <Link href={`/content/${post.node.slug}`}>
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



