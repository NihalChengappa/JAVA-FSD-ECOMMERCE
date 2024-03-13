import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import * as THREE from 'three';
import CLOUDS from 'vanta/dist/vanta.clouds.min.js';

function Register() {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [password2, setPassword2] = useState('');
    const [password2Valid, setPassword2Valid] = useState(false);
    const [error, setError] = useState('');
    const [vantaEffect, setVantaEffect] = useState(null);
    const backgroundRef = useRef(null);

    useEffect(() => {
        if (!vantaEffect) {
            setVantaEffect(
                CLOUDS({
                    el: backgroundRef.current,
                    THREE: THREE,
                    mouseControls: true,
                    touchControls: true,
                    gyroControls: false,
                    minHeight: 200.00,
                    minWidth: 200.00
                })
            );
        }
        return () => {
            if (vantaEffect) vantaEffect.destroy();
        };
    }, [vantaEffect]);

    const validatePassword2 = () => {
        setPassword2Valid(password === password2);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(username, email, password, password2)
        if (password!=password2) {
            setError('Passwords do not match');
            return;
        }
        try {
            const response = await axios.post('http://localhost:8060/auth/register', {
                username,
                email,
                password
            });
            console.log(response.data);
        } catch (error) {
            setError('User already exists');
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
                                        <div className="mb-3">
                                            <h3>Register</h3>
                                        </div>
                                    </div>
                                </div>
                                <form onSubmit={handleSubmit}>
                                    <div className="row gy-3 gy-md-4 overflow-hidden">
                                        <div className="col-12">
                                            <label htmlFor="username" className="form-label">
                                                Username <span className="text-danger">*</span>
                                            </label>
                                            <div className="input-group">
                                                <input
                                                    type="text"
                                                    className='form-control'
                                                    name="username"
                                                    id="username"
                                                    placeholder="Enter Username"
                                                    value={username}
                                                    onChange={(e) => setUsername(e.target.value)}
                                                    required
                                                />
                                            </div>
                                        </div>
                                        <div className="col-12">
                                            <label htmlFor="email" className="form-label">
                                                Email <span className="text-danger">*</span>
                                            </label>
                                            <div className="input-group">
                                                <input
                                                    type="email"
                                                    className='form-control'
                                                    name="email"
                                                    id="email"
                                                    placeholder="Enter Email"
                                                    value={email}
                                                    onChange={(e) => setEmail(e.target.value)}
                                                    required
                                                />
                                            </div>
                                        </div>
                                        <div className="col-12">
                                            <label htmlFor="password" className="form-label">
                                                Password <span className="text-danger">*</span>
                                            </label>
                                            <div className="input-group">
                                                <input
                                                    type="password"
                                                    className={`form-control ${password2Valid ? 'is-valid' : (password2 !== '' ? 'is-invalid' : '')}`}
                                                    name="password"
                                                    id="password"
                                                    placeholder='Enter Password'
                                                    value={password}
                                                    onChange={(e) => setPassword(e.target.value)}
                                                    // onBlur={validatePassword}
                                                    required
                                                />
                                                {!password2Valid && password2 !== '' && <span className="input-group-text bg-danger text-white">✘</span>}
                                            </div>
                                        </div>
                                        <div className="col-12">
                                            <label htmlFor="password2" className="form-label">
                                                Confirm Password <span className="text-danger">*</span>
                                            </label>
                                            <div className="input-group">
                                                <input
                                                    type="password"
                                                    className={`form-control ${password2Valid ? 'is-valid' : (password2 !== '' ? 'is-invalid' : '')}`}
                                                    name="password2"
                                                    id="password2"
                                                    placeholder='Confirm Password'
                                                    value={password2}
                                                    onChange={(e) => setPassword2(e.target.value)}
                                                    onBlur={validatePassword2}
                                                    required
                                                />
                                                {!password2Valid && password2 !== '' && <span className="input-group-text bg-danger text-white">✘</span>}
                                            </div>
                                        </div>
                                        <div className="col-12"></div>
                                        <div className="col-12">
                                            <div className="d-grid">
                                                <input type="submit" className="btn bsb-btn-xl btn-primary" value="Register now"/>
                                                    
                                            </div>
                                        </div>
                                        <p className="mb-0">
                                            Already a member? <a href="\login" className="link-primary text-decoration-none">Login now</a>
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
    )
}

export default Register;
