import React from 'react';
import Sidebar from '../../components/Sidebar'; // Adjust the path according to your project structure
import Navbar from '../../components/Navbar'; // Adjust the path according to your project structure
import { useEffect } from 'react';

const Dashboard = () => {
  useEffect(() => {
    document.body.classList.add('dashboard-body');
    return () => {
      document.body.classList.remove('dashboard-body');
    };
  }, []);

  return (
    <div>
      <Sidebar />
      <Navbar />
      <section id="content">
        <main>
      <div className="head-title">
        <div className="left">
          <h1>Dashboard</h1>
          <ul className="breadcrumb">
           
          </ul>
        </div>
       
      </div>

      <ul className="box-info">
        <li>
          <i className='bx bxs-calendar-check' ></i>
          <span className="text">
            <h3>10</h3>
            <p>Post</p>
          </span>
        </li>
        <li>
          <i className='bx bxs-group' ></i>
          <span className="text">
            <h3>2</h3>
            <p>Users</p>
          </span>
        </li>
        <li>
          <i className='bx bxs-dollar-circle' ></i>
          <span className="text">
            <h3>0</h3>
            <p>Feedback</p>
          </span>
        </li>
      </ul>

      <div className="table-data">
        <div className="order">
          <div className="head">
            <h3>Recent Post</h3>
            <i className='bx bx-search' ></i>
            <i className='bx bx-filter' ></i>
          </div>
          <table>
            <thead>
              <tr>
                <th>User</th>
                <th>Date</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  <img src="img/people.png" alt="User" />
                  <p>Alen</p>
                </td>
                <td>01-10-2021</td>
                <td><span className="status completed">Completed</span></td>
              </tr>
              {/* Other table rows */}
            </tbody>
          </table>
        </div>
        <div className="todo">
          <div className="head">
            <h3>Todos</h3>
            <i className='bx bx-plus' ></i>
            <i className='bx bx-filter' ></i>
          </div>
          <ul className="todo-list">
            <li className="completed">
              <p>Admin</p>
              <i className='bx bx-dots-vertical-rounded' ></i>
            </li>
            {/* Other todo list items */}
          </ul>
        </div>
      </div>
      </main>
      </section>
    </div>
  );
};

export default Dashboard;