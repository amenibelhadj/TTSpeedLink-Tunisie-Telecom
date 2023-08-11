import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import Aside from "../template/Aside";
import Footer from "../template/Footer";

function UserUpdate() {
    const { id } = useParams();
    const [formData, setFormData] = useState({
        name: '',
        password: '',
        cin: '',
        address: '',
        email: '',
        role: '',
        shopId: '',
    });
    const [shops, setShops] = useState([]);
    useEffect(() => {
        fetchShops();
        const fetchUser = async () => {
            try {
                const response = await axios.get(`http://localhost:3001/user/${id}`);
                const user = response.data;
                setFormData({
                    name: user.name,
                    password: user.password,
                    cin: user.cin,
                    address: user.address,
                    email: user.email,
                    role: user.role,
                    region:user.region,
                    shopId:user.shopId
                });
            } catch (error) {
                console.error(error);
            }
        };

        fetchUser();
    }, [id]);

    const fetchShops = async () => {
        try {
            const response = await axios.get('http://localhost:3001/shop');
            setShops(response.data);
        } catch (error) {
            console.error(error);
        }
    };
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            await axios.put(`http://localhost:3001/user/${id}`, formData);
            window.location.href = "/users/staff";
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <body className="g-sidenav-show  bg-gray-100">
        <Aside/>
        <main className="main-content border-radius-lg ">
            <div className="card card-plain   justify-content-center mt-4" style={{"margin-right":"40px","margin-left":"40px"}}>
                <div className="card-header text-center">
                    <h4 className="font-weight-bolder">Update User Informations</h4>
                    <p className="mb-0">To update informations, kindly provide the following details for us to proceed with the necessary changes.</p>
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
                                value={formData.name}
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
                                value={formData.email}
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
                                value={formData.password}
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
                                value={formData.cin}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="role">Region</label>
                            <select
                                className="form-control"
                                id="region"
                                name="region"
                                value={formData.region}
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
                                value={formData.address}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="role">Role</label>
                            <select
                                className="form-control"
                                id="role"
                                name="role"
                                value={formData.role}
                                onChange={handleChange}
                            >
                                <option value="">Select a role</option>
                                <option value="admin">Admin</option>
                                <option value="seller">Seller</option>
                                <option value="client">Client</option>
                            </select>
                        </div>
                        <div className="form-group">
                            <label htmlFor="shopId">Select a Shop</label>
                            <select
                                className="form-control"
                                id="shopId"
                                name="shopId"
                                value={formData.shopId}
                                onChange={handleChange}
                            >
                                <option value="">Select a shop</option>
                                {shops.map((shop) => (
                                    <option key={shop.id} value={shop.id}>{shop.name}</option>
                                ))}
                            </select>
                        </div>
                        <div className="d-flex align-items-center justify-content-between" style={{"float": "right", "margin-right":"60px"}}>
                            <button type="submit" className="btn btn-outline-danger btn-sm mb-0 mt-4 ">update</button>
                        </div>
                    </form>
                </div>
            </div>
            <Footer />
        </main>
        </body>
    );
}

export default UserUpdate;
