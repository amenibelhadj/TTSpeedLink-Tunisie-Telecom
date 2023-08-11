import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import Aside from "../template/Aside";

function ShopUpdate() {
    const { id } = useParams();
    const [formData, setFormData] = useState({
        name: '',
        address: '',
        phone_number: '',
        status: '',
    });

    useEffect(() => {
        const fetchShop = async () => {
            try {
                const response = await axios.get(`http://localhost:3001/shop/${id}`);
                const shop = response.data;
                setFormData({
                    name: shop.name,
                    address:shop.address,
                    phone_number: shop.phone_number,
                    status: shop.status,
                });
            } catch (error) {
                console.error(error);
            }
        };

        fetchShop();
    }, [id]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            await axios.put(`http://localhost:3001/shop/${id}`, formData);
            window.location.href = "/shops";
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
                    <h4 className="font-weight-bolder">Update Shop Informations</h4>
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
                            <label htmlFor="address">Phone Number</label>
                            <input
                                type="text"
                                className="form-control"
                                id="phone_number"
                                name="phone_number"
                                value={formData.phone_number}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="role">Status</label>
                            <select
                                className="form-control"
                                id="status"
                                name="status"
                                value={formData.status}
                                onChange={handleChange}
                            >
                                <option value="">Select status</option>
                                <option value="open">Open</option>
                                <option value="closed">Closed</option>
                                <option value="renovation">Renovation</option>
                            </select>
                        </div>
                        <div className="d-flex align-items-center justify-content-between" style={{"float": "right", "margin-right":"60px"}}>
                            <button type="submit" className="btn btn-outline-danger btn-sm mb-0 mt-4 ">update</button>
                        </div>
                    </form>
                </div>
            </div>
        </main>
        </body>
    );
}

export default ShopUpdate;
