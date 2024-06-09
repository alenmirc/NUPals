import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from '../../components/Navbar';
import Sidebar from '../../components/Sidebar';
import '../Dashboard/Dashboard.css';

import { Table, Form, Button, InputGroup } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

const Post = () => {


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
  const [posts, setPosts] = useState([]);

  const fetchPosts = async () => {
    try {
      const response = await axios.get('/getallpost'); // Changed endpoint to /getallposts
      setPosts(response.data);
    } catch (error) {
      console.error('Error fetching posts:', error);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const handleSort = (column) => {
    const direction = sortedColumn === column && sortDirection === 'asc' ? 'desc' : 'asc';
    setSortedColumn(column);
    setSortDirection(direction);
  };

  const sortedPosts = [...posts].sort((a, b) => {
    if (!sortedColumn) return 0;
    const aValue = a[sortedColumn];
    const bValue = b[sortedColumn];
    if (aValue < bValue) return sortDirection === 'asc' ? -1 : 1;
    if (aValue > bValue) return sortDirection === 'asc' ? 1 : -1;
    return 0;
  });

  const filteredPosts = sortedPosts.filter(post =>
    Object.values(post).some(value => typeof value === 'string' && value.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedPosts = filteredPosts.slice(startIndex, startIndex + itemsPerPage);

  const totalPages = Math.ceil(filteredPosts.length / itemsPerPage);

  return (
    <div>
      <Sidebar />
      <Navbar />
      <section id="content">
        <main>
          <div className="head-title">
            <div className="left">
              <h1>Posts</h1>
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

          <Table striped bordered hover>
            <thead>
              <tr>
                <th onClick={() => handleSort('userId.firstName')}>User First Name</th>
                <th onClick={() => handleSort('userId.lastName')}>User Last Name</th>
                <th onClick={() => handleSort('content')}>Content</th>
                <th onClick={() => handleSort('media')}>Media</th>
                <th onClick={() => handleSort('createdAt')}>Created At</th>
                <th onClick={() => handleSort('updatedAt')}>Updated At</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {paginatedPosts.map(post => (
                <tr key={post._id}>
                  <td>{post.userId.firstName}</td>
                  <td>{post.userId.lastName}</td>
                  <td>{post.content}</td>
                  <td>
                    {post.media && (
                      <img src={post.media} alt="Media" style={{ width: '50px', height: '50px' }} />
                    )}
                  </td>
                  <td>{new Date(post.createdAt).toLocaleString()}</td>
                  <td>{new Date(post.updatedAt).toLocaleString()}</td>
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
              Showing {startIndex + 1} to {Math.min(startIndex + itemsPerPage, filteredPosts.length)} of {filteredPosts.length} entries
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

export default Post;