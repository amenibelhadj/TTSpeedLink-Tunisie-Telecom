import React, { useState } from 'react';
import axios from 'axios';
import LOGO_TT from "../LOGO_TT_.jpg";
import Aside from "../template/Aside";
import Footer from "../template/Footer";

function ShopAddForm() {
    const [shop, setShop] = useState({
        name: '',
        address: '',
        phone_number: '',
        status:'closed',
    });

    const handleChange = (event) => {
        const { name, value } = event.target;
        setShop((prevShop) => ({ ...prevShop, [name]: value }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            await axios.post('http://localhost:3001/shop', shop);
            console.log('Shop created successfully.');
            window.location.href = "/shops";
        } catch (error) {
            console.error(error);
        }
    };


    return (
        <body className="g-sidenav-show  bg-gray-100">
        <Aside/>
        <main className="main-content border-radius-lg ">
            <div className="card card-plain   justify-content-center mt-4 " style={{"margin-right":"40px","margin-left":"40px"}}>
                <div className="page-header min-height-300 border-radius-xl" style={{backgroundImage: "url('https://images.unsplash.com/photo-1504384308090-c894fdcc538d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80')"}}>
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
                                <h5 className="mb-1">Add A New Shop</h5>
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
                                value={shop.name}
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
                                value={shop.address}
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
                                value={shop.phone_number}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="d-flex align-items-center justify-content-between" style={{"float": "right", "margin-right":"60px"}}>
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

export default ShopAddForm;
