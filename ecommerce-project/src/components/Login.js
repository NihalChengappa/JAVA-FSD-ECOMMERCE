import React, { useEffect, useState, useRef } from 'react';
import * as THREE from 'three';
import CLOUDS from 'vanta/dist/vanta.clouds.min.js';
import axios from 'axios';

function Login({ setAuth }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [vantaEffect, setVantaEffect] = useState(null);
  const backgroundRef = useRef(null);
  useEffect(() => {
    if (!vantaEffect) {
      setVantaEffect(
        CLOUDS({
          el: backgroundRef.current,
          THREE:THREE,
          mouseControls: true,
  touchControls: true,
  gyroControls: false,
  minHeight: 200.00,
  minWidth: 200.00
          // showDots: false
        })
      );
    }
    return () => {
      if (vantaEffect) vantaEffect.destroy();
    };
  }, [vantaEffect]);

  const handleLogin = async (e) => {
    e.preventDefault();
    const loginObj = {
      username: username,
      password: password,
    };
    try {
      const response = await axios.post('http://localhost:8060/auth/login', loginObj);
      if (response.data && response.data === `Invalid Access`) {
        setError(response.data);
      } else {
        const token = response.data;
        console.log(token);
        setAuth(true);
        localStorage.setItem('token', token);
        // Redirect or handle successful login here
      }
    } catch (error) {
      console.error('Login error:', error);
      setError('An error occurred during login');
    }
  };

  return (
    <div
    ref={backgroundRef}
    className="vh-100 text-white"
    style={{ height: '100vh', width: '100%', position: 'fixed', top: 0, left: 0, zIndex: -1 }}
  >
      <section className="p-3 p-md-4 p-xl-5">
        <div className="container">
          <div className="row">
            <div className="col-12 col-md-6 bsb-tpl-bg-platinum">
            <div className="d-flex flex-column justify-content-between h-50 p-3 p-md-4 p-xl-5">
                            <img class="img-fluid rounded mx-auto my-4" loading="lazy" src="https://cdn-icons-png.flaticon.com/512/9131/9131529.png" width="245" height="80" />
                            {error && 
                            <div className="col-12 alert alert-danger">{error}
                            
                            </div>}
                            
                            
                            </div>
            </div>
            <div className="col-12 col-md-6 bsb-tpl-bg-lotion">
              <div className="p-3 p-md-4 p-xl-5">
                <div className="row">
                  <div className="col-12">
                    <div className="mb-5">
                      <h3>Log in</h3>
                    </div>
                  </div>
                </div>
                <form onSubmit={handleLogin}>
                  <div className="row gy-3 gy-md-4 overflow-hidden">
                    <div className="col-12">
                      <label htmlFor="email" className="form-label">
                        Username <span className="text-danger">*</span>
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        name="email"
                        id="email"
                        placeholder="Enter Username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                      />
                    </div>
                    <div className="col-12">
                      <label htmlFor="password" className="form-label">
                        Password <span className="text-danger">*</span>
                      </label>
                      <input
                        type="password"
                        className="form-control"
                        name="password"
                        id="password"
                        placeholder='Enter Password'
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                      />
                    </div>
                    <div className="col-12"></div>
                    <div className="col-12">
                      <div className="d-grid">
                        <button type="submit" className="btn bsb-btn-xl btn-primary" onSubmit={handleLogin}>
                          Log in now
                        </button>
                      </div>
                    </div>
                    <p className="mb-0">
                      Not a member yet? <a href="\register" className="link-primary text-decoration-none">Register now</a>
                    </p>
                  </div>
                </form>
                <div className="row">
                  <div className="col-12">
                    <hr className="mt-5 mb-4 border-secondary-subtle" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Login;
