import React from 'react';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar'; 
import './Dashboard.css';
import { Table, TableBody, TableCell, IconButton , TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

const Users = () => {
  return (
    <div>
      <Sidebar />
      <Navbar />
      <section id="content">
      <main>
      <div className="head-title">
        <div className="left">
          
          <h1>Users</h1>
          </div>
      </div>

          <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
          <TableCell>Profile Picture</TableCell>
            <TableCell>First Name</TableCell>
            <TableCell>Last Name</TableCell>
            <TableCell>Email</TableCell>
            <TableCell>Department</TableCell>
            <TableCell>Skills</TableCell>
            <TableCell>Roles</TableCell>
            
            <TableCell>Created At</TableCell>
            <TableCell>Updated At</TableCell>
            <TableCell>Action</TableCell> 
          </TableRow>
        </TableHead>
        <TableBody>
          
            <TableRow>
            <TableCell>
                <img src='' alt="Profile" style={{ width: '50px', height: '50px', borderRadius: '50%' }} />
              </TableCell>
              <TableCell>test</TableCell>
              <TableCell>test</TableCell>
              <TableCell>test</TableCell>
              <TableCell>test</TableCell>
              <TableCell>test</TableCell>
              <TableCell>test</TableCell>
              
              <TableCell>test</TableCell>
              <TableCell>test</TableCell>
              <TableCell>
                        <IconButton aria-label="edit">
                          <EditIcon />
                        </IconButton>
                        <IconButton aria-label="delete">
                          <DeleteIcon />
                        </IconButton>
                      </TableCell>
            </TableRow>
       
        </TableBody>
      </Table>
    </TableContainer>
        
    
    
    </main>
    </section>
    </div>
  );
};

export default Users;
