import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const Profile = () => {
  const [username, setUsername] = useState('alenmirc');
  const [firstName, setFirstName] = useState('Alen');
  const [lastName, setLastName] = useState('Banez');
  const [location, setLocation] = useState('Quezon City');
  const [email, setEmail] = useState('alen@example.com');
  const [phone, setPhone] = useState('0999999999');
  const [birthday, setBirthday] = useState('12/19/2002');

  const handleSaveChanges = () => {
    // Handle save changes logic here
    console.log('Changes saved');
  };

  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-xl-4 mb-4">
          {/* Profile picture card */}
          <div className="card">
            <div className="card-header">Profile Picture</div>
            <div className="card-body text-center">
              {/* Profile picture image */}
              <img class="img-account-profile rounded-circle mb-2" src="https://i.pinimg.com/736x/cd/04/ff/cd04ff6d7231af8b76b0792087c6d223.jpg" alt=""></img>
              {/* pag mag icon tayo eto <FontAwesomeIcon icon={faUserCircle} className="fa-10x mb-2" style={{ color: '#35408e' }} /> */}
              {/* Profile picture help block */}
              <div className="small font-italic text-muted mb-4">JPG or PNG no larger than 5 MB</div>
              {/* Profile picture upload button */}
              <button className="btn btn-primary" type="button" style={{ backgroundColor: '#35408e', borderColor: '#35408e' }}>Upload new image</button>
            </div>
          </div>
        </div>
        <div className="col-xl-8">
          {/* Account details card */}
          <div className="card">
            <div className="card-header">Account Details</div>
            <div className="card-body">
              <form>
                {/* Form Group (username) */}
                <div className="mb-3">
                  <label className="small mb-1" htmlFor="inputUsername">Username (how your name will appear to other users on the site)</label>
                  <input
                    className="form-control"
                    id="inputUsername"
                    type="text"
                    placeholder="Enter your username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                  />
                </div>
                {/* Form Row */}
                <div className="row gx-3 mb-3">
                  {/* Form Group (first name) */}
                  <div className="col-md-6">
                    <label className="small mb-1" htmlFor="inputFirstName">First name</label>
                    <input
                      className="form-control"
                      id="inputFirstName"
                      type="text"
                      placeholder="Enter your first name"
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                    />
                  </div>
                  {/* Form Group (last name) */}
                  <div className="col-md-6">
                    <label className="small mb-1" htmlFor="inputLastName">Last name</label>
                    <input
                      className="form-control"
                      id="inputLastName"
                      type="text"
                      placeholder="Enter your last name"
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                    />
                  </div>
                </div>
                {/* Form Row */}
                <div className="row gx-3 mb-3">
                  {/* Form Group (organization name) */}
                  
                  {/* Form Group (location) */}
                  <div className="col-md">
                    <label className="small mb-1" htmlFor="inputLocation">Address</label>
                    <input
                      className="form-control"
                      id="inputLocation"
                      type="text"
                      placeholder="Enter your Address"
                      value={location}
                      onChange={(e) => setLocation(e.target.value)}
                    />
                  </div>
                </div>
                {/* Form Group (email address) */}
                <div className="mb-3">
                  <label className="small mb-1" htmlFor="inputEmailAddress">Email address</label>
                  <input
                    className="form-control"
                    id="inputEmailAddress"
                    type="email"
                    placeholder="Enter your email address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                {/* Form Row */}
                <div className="row gx-3 mb-3">
                  {/* Form Group (phone number) */}
                  <div className="col-md-6">
                    <label className="small mb-1" htmlFor="inputPhone">Phone number</label>
                    <input
                      className="form-control"
                      id="inputPhone"
                      type="tel"
                      placeholder="Enter your phone number"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                    />
                  </div>
                  {/* Form Group (birthday) */}
                  <div className="col-md-6">
                    <label className="small mb-1" htmlFor="inputBirthday">Birthday</label>
                    <input
                      className="form-control"
                      id="inputBirthday"
                      type="text"
                      name="birthday"
                      placeholder="Enter your birthday"
                      value={birthday}
                      onChange={(e) => setBirthday(e.target.value)}
                    />
                  </div>
                </div>
                {/* Save changes button */}
                <button className="btn btn-primary" type="button" style={{ backgroundColor: '#35408e', borderColor: '#35408e' }} onClick={handleSaveChanges}>Save changes</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
