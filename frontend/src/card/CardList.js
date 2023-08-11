import React, { useEffect, useState } from "react";
import axios from "axios";
import LOGO_TT from "../LOGO_TT_.jpg";
import {Link, useNavigate} from 'react-router-dom';
import {AiOutlineDelete} from "react-icons/ai";
import Aside from "../template/Aside";
import Footer from "../template/Footer";

function CardList() {
    const [cards, setCards] = useState([]);
    const [stocks, setStocks] = useState([]);
    const [shops, setShops] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [cardsPerPage] = useState(10);
    const [searchValue, setSearchValue] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        fetchCards();
        fetchStocks();
    }, []);

    const fetchCards = async () => {
        try {
            const response = await axios.get("http://localhost:3001/card");
            setCards(response.data);
        } catch (error) {
            console.error(error);
        }
    };

    const fetchStocks = async () => {
        try {
            const response = await axios.get("http://localhost:3001/stock");
            setStocks(response.data);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        fetchShops();
    }, [stocks]);

    const fetchShops = async () => {
        try {
            const response = await axios.get("http://localhost:3001/shop");
            setShops(response.data);
        } catch (error) {
            console.error(error);
        }
    };

    const deleteCard = async (cardId) => {
        try {
            const confirmed = window.confirm("Are you sure you want to delete this card?");
            if (confirmed) {
                if (searchValue !== "" && !cards.find((card) => card.id === cardId)) {
                    console.log("Card not found in search results, skipping deletion.");
                    return;
                }
                await axios.delete(`http://localhost:3001/card/${cardId}`);
                setCards((prevCards) => prevCards.filter((card) => card.id !== cardId));
                console.log("Card successfully deleted");
                navigate("/cards");
            } else {
                console.log("Deletion canceled");
            }
        } catch (error) {
            console.error(error);
        }
    };

    const filterCards = (cards, searchValue) => {
        if (searchValue === "") {
            return cards;
        }
        const searchQuery = searchValue.toLowerCase();
        return cards.filter((card) => {
            const number = card.number ? card.number.toLowerCase() : "";
            const pinCode = card.pinCode ? card.pinCode.toLowerCase() : "";
            const activationDate = card.activationDate ? card.activationDate.toLowerCase() : "";
            const forfait = card.forfait ? card.forfait.toLowerCase() : "";

            return (
                number.includes(searchQuery) ||
                pinCode.includes(searchQuery) ||
                activationDate.includes(searchQuery) ||
                forfait.includes(searchQuery)
            );
        });
    };


    const indexOfLastCard = currentPage * cardsPerPage;
    const indexOfFirstCard = indexOfLastCard - cardsPerPage;
    const filteredCards = filterCards(cards, searchValue);
    const currentCards = filteredCards.slice(indexOfFirstCard, indexOfLastCard);

    const pageNumbers = Math.ceil(filteredCards.length / cardsPerPage);

    const renderPageNumbers = () => {
        const maxPageButtons = 5;
        const ellipsis = '...';

        const getPageButtonIndices = () => {
            if (pageNumbers <= maxPageButtons) {
                return Array.from({ length: pageNumbers }, (_, index) => index + 1);
            }

            const pageButtonIndices = [];

            if (currentPage <= 2) {
                pageButtonIndices.push(1, 2, 3, 4, ellipsis, pageNumbers);
            } else if (currentPage >= pageNumbers - 1) {
                pageButtonIndices.push(1, ellipsis, pageNumbers - 3, pageNumbers - 2, pageNumbers - 1, pageNumbers);
            } else {
                pageButtonIndices.push(1, ellipsis, currentPage - 1, currentPage, currentPage + 1, ellipsis, pageNumbers);
            }

            return pageButtonIndices;
        };


        return (
            <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginTop: '10px' }}>
                {getPageButtonIndices().map((pageIndex, index) => (
                    <button
                        key={index}
                        style={{
                            margin: '0 5px',
                            padding: '5px 10px',
                            border: 'none',
                            backgroundColor: 'transparent',
                            color: '#000',
                            cursor: 'pointer',
                            fontWeight: currentPage === pageIndex ? 'bold' : 'normal'
                        }}
                        onClick={() => setCurrentPage(pageIndex)}
                    >
                        {pageIndex}
                    </button>
                ))}
            </div>
        );
    };

    return (
        <body className="g-sidenav-show bg-gray-100">
        <Aside />
        <main className="main-content border-radius-lg ">
            <div className="row mt-2">
                <div className="col-12">
                    <div className="card my-4 " style={{ "marginRight": "20px", "marginLeft": "20px" }}>
                        <div className="card-header p-0 position-relative mt-n4 mx-3 z-index-2" >
                            <div className="dark-version shadow-dark border-radius-lg pt-4 pb-3">
                                <h6 className="text-white text-capitalize ps-3">Cards table
                                    <input
                                        type="text"
                                        value={searchValue}
                                        onChange={(e) => setSearchValue(e.target.value)}
                                        placeholder="Search for a card"
                                        style={{ "float": "right", "marginRight": "15px" ,"border": "1px solid #ccc", "border-radius": "4px", "padding": "5px", "font-size": "14px"}}
                                    />
                                </h6>
                            </div>
                        </div>
                        <div className="card-body px-0 pb-2">
                            <div className="table-responsive p-0">
                                <table className="table align-items-center mb-0">
                                    <thead>
                                    <tr>
                                        <th className="text-uppercase text-secondary text-xs font-weight-bolder opacity-7">Number</th>
                                        <th className="text-uppercase text-secondary text-xs font-weight-bolder opacity-7 ps-2">PIN Code</th>
                                        <th className="text-uppercase text-secondary text-xs font-weight-bolder opacity-7 ps-2">Status</th>
                                        <th className="text-uppercase text-secondary text-xs font-weight-bolder opacity-7 ps-2">Activation Date</th>
                                        <th className="text-secondary opacity-7"></th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {currentCards.map((card) => {
                                        const stock = card.stockId ? stocks.find(stock => stock.id === card.stockId) : null;
                                        const shop = stock ? shops.find(shop => shop.id === stock.shopId) : null;

                                        return (
                                            <tr key={card.id}>
                                                <td>
                                                    <div className="d-flex px-2 py-1">
                                                        <div>
                                                            <img src={LOGO_TT} className="avatar avatar-sm me-3 border-radius-lg" alt="card" />
                                                        </div>
                                                        <div className="d-flex flex-column justify-content-center">
                                                            <h6 className="mb-0 text-sm">{card.number}</h6>
                                                            {shop && <p className="text-xs text-secondary mb-0">{shop.name}</p>}
                                                        </div>
                                                    </div>
                                                </td>
                                                <td>
                                                    <p className="text-xs font-weight-bold mb-0">{card.pinCode}</p>
                                                </td>
                                                <td>
                                                    <p className="text-xs font-weight-bold mb-0">{card.status}</p>
                                                </td>
                                                <td>
                                                    <p className="text-xs font-weight-bold mb-0">{card.activationDate}</p>
                                                </td>
                                                <td className="align-middle">
                                                    <Link className="text-secondary font-weight-bold text-black text-xs" onClick={() => deleteCard(card.id)}><AiOutlineDelete size={24} /></Link>
                                                </td>
                                            </tr>
                                        );
                                    })}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="page-numbers-container" style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                {renderPageNumbers()}
            </div>
            <Footer />
        </main>
        </body>
    );
}

export default CardList;
