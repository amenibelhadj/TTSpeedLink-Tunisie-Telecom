import React, { useEffect, useState } from "react";
import axios from "axios";
import Aside from "../template/Aside";
import {Link, useLocation} from "react-router-dom";
import {TbSquareRoundedNumber1, TbSquareRoundedNumber2, TbSquareRoundedNumber3, TbSquareRoundedNumber4} from "react-icons/tb";
import {GiCardRandom} from "react-icons/gi";


const PickNumber = () => {
    const [shops, setShops] = useState([]);
    const [stocks, setStocks] = useState([]);
    const [cards, setCards] = useState([]);
    const filteredCards = cards.filter(card => card.status === 'none');
    const [selectedCard, setSelectedCard] = useState(null);
    const [card,setCard]=useState({orderId:''});
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const orderId = searchParams.get('orderId');
    const [randomNumber, setRandomNumber] = useState(null);


    useEffect(() => {
        if (orderId) {
            setCard((prevCard) => ({ ...prevCard, orderId: orderId }));
        }
    }, [orderId]);

    const handleChange = (event) => {
        const { name, value } = event.target;
        setCard((prevCard) => ({ ...prevCard, [name]: value }));
    };

    useEffect(() => {
        // Récupérer les shops
        axios.get('http://localhost:3001/shop')
            .then(response => setShops(response.data))
            .catch(error => console.error(error));
    }, []);

    const handleShopChange = (event) => {
        const shopId = event.target.value;

        // Récupérer les stocks pour le shop sélectionné
        axios.get(`http://localhost:3001/stock/shop/${shopId}`)
            .then(response => setStocks(response.data))
            .catch(error => console.error(error));
    };

    const handleStockChange = (event) => {
        const stockId = event.target.value;

        // Récupérer les cartes pour le stock sélectionné
        axios.get(`http://localhost:3001/card/stock/${stockId}`)
            .then(response => setCards(response.data))
            .catch(error => console.error(error));
    };

    const handleCardChange = (event) => {
        const cardId = event.target.value;
        setSelectedCard(cardId); // Mettre à jour la carte sélectionnée
    };

    const handleRandomSelection = () => {
        const randomIndex = Math.floor(Math.random() * filteredCards.length);
        const randomCard = filteredCards[randomIndex];
        setSelectedCard(randomCard.id); // Mettre à jour la carte sélectionnée aléatoirement
        setRandomNumber(randomCard.number); // Stocker le numéro choisi aléatoirement
    };


    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            let cardId;


            if (selectedCard) {
                cardId = selectedCard;
            } else {
                // Randomly select a card when no card is explicitly selected
                handleRandomSelection();
                return; // Wait for the random selection to finish and then submit the form
            }
            console.log(cardId);
            console.log(orderId);
            await axios.put(`http://localhost:3001/card/order/${cardId}`, { orderId: orderId });

            let amount = selectedCard ? 1 : 0;
            if (selectedCard && selectedCard.startsWith("98")) {
                amount = 2;
            }

            const invoice = {
                amount: amount,
                date: new Date().toISOString(),
                link: `invoice.pdf`,
                orderId: orderId,
            };

            await axios.post("http://localhost:3001/invoice", invoice);
            console.log("Order successfully assigned!");
            //a enlever si on veux ajouter plusieurs num a la fois
            window.location.href = `/invoice`;
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
                        <div className="card shadow-dark dark-version">
                            <Link
                                className=" text-black font-weight-bold text-decoration-none"
                                to="/cards/step-three"
                            >
                                <div className="card-header mx-4 p-3 text-center">
                                    <div className="icon icon-shape icon-lg shadow-blur text-center border-radius-lg">
                                        <TbSquareRoundedNumber3 size={55} className="text-white text-center mt-1" />
                                    </div>
                                </div>
                                <div className="card-body pt-0 p-3 text-center">
                                    <h6 className="text-center text-wblack mb-0 mt-4">Pick A Number</h6>
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
                    <h6 className="text-black text-capitalize ps-3">Third Step: Pick A Number</h6>
                </div>
            </div>
            <div className="card-body mt-4" style={{ margin: "0 150px" }}>
                <div className="form-group">
                    <label htmlFor="shop-select">Shop:</label>
                    <select id="shop-select" className="form-control" onChange={handleShopChange}>
                        <option value="">Select a shop</option>
                        {shops.map(shop => (
                            <option key={shop.id} value={shop.id}>{shop.name}</option>
                        ))}
                    </select>
                </div>
                {stocks.length > 0 && (
                    <div className="form-group">
                        <label htmlFor="stock-select">Stock:</label>
                        <select id="stock-select" className="form-control" onChange={handleStockChange}>
                            <option value="">Select a stock</option>
                            {stocks.map(stock => (
                                <option key={stock.id} value={stock.id}>{stock.sim_type}</option>
                            ))}
                        </select>
                    </div>
                )}

                {cards.length > 0 && (
                    <form role="form" onSubmit={handleSubmit}>
                        <div className="d-flex">
                            <div className="form-group mr-3">
                                <label htmlFor="card-select">Cards:</label>
                                <select id="card-select" className="form-control" onChange={handleCardChange}>
                                    <option value="">Select a number</option>
                                    {filteredCards.map(card => (
                                        <option key={card.id} value={card.id}>{card.number}</option>
                                    ))}
                                </select>
                            </div>
                            <div style={{marginLeft:"500px"}} className="align-top">
                            <button type="button" className="btn btn-dark shadow-dark mt-4" onClick={handleRandomSelection}>
                                <GiCardRandom size={30} className="text-white text-center mt-1" />
                            </button>
                            {randomNumber && (
                                <div className="mt-0">
                                    <span className="random-number">Random Number: {randomNumber}</span>
                                </div>
                            )}
                            </div>
                        </div>



                        <input
                            type="hidden"
                            name="userId"
                            value={card.orderId}
                        />
                        <button type="submit" className="btn btn-dark-blue" onClick={handleSubmit}>
                            Submit
                        </button>
                    </form>
                )}
            </div>
        </main>
        </body>
    );
}

export default PickNumber;
