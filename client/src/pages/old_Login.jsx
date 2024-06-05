import React, { useState } from "react";
import axios from 'axios';
import {toast} from 'react-hot-toast'
import { useNavigate } from "react-router-dom"

export default function Login() {
  const navigate = useNavigate()
  const [data, setData] = useState({
      email: "",
      password: "",
    });
    

    const loginUser = async (e) => {
      e.preventDefault()
        const {email, password} = data
        try {
          const {data} = await axios.post('/login', {
            email,
            password
          })
          if(data.error) {
            toast.error(data.error)
          } else {
            setData({});
            navigate('/Dashboard')
          }
        } catch (error) {
          
        }
    }

return(
<>

      <div className="container">
        <div className="row justify-content-center">
          <div className="col-12 col-sm-10 col-md-8 col-lg-6 col-xl-5 col-xxl-4">
            <div className="card border border-light-subtle rounded-3 shadow-sm">
              <div className="card-body p-3 p-md-4 p-xl-5">
            
    
                <form onSubmit={loginUser}>
                  <div className="row gy-2 overflow-hidden">
                    <div className="col-12">
                      <div className="form-floating mb-3">
                        <input
                          type="text"
                          className="form-control"
                          name="email"
                          id="email"
                          placeholder="name@example.com"
                          value={data.email} onChange={(e) => setData({...data, email: e.target.value})}
                          required
                        />
                        <label htmlFor="email" className="form-label">
                          Username
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
                      <div className="d-grid my-3">
                        <button className="btn btn-primary btn-lg" type="submit">
                          Log in
                        </button>
                      </div>
                    </div>
                    
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
  

</>

);
}
