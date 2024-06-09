import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from '../../components/Navbar';
import Sidebar from '../../components/Sidebar';
import '../Dashboard/Dashboard.css';
  
import { Table, Form, Button, InputGroup } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

const Users = () => {
  useEffect(() => {
    document.body.classList.add('dashboard-body');
    return () => {
      document.body.classList.remove('dashboard-body');
    };
  }, []);

  const [searchQuery, setSearchQuery] = useState('');
  const [sortedColumn, setSortedColumn] = useState(null);
  const [sortDirection, setSortDirection] = useState('asc');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const [users, setUsers] = useState([]);

  const fetchUsers = async () => {
    try {
      const response = await axios.get('/getusers');
      setUsers(response.data);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleSort = (column) => {
    const direction = sortedColumn === column && sortDirection === 'asc' ? 'desc' : 'asc';
    setSortedColumn(column);
    setSortDirection(direction);
  };

  const sortedUsers = [...users].sort((a, b) => {
    if (!sortedColumn) return 0;
    const aValue = a[sortedColumn];
    const bValue = b[sortedColumn];
    if (aValue < bValue) return sortDirection === 'asc' ? -1 : 1;
    if (aValue > bValue) return sortDirection === 'asc' ? 1 : -1;
    return 0;
  });

  const filteredUsers = sortedUsers.filter(user =>
    Object.values(user).some(value => typeof value === 'string' && value.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedUsers = filteredUsers.slice(startIndex, startIndex + itemsPerPage);

  const totalPages = Math.ceil(filteredUsers.length / itemsPerPage);

  return (
    <div>
      <Sidebar />
      <Navbar />
      <section id="content">
        <main>
          <div className="head-title">
            <div className="left">
              <h1>Users</h1>
              <InputGroup className="mb-3">
                <Form.Control
                  type="text"
                  placeholder="Search"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </InputGroup>
            </div>
          </div>

          <Table responsive striped bordered hover>
            <thead>
              <tr>
                <th>Profile</th>
                <th onClick={() => handleSort('firstName')}>First Name</th>
                <th onClick={() => handleSort('lastName')}>Last Name</th>
                <th onClick={() => handleSort('email')}>Email</th>
                <th onClick={() => handleSort('department')}>Department</th>
                <th style={{ width: '150px' }} onClick={() => handleSort('skills')}>Skills</th>
                <th onClick={() => handleSort('roles')}>Roles</th>
                <th onClick={() => handleSort('createdAt')}>Created At</th>
                <th onClick={() => handleSort('updatedAt')}>Updated At</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {paginatedUsers.map(user => (
                <tr key={user.id}>
                  <td>
                    <img src={user.profilePicture} alt="Profile" style={{ width: '40px', height: '40px', borderRadius: '50%' }} />
                  </td>
                  <td>{user.firstName}</td>
                  <td>{user.lastName}</td>
                  <td>{user.email}</td>
                  <td>{user.department}</td>
                  <td className="text-truncate" style={{ maxWidth: '150px' }}>{user.skills}</td>
                  <td>{user.roles}</td>
                  <td>{new Date(user.createdAt).toLocaleDateString()}</td>
                  <td>{new Date(user.updatedAt).toLocaleDateString()}</td>
                  <td>
                    <Button variant="primary" size="sm">Edit</Button>
                    <Button variant="danger" size="sm" className="ml-2">Delete</Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>

          <div className="d-flex justify-content-between">
            <div>
              Showing {startIndex + 1} to {Math.min(startIndex + itemsPerPage, filteredUsers.length)} of {filteredUsers.length} entries
            </div>
            <div>
              <Button onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))} disabled={currentPage === 1}>Previous</Button>
              <span className="mx-2">{currentPage}</span>
              <Button onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))} disabled={currentPage === totalPages}>Next</Button>
            </div>
          </div>
        </main>
      </section>
    </div>
  );
};

export default Users;
