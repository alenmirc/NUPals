import React, { useState, useContext, useEffect } from "react";
import "./Edit.css";
import { toast } from 'react-hot-toast';
import { UserContext } from '../../../../../context/userContext';
import moment from 'moment';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import profile from "../../../../assets/profile.png"

export default function Edit() {
  const navigate = useNavigate();
  const { user } = useContext(UserContext); 
  const userId = user?.id;

  
 
  
  const interests = [
    'Basketball', 'Volleyball', 'Football', 'Badminton', 'Swimming', 'Track', 'Table Tennis', 'Taekwondo', 'Chess', 'Baseball', 
    'Frisbee', 'Tennis', 'Martial Arts', 'Rugby', 'Photography', 'Cooking', 'Drawing', 'Gardening', 'Reading', 'Writing', 'Music', 
    'Theater', 'Movies', 'DIY', 'Calligraphy', 'Fishing', 'Speaking', 'Leadership', 'Business', 'Coding'
  ];

  const [checkedInterests, setCheckedInterests] = useState([]);
  const [firstName, setFirstName] = useState(user.firstName);
  const [lastName, setLastName] = useState(user.lastName);
  const [department, setDepartment] = useState(user.department);
  const [profilePicture, setProfilePicture] = useState(null);
  const [base64String, setBase64String] = useState('');
  const [fileName, setFileName] = useState('');
  
  console.log("userid:", userId);

  const [userData, setUserData] = useState(null);
  
  useEffect(() => {
    console.log("Department state changed:", department);
  }, [department]);

  useEffect(() => {
    if (userId) {
      axios.get(`/getUserprofile?userId=${userId}`)
        .then(response => {
          console.log(response.data); // Log the userData received from the API
          setUserData(response.data);
          setFirstName(response.data.firstName || ''); // Ensure empty string if data is not available
          setLastName(response.data.lastName || ''); // Ensure empty string if data is not available
          setDepartment(response.data.department || ''); // Ensure empty string if data is not available
          setCheckedInterests(response.data.skills || []); 
          setProfilePicture(response.data.profilePicture);
        })
        .catch(error => {
          console.error(error);
        });
    }
  }, [userId]);

  

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    const fileSize = file.size;
    const maxSize = 10 * 1024 * 1024; // 10MB
  
    if (fileSize > maxSize) {
      toast.error('File size exceeds 10MB');
      return;
    }
    setFileName(file.name); // Set the file name

    const reader = new FileReader();
  
    reader.onload = () => {
      const base64 = reader.result;
      setBase64String(base64);
      setProfilePicture(file); // Set the profile picture here
    };
  
    if (file.type.includes('image')) {
      reader.readAsDataURL(file);
    }
  };

  const handleCheckboxChange = (interest) => {
    if (checkedInterests.includes(interest)) {
      setCheckedInterests(checkedInterests.filter(item => item!== interest));
    } else {
      if (checkedInterests.length < 5) {
        setCheckedInterests([...checkedInterests, interest]);
      } else {
        toast.error('You can only select up to 5 interests!');
      }
    }
  };

  
  const handleSubmit = async (e) => {
    e.preventDefault();
    const skillsJson = JSON.stringify(checkedInterests);
    const formData = new FormData();
    formData.append('userId', userId);
    formData.append('firstName', firstName);
    formData.append('lastName', lastName);
    formData.append('department', department);
    formData.append('skills', skillsJson);
    formData.append('profilePicture', base64String);

    try {
      const response = await axios.put('/updateprofile', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      toast.success('Profile updated successfully!');
      navigate('/profile');
    } catch (error) {
      toast.error('Error updating profile!');
    }
  };

  return (
    <div className="i-form edit-container">
      <div className="card-body mt-3">
      <Link to="/profile" className="btn btn-secondary">
  &lt; Back
</Link>
        <div className="e-profile mt-3">
          <div className="row">
            <div className="col-12 col-sm-auto mb-3">
              <div className="mx-auto" style={{ width: "140px" }}>
              {userData && (
                <img
                  src={userData.profilePicture || profile}
                  alt="Profile"
                  className="d-flex justify-content-center align-items-center rounded"
                  style={{ height: "140px", width: "140px", objectFit: "cover", backgroundColor: "rgb(233, 236, 239)" }}
                />
              )}
              </div>
            </div>
            <div className="col d-flex flex-column flex-sm-row justify-content-between mb-3">
              <div className="text-center text-sm-left mb-2 mb-sm-0">
                <h4 className="pt-sm-2 pb-1 mb-0 text-nowrap">{userData ? `${userData.firstName} ${userData.lastName}` : `${firstName} ${lastName}`}</h4>
                <div className="mt-2">
                  <input type="file" accept="image/*" onChange={handlePhotoChange} style={{ display: 'none' }} id="upload-photo" />
                  <label htmlFor="upload-photo" className="btn btn-primary">
                    <i className="fa fa-fw fa-camera"></i>
                    <span>Change Photo</span>
                  </label>
                  {fileName && <div className="mt-2">{fileName}</div>} {/* Display the file name */}
                </div>
              </div>
              <div className="text-center text-sm-right">
                <span className="badge badge-secondary">administrator</span>
                <div className="text-muted"><small>Joined {moment(user.createdAt).format('MMMM DD, YYYY')}</small></div>
              </div>
            </div>
          </div>
          <ul className="nav nav-tabs">
            <li className="nav-item"><a href="" className="active nav-link">Settings</a></li>
            <li className="nav-item"><a href="" className="nav-link">Change Password</a></li>
          </ul>
          <div className="tab-content pt-3">
            <div className="tab-pane active">
            <form className="form" noValidate="" onSubmit={handleSubmit}>
              <div className="row">
                <div className="col">
                  <div className="row">
                    <div className="col">
                      <div className="form-group">
                        <label>First Name</label>
                        <input className="form-control" type="text" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
                      </div>
                    </div>
                    <div className="col">
                      <div className="form-group">
                        <label>Last Name</label>
                        <input className="form-control" type="text" value={lastName} onChange={(e) => setLastName(e.target.value)} />
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col">
                      <div className="form-group mt-3">
                        <label>Email</label>
                        <input disabled className="form-control" type="text" value={user.email} />
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col">
                      <div className="form-group mt-3">
                        <label>Department</label>
                        <select className="form-control" value={department} onChange={(e) => setDepartment(e.target.value)}>
                          <option value="">Select Department</option> {/* Added placeholder option */}
                          <option value="Allied Health">Allied Health</option>
<option value="Architecture">Architecture</option>
<option value="Business and Accountancy">Business and Accountancy</option>
<option value="Computing & Information Technologies">Computing & Information Technologies</option>
<option value="Education, Arts and Sciences">Education, Arts and Sciences</option>
<option value="Engineering">Engineering</option>
<option value="Tourism and Hospitality Management">Tourism and Hospitality Management</option>
                        </select>
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col">
                      <div className="form-group mt-3 mb-2">
                        <label>Choose top 5 interests:</label>
                        <div className="custom-controls-stacked">
                          <div className="row">
                            {interests.map((interest, index) => (
                              <div className="col-3" key={index}>
                                <div className="custom-control custom-checkbox">
                                  <input 
                                    type="checkbox" 
                                    className="custom-control-input" 
                                    id={`interest${index}`} 
                                    checked={checkedInterests.includes(interest)} 
                                    onChange={() => handleCheckboxChange(interest)} 
                                  />
                                  <label className="custom-control-label" htmlFor={`interest${index}`}>{interest}</label>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col d-flex justify-content-end">
                      <button className="btn btn-primary" type="submit">Save Changes</button>
                    </div>
                  </div> 
                </div>
              </div>
            </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
