import React from 'react';
import { Modal, useMantineTheme } from '@mantine/core';
import "./ModelProfile.css";

function ModelProfile({
  openEdit,
  setOpenEdit,
  handleModel,
  firstName,
  setFirstName,
  lastName,
  setLastName,
  email,
  setEmail,
  department,
  setDepartment,
  skills,
  setSkills,
  interests = [], // Default value to avoid undefined
  setInterests,
  profilePicture,
  setProfilePicture
}) {
  const theme = useMantineTheme();

  const handleInterestsChange = (e) => {
    const { value, checked } = e.target;
    if (checked) {
      if (interests.length < 5) {
        setInterests([...interests, value]);
      } else {
        e.target.checked = false;
        alert('You can select up to 5 interests only.');
      }
    } else {
      setInterests(interests.filter((interest) => interest !== value));
    }
  };

  const handleSkillsChange = (options) => {
    const selectedSkills = [];
    for (let i = 0; i < options.length; i++) {
      if (options[i].selected) {
        selectedSkills.push(options[i].value);
      }
    }
    if (selectedSkills.length <= 5) {
      setSkills(selectedSkills);
    } else {
      alert('You can select up to 5 skills only.');
    }
  };

  return (
    <>
      <Modal
        radius="8px"
        zIndex="1001"
        size="lg"
        opened={openEdit}
        title="Edit Info"
        onClose={() => setOpenEdit(false)}
        overlayProps={{
          color: theme.colorScheme === 'dark' ? theme.colors.dark[9] : theme.colors.gray[10],
        }}
      >
        <form className='modelForm' onSubmit={handleModel}>
          <div className="row1">
            <div className="inputBox1">
              <input
                type="text"
                name="firstName"
                id="firstName"
                placeholder="Enter First Name"
                onChange={(e) => setFirstName(e.target.value)}
                value={firstName}
                required
              />
            </div>
            
            <div className="inputBox1">
              <input
                type="text"
                name="lastName"
                id="lastName"
                placeholder="Enter Last Name"
                onChange={(e) => setLastName(e.target.value)}
                value={lastName}
                required
              />
            </div>
          </div>

          <div className="inputBox1">
            <input
              type="email"
              name="email"
              id="email"
              placeholder="Enter Email"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              required
            />
          </div>

          <div className="inputBox1">
            <select
              name="department"
              id="department"
              onChange={(e) => setDepartment(e.target.value)}
              value={department}
              required
            >
              <option value="" disabled>Select Department</option>
              <option value="ALLIED HEALTH">ALLIED HEALTH</option>
              <option value="ARCHITECTURE">ARCHITECTURE</option>
              <option value="BUSINESS AND ACCOUNTANCY">BUSINESS AND ACCOUNTANCY</option>
              <option value="COMPUTING & INFORMATION TECHNOLOGIES">COMPUTING & INFORMATION TECHNOLOGIES</option>
              <option value="EDUCATION, ARTS AND SCIENCES">EDUCATION, ARTS AND SCIENCES</option>
              <option value="ENGINEERING">ENGINEERING</option>
              <option value="TOURISM AND HOSPITALITY MANAGEMENT">TOURISM AND HOSPITALITY MANAGEMENT</option>
            </select>
          </div>

          <div className="inputBox1">
            <label>Interests (select up to 5):</label>
            <div className="interests">
              {['Basketball', 'Volleyball', 'Soccer', 'Swimming', 'Tennis', 'Badminton', 'Running', 'Cycling', 'Reading', 'Music'].map((interest) => (
                <div key={interest}>
                  <input
                    type="checkbox"
                    name="interests"
                    value={interest}
                    onChange={handleInterestsChange}
                    checked={interests.includes(interest)}
                  />
                  <label>{interest}</label>
                </div>
              ))}
            </div>
          </div>

          <div className="inputBox1">
            <input
              type="text"
              name="profilePicture"
              id="profilePicture"
              placeholder="Enter Profile Picture URL"
              onChange={(e) => setProfilePicture(e.target.value)}
              value={profilePicture}
            />
          </div>

          <button className='modelBtn'>Update</button>
        </form>
      </Modal>
    </>
  );
}

export default ModelProfile;
