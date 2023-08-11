import React, { useState, useEffect } from 'react';
import axios from 'axios';
import LOGO_TT from "../LOGO_TT_.jpg";
import Aside from "../template/Aside";
import Footer from "../template/Footer";

function UserAddForm() {
    // Declare a state variable called "user" and initialize it with an object
    const [user, setUser] = useState({
        name: '',
        password: '',
        cin: '',
        address: '',
        email: '',
        role: '',
        region: ''
    });

    // Declare a state variable called "shops" and initialize it as an empty array
    const [shops, setShops] = useState([]);

    // useEffect hook is used to fetch shops data when the component mounts
    useEffect(() => {
        fetchShops();
    }, []);


    const handleChange = (event) => {
        // Destructure the 'name' and 'value' properties from the event target
        const { name, value } = event.target;

        // Update the 'user' state using the setUser function and the previous user state
        // The spread operator (...) is used to create a shallow copy of the previous user state
        // The [name] is a computed property name, allowing us to dynamically update the corresponding property in the 'user' object
        setUser((prevUser) => ({ ...prevUser, [name]: value }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            await axios.post('http://localhost:3001/user/register', user);
            console.log('Registration successful!');
            window.location.href = "/users/staff";
            await axios.post('http://localhost:3001/user/email', { email: user.email });
            console.log('An error occurred during registration.');
        } catch (error) {
            console.error(error);
        }
    };

    const fetchShops = async () => {
        try {
            const response = await axios.get('http://localhost:3001/shop');
            setShops(response.data);
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <body className="g-sidenav-show  bg-gray-100">
        <Aside />
        <main className="main-content border-radius-lg ">
            <div className="card card-plain   justify-content-center mt-4 " style={{ "margin-right": "40px", "margin-left": "40px" }}>
                <div className="page-header min-height-300 border-radius-xl" style={{ backgroundImage: "url('https://ft.univ-tlemcen.dz/assets/uploads/_Images/D%C3%A9partements/The_Evolution_of_Kuwaits_Telecom_Industry-article.jpg')" }}>
                    <span className="mask bg-gradient-dark opacity-5"></span>
                </div>
                <div className="card card-body mx-3 mx-md-4 mt-n6">
                    <div className="row gx-4 mb-2">
                        <div className="col-auto">
                            <div className="avatar avatar-xl position-relative">
                                <img src={LOGO_TT} alt="profile_image" className="w-100 border-radius-lg shadow-sm" />
                            </div>
                        </div>
                        <div className="col-auto my-auto">
                            <div className="h-100">
                                <h5 className="mb-1">Create User Account</h5>
                                <p className="mb-0 font-weight-normal text-sm">To get started, please provide the following details to complete registration:</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="card-body">
                    <form role="form" onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label htmlFor="name">Name</label>
                            <input
                                type="text"
                                className="form-control"
                                id="name"
                                name="name"
                                value={user.name}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="email">Email</label>
                            <input
                                type="email"
                                className="form-control"
                                id="email"
                                name="email"
                                value={user.email}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="password">Password</label>
                            <input
                                type="password"
                                className="form-control"
                                id="password"
                                name="password"
                                value={user.password}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="cin">CIN</label>
                            <input
                                type="text"
                                className="form-control"
                                id="cin"
                                name="cin"
                                value={user.cin}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="region">Region</label>
                            <select
                                className="form-control"
                                id="region"
                                name="region"
                                value={user.region}
                                onChange={handleChange}
                            >
                                <option value="">Select a region</option>
                                <option value="Tunis">Tunis</option>
                                <option value="Ariana">Ariana</option>
                                <option value="Ben Arous">Ben Arous</option>
                                <option value="Manouba">Manouba</option>
                                <option value="Nabeul">Nabeul</option>
                                <option value="Zaghouan">Zaghouan</option>
                                <option value="Bizerte">Bizerte</option>
                                <option value="Béja">Béja</option>
                                <option value="Jendouba">Jendouba</option>
                                <option value="Kef">Kef</option>
                                <option value="Siliana">Siliana</option>
                                <option value="Sousse">Sousse</option>
                                <option value="Monastir">Monastir</option>
                                <option value="Mahdia">Mahdia</option>
                                <option value="Sfax">Sfax</option>
                                <option value="Kairouan">Kairouan</option>
                                <option value="Kasserine">Kasserine</option>
                                <option value="Sidi Bouzid">Sidi Bouzid</option>
                                <option value="Gabès">Gabès</option>
                                <option value="Medenine">Medenine</option>
                                <option value="Tataouine">Tataouine</option>
                            </select>
                        </div>
                        <div className="form-group">
                            <label htmlFor="address">Address</label>
                            <input
                                type="text"
                                className="form-control"
                                id="address"
                                name="address"
                                value={user.address}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="role">Role</label>
                            <select
                                className="form-control"
                                id="role"
                                name="role"
                                value={user.role}
                                onChange={handleChange}
                            >
                                <option value="">Select a role</option>
                                <option value="admin">Admin</option>
                                <option value="seller">Seller</option>
                            </select>
                        </div>
                        <div className="d-flex align-items-center justify-content-between" style={{ "float": "right", "margin-right": "60px" }}>
                            <button type="submit" className="btn btn-outline-danger btn-sm mb-0 mt-4 ">Create</button>
                        </div>
                    </form>
                </div>
            </div>
            <Footer />
        </main>
        </body>
    );
}

export default UserAddForm;
