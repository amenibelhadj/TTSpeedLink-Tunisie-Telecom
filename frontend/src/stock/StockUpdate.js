import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import Aside from "../template/Aside";

function StockUpdate() {
    const { id } = useParams();
    const [formData, setFormData] = useState({
        sim_type:'',
        status:''
    });
    useEffect(() => {
        const fetchStock = async () => {
            try {
                const response = await axios.get(`http://localhost:3001/stock/${id}`);
                const stock = response.data;
                setFormData({
                    sim_type: stock.sim_type,
                    status: stock.status
                });
            } catch (error) {
                console.error(error);
            }
        };

        fetchStock();
    }, [id]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            await axios.put(`http://localhost:3001/stock/${id}`, formData);
            window.location.href = "/stocks";
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
                            <label htmlFor="role">Sim Type</label>
                            <select
                                className="form-control"
                                id="sim_type"
                                name="sim_type"
                                value={formData.sim_type}
                                onChange={handleChange}
                            >
                                <option value="">Select a SIM type</option>
                                <option value="standard">standard</option>
                                <option value="nano">nano</option>
                                <option value="micro">micro</option>
                            </select>
                        </div>
                        <div className="form-group">
                            <label htmlFor="role">Stock Status</label>
                            <select
                                className="form-control"
                                id="status"
                                name="status"
                                value={formData.status}
                                onChange={handleChange}
                            >
                                <option value="">Select a status</option>
                                <option value="available">available</option>
                                <option value="out_of_stock">out_of_stock</option>
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

export default StockUpdate;
