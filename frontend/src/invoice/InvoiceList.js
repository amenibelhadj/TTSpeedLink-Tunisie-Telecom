import React, { useState, useEffect } from 'react';
import Aside from "../template/Aside";
import { AiOutlinePrinter} from "react-icons/ai";
import LOGO_TT from "../LOGO_TT_.jpg";
import Footer from "../template/Footer";
import {Link} from "react-router-dom";

const InvoiceList = () => {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        fetch('http://localhost:3001/user/users/all')
            .then(response => response.json())
            .then(data => {
                setUsers(data);
            })
            .catch(error => {
                console.error('Error:', error);
            });
    }, []);

    const handlePrint = (user) => {
        fetch('http://localhost:3001/invoice/print-pdf', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ user })
        })
            .then(response => response.blob())
            .then(blob => {
                // Créer un objet URL à partir du Blob PDF
                const url = URL.createObjectURL(blob);

                // Ouvrir la fenêtre d'impression
                window.open(url, '_blank');
            })
            .catch(error => {
                console.error('Error:', error);
            });
    };


    return (
        <body className="g-sidenav-show  bg-gray-100">
        <Aside />
        <main className="main-content border-radius-lg ">
            <div className="row mt-3">
                <div className="col-12">
                    <div className="card my-4 " style={{ "marginRight": "15px", "marginLeft": "15px" }}>
                        <div className="card-header p-0 position-relative mt-n4 mx-3 z-index-2">
                            <div className="dark-version shadow-dark border-radius-lg pt-4 pb-3">
                                <h6 className="text-white text-capitalize ps-3">User Invoices</h6>
                            </div>
                        </div>
                        <div className="card-body px-0 pb-2">
                            <div className="table-responsive p-0">
                                <table className="table align-items-center mb-0">
                                    <thead>
                                    <tr>
                                        <th className="text-uppercase text-secondary text-xs font-weight-bolder opacity-7">
                                            Name
                                        </th>
                                        <th className="text-uppercase text-secondary text-xs font-weight-bolder opacity-7">
                                            Orders
                                        </th>
                                        <th className="text-uppercase text-secondary text-xs font-weight-bolder opacity-7">
                                            Print
                                        </th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {users.filter(user => user.role === 'client')
                                        .map((user) => (
                                        <tr key={user.id} >
                                            <td>
                                                <div className="d-flex align-items-center" style={{ marginLeft: "20px" }} >
                                                    <img
                                                        src={LOGO_TT}
                                                        className="avatar avatar-sm me-3 border-radius-lg"
                                                        alt="user1"
                                                    />
                                                    <div>
                                                        <h6 className="mb-0 text-sm">{user.name}</h6>
                                                        <p className="text-xs text-secondary mb-0">{user.email}</p>
                                                        <p className="text-xs text-secondary mb-0"hidden>{user.address}</p>
                                                        <p className="text-xs text-secondary mb-0"hidden>{user.cin}</p>
                                                    </div>
                                                </div>
                                            </td>
                                            <td>
                                                <div className="d-flex flex-column">
                                                    {user.orders.map((order) => (
                                                        <div key={order.id} className="mb-3">
                                                            <p className="text-xs font-weight-bold mb-1">
                                                                Order Date: {order.date}
                                                            </p>
                                                            {order.cards.map((card) => (
                                                                <p
                                                                    key={card.id}
                                                                    className="text-xs font-weight-bold mb-1"
                                                                >
                                                                    Card Number: {card.number} <p hidden>{card.pinCode} {card.activationDate}</p>
                                                                </p>
                                                            ))}
                                                            {order.invoice && (
                                                                <p className="text-xs font-weight-bold mb-1">
                                                                    Invoice Amount: {order.invoice.amount} <p hidden>{order.invoice.id}</p>
                                                                </p>
                                                            )}
                                                        </div>
                                                    ))}
                                                </div>
                                            </td>
                                            <td className="align-middle">
                                                <Link className="text-secondary  text-black text-xs" onClick={() => handlePrint(user)}><AiOutlinePrinter size={24} /></Link>
                                            </td>
                                        </tr>
                                    ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <Footer />
        </main>
        </body>

    );
};

export default InvoiceList;
