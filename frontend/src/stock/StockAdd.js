import React, { useState, useEffect } from 'react';
import axios from 'axios';
import LOGO_TT from "../LOGO_TT_.jpg";
import Aside from "../template/Aside";

function StockAdd() {
    const [stock, setStock] = useState({
        sim_type:'',
        quantity:'0',
        status:'available',
        shopId:''
    });
    const [shops, setShops] = useState([]);

    useEffect(() => {
        fetchShops();
    }, []);

    const handleChange = (event) => {
        const { name, value } = event.target;
        setStock((prevStock) => ({ ...prevStock, [name]: value }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            await axios.post('http://localhost:3001/stock', stock);
            console.log('Stock created successfully.');
            window.location.href = "/stocks";
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
                <div className="page-header min-height-300 border-radius-xl" style={{ backgroundImage: "url('https://cms.ar-racking.com/uploads/2021/11/stock-2023.jpg')" }}>
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
                                <h5 className="mb-1">Add new stock</h5>
                                <p className="mb-0 font-weight-normal text-sm">To get started, please provide the following details:</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="card-body">
                    <form role="form" onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label htmlFor="shopId">Select a Shop</label>
                            <select
                                className="form-control"
                                id="shopId"
                                name="shopId"
                                value={stock.shopId}
                                onChange={handleChange}
                            >
                                <option value="">Select a shop</option>
                                {shops.map((shop) => (
                                    <option key={shop.id} value={shop.id}>{shop.name}</option>
                                ))}
                            </select>
                        </div>
                        <div className="form-group">
                            <label htmlFor="sim_type">SIM Type</label>
                            <select
                                className="form-control"
                                id="sim_type"
                                name="sim_type"
                                value={stock.sim_type}
                                onChange={handleChange}
                            >
                                <option value="">Select a type</option>
                                <option value="standard">Standard</option>
                                <option value="nano">Nano</option>
                                <option value="micro">Micro</option>
                            </select>
                        </div>
                        <div className="d-flex align-items-center justify-content-between" style={{ "float": "right", "margin-right": "60px" }}>
                            <button type="submit" className="btn btn-outline-danger btn-sm mb-0 mt-4 ">Add</button>
                        </div>
                    </form>
                </div>
            </div>
        </main>
        </body>
    );
}

export default StockAdd;
