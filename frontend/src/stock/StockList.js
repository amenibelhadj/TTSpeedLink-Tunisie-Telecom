import React from "react";
import axios from "axios";
import { useEffect, useState } from "react";
import LOGO_TT from "../LOGO_TT_.jpg";
import {Link, useNavigate} from 'react-router-dom';
import {AiFillPlusCircle, AiOutlineAppstoreAdd, AiOutlineFileText, AiOutlineDelete} from "react-icons/ai";
import Aside from "../template/Aside";

function StockList() {
    const [stocks, setStocks] = useState([]);
    const [shops, setShops] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        fetchStocks();
    }, []);

    const fetchStocks = async () => {
        try {
            const stockResponse = await axios.get('http://localhost:3001/stock');
            const shopIds = stockResponse.data.map(stock => stock.shopId);

            const shopResponse = await axios.get('http://localhost:3001/shop');
            const shopData = shopResponse.data.filter(shop => shopIds.includes(shop.id));

            setStocks(stockResponse.data);
            setShops(shopData);
        } catch (error) {
            console.error(error);
        }
    };

    function getBadgeColor(status) {
        switch (status) {
            case 'available':
                return '#03a9f4';
            case 'out_of_stock':
                return '#f44335';
            default:
                return '#000000';
        }
    };

    const deleteStock = async (stockId) => {
        try {
            const confirmed = window.confirm("Are you sure you want to delete this stock?");
            if (confirmed) {
                await axios.delete(`http://localhost:3001/stock/${stockId}`);
                setStocks((prevStocks) => prevStocks.filter((stock) => stock.id !== stockId));
                console.log("Stock successfully deleted");
                navigate("/stocks");
            } else {
                console.log("Deletion canceled");
            }
        } catch (error) {
            console.error(error);
        }
    };


    const addCards = async (stockId) => {
        try {
            const startNumber = window.prompt('Enter the start number:');
            const endNumber = window.prompt('Enter the end number:');

            if (startNumber && endNumber) {
                const numberRange = [];
                for (let i = parseInt(startNumber); i <= parseInt(endNumber); i++) {
                    numberRange.push(i);
                }

                const response = await axios.post(`http://localhost:3001/stock/${stockId}/cards`, { number: numberRange });
                const { cards } = response.data;


                setStocks((prevStocks) =>
                    prevStocks.map((stock) => {
                        if (stock.id === stockId) {
                            return {
                                ...stock,
                                quantity: stock.quantity + cards.length
                            };
                        }
                        return stock;
                    })
                );
            }
        } catch (error) {
            console.error(error);
        }
    };



    return (
        <body className="g-sidenav-show  bg-gray-100">
        <Aside />
        <main className="main-content border-radius-lg ">
            <div className="row mt-1">
                <div className="col-12">
                    <div className="card my-4 " style={{ "margin-right": "20px", "margin-left": "20px" }}>
                        <div className="card-header p-0 position-relative mt-n4 mx-3 z-index-2" >
                            <div className="dark-version shadow-dark border-radius-lg pt-4 pb-3">
                                <h6 className="text-white text-capitalize ps-3">Stock list
                                    <Link className="text-white font-weight-bold text-decoration-none " style={{ "float": "right", "margin-right": "20px" }} to={`/stocks/add`}>
                                        <AiFillPlusCircle size={26} />
                                    </Link></h6>
                            </div>
                        </div>
                        <div className="card-body px-0 pb-2">
                            <div className="table-responsive p-0">
                                <table className="table align-items-center mb-0">
                                    <thead>
                                    <tr>
                                        <th className="text-center text-uppercase text-secondary text-xs font-weight-bolder opacity-7">Shop</th>
                                        <th className="text-uppercase text-secondary text-xs font-weight-bolder opacity-7">SIM Type</th>
                                        <th className="text-uppercase text-secondary text-xs font-weight-bolder opacity-7 ps-2">Quantity</th>
                                        <th className="text-center text-uppercase text-secondary text-xs font-weight-bolder opacity-7">Status</th>
                                        <th className="text-center text-uppercase text-secondary text-xs font-weight-bolder opacity-7">Created At</th>
                                        <th className="text-center text-uppercase text-secondary text-xs font-weight-bolder opacity-7">Updated At</th>
                                        <th className="text-secondary opacity-7"></th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {stocks.map((stock) => (
                                        <tr key={stock.id}>
                                            <td>
                                                <div className="d-flex px-2 py-1">
                                                    <div>
                                                        <img src={LOGO_TT}
                                                             className="avatar avatar-sm me-3 border-radius-lg" alt="user1" />
                                                    </div>
                                                    <div className="d-flex flex-column justify-content-center">
                                                        <h6 className="mb-0 text-sm">
                                                            {shops.find(shop => shop.id === stock.shopId)?.name || 'Unknown Shop'}
                                                        </h6>
                                                        <p className="text-xs text-secondary mb-0">{shops.find(shop => shop.id === stock.shopId)?.address || 'Unknown Shop'}</p>
                                                    </div>
                                                </div>
                                            </td>
                                            <td>
                                                <p className="text-xs font-weight-bold mb-0">{stock.sim_type}</p>
                                            </td>
                                            <td>
                                                <p className="text-xs font-weight-bold mb-0">{stock.quantity}</p>
                                            </td>
                                            <td className="align-middle text-center text-sm">
                                                <span className="badge badge-sm border-black" style={{ backgroundColor: getBadgeColor(stock.status) }}>{stock.status}</span>
                                            </td>
                                            <td className="align-middle text-center">
                                                <span className="text-xs font-weight-bold mb-0">{new Date(stock.createdAt).toLocaleDateString('fr-FR')}</span>
                                            </td>
                                            <td className="align-middle text-center">
                                                <span className="text-xs font-weight-bold mb-0">{new Date(stock.updatedAt).toLocaleDateString('fr-FR')}</span>
                                            </td>
                                            <td className="align-middle">
                                                <Link className="text-secondary font-weight-bold text-black text-xs" to={`/stocks/${stock.id}/update`}><AiOutlineFileText size={24} /></Link>
                                                <Link className="text-secondary font-weight-bold text-black text-xs" onClick={() => deleteStock(stock.id)}><AiOutlineDelete size={24} /></Link>
                                                <Link className="text-secondary font-weight-bold text-black text-xs" onClick={() => addCards(stock.id)}><AiOutlineAppstoreAdd size={24} /></Link>
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
        </main>
        </body>
    );
}

export default StockList;
