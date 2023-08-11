import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import Cookies from 'js-cookie';
import {AiFillFacebook,AiFillGithub,AiFillGoogleCircle} from "react-icons/ai";

function UserLogin() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post('http://localhost:3001/user/login', { email, password });
            const { message, token } = response.data;
            setMessage(message);

            // Store the token in a cookie
            Cookies.set('token', token);

            // Additional actions, such as redirecting to the Home page
            console.log('Login successful. Redirecting to Home page.');
            navigate('/home');

            // Clear the form inputs
            setEmail('');
            setPassword('');
        } catch (error) {
            console.error(error);
            setMessage('An error occurred during authentication.');
        }
    };

    return (
        <body className="bg-gray-200">
        <div className="container position-sticky z-index-sticky top-0">
            <div className="row">
                <div className="col-12">
                    <nav className="navbar navbar-expand-lg blur border-radius-xl top-0 z-index-3 shadow position-absolute my-3 py-2 start-0 end-0 mx-4">
                        <div className="container-fluid ps-2 pe-0">
                            <a className="navbar-brand font-weight-bolder ms-lg-0 ms-3" href="https://www.tunisietelecom.tn/particulier/">
                                <img src="/TT1.png" alt="Tunisie Telecom Logo" style={{"height": "40px", "width": "40px", "margin-right": "10px"}} />
                                Tunisie Telecom
                            </a>
                            <a className="navbar-brand font-weight-bolder ms-lg-0 ms-3" href="https://www.tunisietelecom.tn/particulier/">
                                TT Speed Link
                            </a>
                        </div>
                    </nav>
                </div>

            </div>
        </div>
        <main className="main-content mt-0 ps">
            <div className="page-header align-items-start min-vh-100" style={{backgroundImage: "url('https://images.unsplash.com/photo-1624280433509-b01afeaf68e5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1315&q=80')"}}>
                <span className="mask bg-gradient-dark opacity-6"></span>
                <div className="container my-auto">
                    <div className="row">
                        <div className="col-lg-4 col-md-8 col-12 mx-auto">
                            <div className="card z-index-0 fadeIn3 fadeInBottom">
                                <div className="card-header p-0 position-relative mt-n4 mx-3 z-index-2">
                                    <div className=" border-radius-lg py-3 pe-1 dark-version">
                                        <h4 className="text-white font-weight-bolder text-center mt-2 mb-0">Sign in</h4>
                                        <div className="row mt-3">
                                            <div className="col-2 text-center ms-auto text-white text-lg">
                                                <a className="btn btn-link text-white text-lg px-3" href="https://fr-fr.facebook.com/">
                                                    <AiFillFacebook size={26} />
                                                </a>
                                            </div>
                                            <div className="col-2 text-center px-1">
                                                <a className="btn btn-link text-white text-lg px-3" href="https://github.com/amenibelhadj">
                                                    <AiFillGithub size={26} />
                                                </a>
                                            </div>
                                            <div className="col-2 text-center me-auto">
                                                <a className="btn btn-link text-white text-lg px-3" href="https://www.google.com/">
                                                    <AiFillGoogleCircle size={26} />
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="card-body">
                                    <form role="form" className="text-start" onSubmit={handleLogin}>
                                        <div className="input-group input-group-outline my-3">
                                            <label className="form-label" htmlFor="email">
                                                <span className="label-text">Email</span>
                                            </label>
                                            <input
                                                type="email"
                                                id="email"
                                                className="form-control"
                                                onChange={(e) => setEmail(e.target.value)}
                                                required
                                            />
                                        </div>
                                        <div className="input-group input-group-outline mb-3">
                                            <label className="form-label" htmlFor="password">
                                                <span className="label-text">Password</span>
                                            </label>
                                            <input
                                                type="password"
                                                id="password"
                                                className="form-control"
                                                onChange={(e) => setPassword(e.target.value)}
                                                required
                                            />
                                        </div>
                                        <div className="form-check form-switch d-flex align-items-center mb-3">
                                            <input className="form-check-input" type="checkbox" id="rememberMe" checked="" />
                                            <label className="form-check-label" htmlFor="rememberMe">
                                                Remember me
                                            </label>
                                        </div>
                                        <div className="text-center">
                                            <button type="submit" className="btn dark-version text-white w-100 my-4 mb-2">
                                                Sign in
                                            </button>
                                        </div>
                                    </form>

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="ps__rail-x" style={{left: "0px", bottom: "0px"}}>
                <div className="ps__thumb-x" tabIndex="0" style={{left: "0px", width: "0px"}}></div>
            </div>
            <div className="ps__rail-y" style={{top: "0px", right: "0px"}}>
                <div className="ps__thumb-y" tabIndex="0" style={{top: "0px", height: "0px"}}></div>
            </div>
        </main>
        </body>

    );
}

export default UserLogin;
