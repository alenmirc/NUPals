import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from '../../components/Navbar';
import Sidebar from '../../components/Sidebar';
import { toast } from 'react-hot-toast';
import '../Dashboard/Dashboard.css';
  
import { Table, Form, Button, InputGroup, Modal  } from 'react-bootstrap';
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

  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [newUser, setNewUser] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    department: '',
    skills: [],
    roles: [],
    profilePicture: ''
  });
  const [updatedUser, setUpdatedUser] = useState({
    firstName: '',
    lastName: '',
    email: '',
    department: '',
    skills: [],
    roles: [],
    profilePicture: ''
  });

  const handleEditClick = (user) => {
    setCurrentUser(user);
    setUpdatedUser(user);
    setShowEditModal(true);
  };

  const handleDeleteClick = async (userId) => {
    try {
      await axios.delete(`/deleteuser/${userId}`);
      fetchUsers();
      toast.success('Profile deleted successfully!');
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  const handleEditSubmit = async () => {
    try {
      await axios.put(`/updateuser/${currentUser._id}`, updatedUser);
      fetchUsers();
      setShowEditModal(false);
      toast.success('Profile updated successfully!');
    } catch (error) {
      console.error('Error updating user:', error);
    }
  };

  const handleCreateSubmit = async () => {
    try {
      await axios.post('/createuser', newUser);
      fetchUsers();
      setShowCreateModal(false);
      toast.success('New user created!');
      setNewUser({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        department: '',
        skills: [],
        roles: [],
        profilePicture: ''
      });
    } catch (error) {
      console.error('Error creating user:', error);
    }
  };

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
            <div className="right">
              <Button variant="success" onClick={() => setShowCreateModal(true)}>Create New User</Button>
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
                    <Button variant="primary" size="sm" onClick={() => handleEditClick(user)}>Edit</Button>
                    <Button variant="danger" size="sm" className="ml-2" onClick={() => handleDeleteClick(user._id)}>Delete</Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
            {/* Pagination controls */}

            <Modal show={showEditModal} onHide={() => setShowEditModal(false)}>
            <Modal.Header closeButton>
              <Modal.Title>Edit User</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form>
                <Form.Group controlId="formFirstName">
                  <Form.Label>First Name</Form.Label>
                  <Form.Control
                    type="text"
                    value={updatedUser.firstName}
                    onChange={(e) => setUpdatedUser({ ...updatedUser, firstName: e.target.value })}
                  />
                </Form.Group>
                <Form.Group controlId="formLastName">
                  <Form.Label>Last Name</Form.Label>
                  <Form.Control
                    type="text"
                    value={updatedUser.lastName}
                    onChange={(e) => setUpdatedUser({ ...updatedUser, lastName: e.target.value })}
                  />
                </Form.Group>
                <Form.Group controlId="formEmail">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="email"
                    value={updatedUser.email}
                    onChange={(e) => setUpdatedUser({ ...updatedUser, email: e.target.value })}
                  />
                </Form.Group>
                <Form.Group controlId="formDepartment">
                  <Form.Label>Department</Form.Label>
                  <Form.Control
                    type="text"
                    value={updatedUser.department}
                    onChange={(e) => setUpdatedUser({ ...updatedUser, department: e.target.value })}
                  />
                </Form.Group>
                <Form.Group controlId="formSkills">
                  <Form.Label>Skills</Form.Label>
                  <Form.Control
                    type="text"
                    value={updatedUser.skills.join(', ')}
                    onChange={(e) => setUpdatedUser({ ...updatedUser, skills: e.target.value.split(', ') })}
                  />
                </Form.Group>
                <Form.Group controlId="formRoles">
                  <Form.Label>Roles</Form.Label>
                  <Form.Control
                    type="text"
                    value={updatedUser.roles.join(', ')}
                    onChange={(e) => setUpdatedUser({ ...updatedUser, roles: e.target.value.split(', ') })}
                  />
                </Form.Group>
                <Form.Group controlId="formProfilePicture">
                  <Form.Label>Profile Picture URL</Form.Label>
                  <Form.Control
                    type="text"
                    value={updatedUser.profilePicture}
                    onChange={(e) => setUpdatedUser({ ...updatedUser, profilePicture: e.target.value })}
                  />
                </Form.Group>
                <Button variant="primary" onClick={handleEditSubmit}>
                  Save Changes
                </Button>
              </Form>
            </Modal.Body>
          </Modal>

          <Modal show={showCreateModal} onHide={() => setShowCreateModal(false)}>
            <Modal.Header closeButton>
              <Modal.Title>Create New User</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form>
                <Form.Group controlId="formFirstName">
                  <Form.Label>First Name</Form.Label>
                  <Form.Control
                    type="text"
                    value={newUser.firstName}
                    onChange={(e) => setNewUser({ ...newUser, firstName: e.target.value })}
                  />
                </Form.Group>
                <Form.Group controlId="formLastName">
                  <Form.Label>Last Name</Form.Label>
                  <Form.Control
                    type="text"
                    value={newUser.lastName}
                    onChange={(e) => setNewUser({ ...newUser, lastName: e.target.value })}
                  />
                </Form.Group>
                <Form.Group controlId="formEmail">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="email"
                    value={newUser.email}
                    onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
                  />
                </Form.Group>
                <Form.Group controlId="formPassword">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    value={newUser.password}
                    onChange={(e) => setNewUser({ ...newUser, password: e.target.value })}
                  />
                </Form.Group>
                <Form.Group controlId="formDepartment">
                  <Form.Label>Department</Form.Label>
                  <Form.Control
                    type="text"
                    value={newUser.department}
                    onChange={(e) => setNewUser({ ...newUser, department: e.target.value })}
                  />
                </Form.Group>
                <Form.Group controlId="formSkills">
                  <Form.Label>Skills</Form.Label>
                  <Form.Control
                    type="text"
                    value={newUser.skills.join(', ')}
                    onChange={(e) => setNewUser({ ...newUser, skills: e.target.value.split(', ') })}
                  />
                </Form.Group>
                <Form.Group controlId="formRoles">
                  <Form.Label>Roles</Form.Label>
                  <Form.Control
                    type="text"
                    value={newUser.roles.join(', ')}
                    onChange={(e) => setNewUser({ ...newUser, roles: e.target.value.split(', ') })}
                  />
                </Form.Group>
                <Form.Group controlId="formProfilePicture">
                  <Form.Label>Profile Picture URL</Form.Label>
                  <Form.Control
                    type="text"
                    value={newUser.profilePicture}
                    onChange={(e) => setNewUser({ ...newUser, profilePicture: e.target.value })}
                  />
                </Form.Group>
                <Button variant="success" onClick={handleCreateSubmit}>
                  Create User
                </Button>
              </Form>
            </Modal.Body>
          </Modal>


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
