import React, { useEffect, useState } from "react";
import axios from "axios";
import Aside from "../template/Aside";
import {Link, useLocation} from "react-router-dom";
import {
    TbHexagonNumber1,
    TbHexagonNumber2,
    TbHexagonNumber3,
    TbHexagonNumber4,
    TbSquareRoundedNumber1, TbSquareRoundedNumber2, TbSquareRoundedNumber3, TbSquareRoundedNumber4
} from "react-icons/tb";

const OrderAdd = () => {
    const [order, setOrder] = useState({
        date: '',
        userId: ''
    });

    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const userId = searchParams.get('userId');

    useEffect(() => {
        if (userId) {
            setOrder((prevOrder) => ({ ...prevOrder, userId: userId }));
        }
    }, [userId]);

    const handleChange = (event) => {
        const { name, value } = event.target;
        setOrder((prevOrder) => ({ ...prevOrder, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post('http://localhost:3001/order/user', order);
            console.log('Order created successfully.');
            if (response.data && response.data.id) {
                const orderId = response.data.id;
                window.location.href = `/cards/step-three?orderId=${orderId}`;
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
                        <div className="card">
                            <Link
                                className=" text-black font-weight-bold text-decoration-none"
                                to="/cards/client"
                            >
                                <div className="card-header mx-4 p-3 text-center">
                                    <div className="icon icon-shape icon-lg shadow-dark text-center border-radius-lg">
                                        <TbSquareRoundedNumber1 size={55} className="text-dark-blue text-center mt-1" />
                                    </div>
                                </div>
                                <div className="card-body pt-0 p-3 text-center">
                                    <h6 className="text-center text-dark-blue mb-0 mt-4">Integrate Client</h6>
                                </div>
                            </Link>
                        </div>
                    </div>
                    <div className="col-md-3 col-5">
                        <div className="card shadow-dark dark-version">
                            <Link
                                className=" text-black font-weight-bold text-decoration-none"
                                to="/cards/step-two"
                            >
                                <div className="card-header mx-4 p-3 text-center">
                                    <div className="icon icon-shape icon-lg shadow-blur text-center border-radius-lg">
                                        <TbSquareRoundedNumber2 size={55} className="text-white text-center mt-1" />
                                    </div>
                                </div>
                                <div className="card-body pt-0 p-3 text-center">
                                    <h6 className="text-center text-wblack mb-0 mt-4">Place A Request</h6>
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
                    <h6 className="text-black text-capitalize ps-3">Second Step: Place A request</h6>
                </div>
            </div>
            <div className="card-body mt-4" style={{ "margin-right": "150px", "margin-left": "150px" }}>
                <form role="form" onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="name">Date</label>
                        <input
                            type="datetime-local"
                            className="form-control"
                            id="date"
                            name="date"
                            value={order.date}
                            onChange={handleChange}
                        />
                    </div>
                    <input
                        type="hidden"
                        name="userId"
                        value={order.userId}
                    />
                    <div className="d-flex align-items-center justify-content-between" style={{ "float": "right", "margin-right": "60px" }}>
                        <button type="submit" className="btn btn-dark shadow-dark mt-2 ">Create</button>
                    </div>
                </form>
            </div>
        </main>
        </body>
    );
}

export default OrderAdd;
