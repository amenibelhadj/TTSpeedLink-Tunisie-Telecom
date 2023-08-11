import React, { useState } from "react";
import axios from "axios";
import {Link} from 'react-router-dom';
import Aside from "../template/Aside";
import {
    TbHexagonNumber1,
    TbHexagonNumber2,
    TbHexagonNumber3,
    TbHexagonNumber4,
    TbSquareRoundedNumber1, TbSquareRoundedNumber2, TbSquareRoundedNumber3, TbSquareRoundedNumber4
} from "react-icons/tb";

function ClientAdd() {
    const [user, setUser] = useState({
        name: '',
        password: '&DEwmRf2HuL+reuJ',
        cin: '',
        address: '',
        email: '',
        role: 'client',
        region: ''
    });

    const handleChange = (event) => {
        const { name, value } = event.target;
        setUser((prevUser) => ({ ...prevUser, [name]: value }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const response = await axios.post('http://localhost:3001/user/register', user);
            console.log('Registrated successfully!');

            if (response.data && response.data.id) {
                const userId = response.data.id;
                window.location.href = `/cards/step-two?userId=${userId}`;
                await axios.post('http://localhost:3001/user/email', { email: user.email });
                console.log('Email sent successfully.');
            } else {
                console.error('Invalid response data');
            }
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <body className="g-sidenav-show  bg-gray-100">
        <Aside />
        <main className="main-content border-radius-lg ">
            <div className="col-xl-10 mt-3" style={{ "margin-right": "auto", "margin-left": "auto" }}>
                <div className="row">
                    <div className="col-md-3 col-5">
                        <div className="card shadow-dark dark-version">
                            <Link
                                className=" text-black font-weight-bold text-decoration-none"
                                to="/cards/client"
                            >
                                <div className="card-header mx-4 p-3 text-center">
                                    <div className="icon icon-shape icon-lg shadow-blur text-center border-radius-lg">
                                        <TbSquareRoundedNumber1 size={55} className="text-white text-center mt-1" />
                                    </div>
                                </div>
                                <div className="card-body pt-0 p-3 text-center">
                                    <h6 className="text-center text-wblack mb-0 mt-4">Integrate Client</h6>
                                </div>
                            </Link>
                        </div>
                    </div>
                    <div className="col-md-3 col-5">
                        <div className="card">
                            <Link
                                className=" text-black font-weight-bold text-decoration-none"
                                to="/cards/step-two"
                            >
                                <div className="card-header mx-4 p-3 text-center">
                                    <div className="icon icon-shape icon-lg shadow-dark text-center border-radius-lg">
                                        <TbSquareRoundedNumber2 size={55} className="text-dark-blue text-center mt-1" />
                                    </div>
                                </div>
                                <div className="card-body pt-0 p-3 text-center">
                                    <h6 className="text-center text-dark-blue mb-0 mt-4">Place A Request</h6>
                                </div>
                            </Link>
                        </div>
                    </div>
                    <div className="col-md-3 col-5">
                        <div className="card">
                            <Link
                                className=" text-black font-weight-bold text-decoration-none"
                                to="/cards/step-three"
                            >
                                <div className="card-header mx-4 p-3 text-center">
                                    <div className="icon icon-shape icon-lg shadow-dark text-center border-radius-lg">
                                        <TbSquareRoundedNumber3 size={55} className="text-dark-blue text-center mt-1" />
                                    </div>
                                </div>
                                <div className="card-body pt-0 p-3 text-center">
                                    <h6 className="text-center text-dark-blue mb-0 mt-4">Pick A Number</h6>
                                </div>
                            </Link>
                        </div>
                    </div>
                    <div className="col-md-3 col-5">
                        <div className="card">
                            <Link
                                className=" text-black font-weight-bold text-decoration-none"
                                to="/invoice"
                            >
                                <div className="card-header mx-4 p-3 text-center">
                                    <div className="icon icon-shape icon-lg shadow-dark text-center border-radius-lg">
                                        <TbSquareRoundedNumber4 size={55} className="text-dark-blue text-center mt-1" />
                                    </div>
                                </div>
                                <div className="card-body pt-0 p-3 text-center">
                                    <h6 className="text-center text-dark-blue mb-0 mt-4">Claim An Invoice</h6>
                                </div>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
            <div className="card-header p-0 position-relative mt-n4 mx-7 z-index-2 mt-5">
                <div className="shadow-dark border-radius-lg pt-3 pb-2">
                    <h6 className="text-black text-capitalize ps-3">First Step: Integrate Client | Enter Informations</h6>
                </div>
            </div>
            <div className="card-body mt-4" style={{ "margin-right": "150px", "margin-left": "150px" }}>
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
                    <div className="d-flex align-items-center justify-content-between" style={{ "float": "right", "margin-right": "60px" }}>
                        <button type="submit" className="btn btn-dark shadow-dark mt-2">Create</button>
                    </div>
                </form>
            </div>
        </main>
        </body>
    );
}

export default ClientAdd;
