import { useState } from "react"
import axios from 'axios'
import {toast} from 'react-hot-toast'
import { useNavigate } from "react-router-dom"

export default function Register() {
  const navigate = useNavigate()
  const [data, setData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    sname: '',
    password: '',
  })
  const registerUser = async (e) => {
    e.preventDefault()
    const {firstName, lastName, email, password} = data
    try {
      const {data} = await axios.post ('/register', {
        firstName, lastName, email, password
      })
      if(data.error){
        toast.error(data.error)
      } else {
        setData({})
        toast.success('Login Succesful, Welcome!')
        navigate('/login')
      }
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <>
     <div>
        
          <div className="container">
            <div className="row justify-content-center">
              <div className="col-12 col-sm-10 col-md-8 col-lg-6 col-xl-5 col-xxl-4">
                <div className="card border border-light-subtle rounded-3 shadow-sm">
                  <div className="card-body p-3 p-md-4 p-xl-5">
           
                    <h2 className="fs-6 fw-normal text-center text-secondary mb-4">
                      Enter your details to register
                    </h2>
                    <form onSubmit={registerUser}>
                      <div className="row gy-2 overflow-hidden">
                        <div className="col-12">
                          <div className="form-floating mb-3">
                            <input
                              type="text"
                              className="form-control"
                              name="firstName"
                              id="firstName"
                              placeholder="First Name"
                              value={data.firstName} onChange={(e) => setData({...data, firstName: e.target.value})}
                              required
                            />
                            <label htmlFor="firstName" className="form-label">
                              First Name
                            </label>
                          </div>
                        </div>
                        <div className="col-12">
                          <div className="form-floating mb-3">
                            <input
                              type="text"
                              className="form-control"
                              name="lastName"
                              id="lastName"
                              placeholder="Last Name"
                              value={data.lastName} onChange={(e) => setData({...data, lastName: e.target.value})}
                              required
                            />
                            <label htmlFor="lastName" className="form-label">
                              Last Name
                            </label>
                          </div>
                        </div>
                        <div className="col-12">
                          <div className="form-floating mb-3">
                            <input
                              type="email"
                              className="form-control"
                              name="email"
                              id="email"
                              placeholder="name@example.com"
                              value={data.email} onChange={(e) => setData({...data, email: e.target.value})}
                              required
                            />
                            <label htmlFor="email" className="form-label">
                              Email
                            </label>
                          </div>
                        </div>
                        <div className="col-12">
                          <div className="form-floating mb-3">
                            <input
                              type="password"
                              className="form-control"
                              name="password"
                              id="password"
                              placeholder="Password"
                              value={data.password} onChange={(e) => setData({...data, password: e.target.value})}
                              required
                            />
                            <label htmlFor="password" className="form-label">
                              Password
                            </label>
                          </div>
                        </div>
                        <div className="col-12">
                          <div className="form-check">
                            <input
                              className="form-check-input"
                              type="checkbox"
                              name="iAgree"
                              id="iAgree"
                              required
                            />
                            <label className="form-check-label text-secondary" htmlFor="iAgree">
                              I agree to the <a href="#!" className="link-primary text-decoration-none">terms and conditions</a>
                            </label>
                          </div>
                        </div>
                        <div className="col-12">
                          <div className="d-grid my-3">
                            <button className="btn btn-primary btn-lg" type="submit">
                              Sign up
                            </button>
                          </div>
                        </div>
                        <div className="col-12">
                          <p className="m-0 text-secondary text-center">
                            Already have an account? <a href="#!" className="link-primary text-decoration-none">Sign in</a>
                          </p>
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
      
      </div>
      
  <div>
      <form onSubmit={registerUser}>
      <label>Name</label>
      <input type='text' placeholder='Enter Name...' value={data.firstName} onChange={(e) => setData({...data, firstName: e.target.value})} />
      <label>Name</label>
      <input type='text' placeholder='Enter Name...' value={data.lastName} onChange={(e) => setData({...data, lastName: e.target.value})} />
      <label>Email</label>
      <input type='email' placeholder='Enter Email...' value={data.email} onChange={(e) => setData({...data, email: e.target.value})}/>
      <label>Password</label>
      <input type='password' placeholder='Enter Password...' value={data.password} onChange={(e) => setData({...data, password: e.target.value})}/>
      <button type='submit'>Submit</button>
      </form>
    </div>
    </>
  );
};

