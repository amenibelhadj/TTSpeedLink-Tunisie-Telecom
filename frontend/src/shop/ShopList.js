import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { AiFillPlusCircle, AiOutlineDelete, AiOutlineEdit, AiOutlineAlert, AiOutlineUsergroupAdd } from "react-icons/ai";
import Aside from "../template/Aside";
import Footer from "../template/Footer";
import ReactModal from "react-modal";

function ShopList() {
    const [shops, setShops] = useState([]);
    const [sellers, setSellers] = useState({});
    const [selectedShopId, setSelectedShopId] = useState(null);
    const [modalStates, setModalStates] = useState({});
    const navigate = useNavigate();

    useEffect(() => {
        fetchShops();
    }, []);

    const fetchShops = async () => {
        try {
            const response = await axios.get("http://localhost:3001/shop");
            setShops(response.data);
        } catch (error) {
            console.error(error);
        }
    };

    const fetchSellers = async (shopId) => {
        try {
            const response = await axios.get(`http://localhost:3001/user?shopId=${shopId}&_expand=shop`);
            setSellers((prevSellers) => ({
                ...prevSellers,
                [shopId]: response.data,
            }));
        } catch (error) {
            console.error(error);
        }
    };

    const handleShowSellers = async (shopId) => {
        await fetchSellers(shopId);
        setSelectedShopId(shopId);
        setModalStates((prevModalStates) => ({
            ...prevModalStates,
            [shopId]: true,
        }));
    };

    const deleteShop = async (shopId) => {
        try {
            const confirmed = window.confirm("Are you sure you want to delete this shop?");
            if (confirmed) {
                await axios.delete(`http://localhost:3001/shop/${shopId}`);
                setShops((prevShops) => prevShops.filter((shop) => shop.id !== shopId));
                console.log("Shop successfully deleted");
                navigate("/shops");
            } else {
                console.log("Deletion canceled");
            }
        } catch (error) {
            console.error(error);
        }
    };

    const openModal = async (shopId) => {
        console.log("Shop ID:", shopId);
        await fetchSellers(shopId);
        setSelectedShopId(shopId);
        setModalStates((prevModalStates) => ({
            ...prevModalStates,
            [shopId]: true,
        }));
    };

    const closeModal = (shopId) => {
        setModalStates((prevModalStates) => ({
            ...prevModalStates,
            [shopId]: false,
        }));
    };

    function getBadgeColor(status) {
        switch (status) {
            case "open":
                return "#00FF00"; // Couleur pour le rôle admin
            case "closed":
                return "#FF0000"; // Couleur pour le rôle vendeur
            case "renovation":
                return "#fb8c00"; // Couleur pour le rôle client
            default:
                return "#000000"; // Couleur par défaut si le rôle n'est pas reconnu
        }
    }

    return (
        <body className="g-sidenav-show  bg-gray-100">
        <Aside />
        <main className="main-content border-radius-lg ">
            <div className="row mt-3">
                <div className="col-12">
                    <div className="card my-4" style={{ "margin-right": "20px", "margin-left": "20px" }}>
                        <div className="card">
                            <div className="card-header p-0 position-relative mt-n4 mx-3 z-index-2">
                                <div className="dark-version shadow-dark border-radius-lg pt-4 pb-3">
                                    <h6 className="text-white text-capitalize ps-3">
                                        Our Shops
                                        <Link className="text-white font-weight-bold text-decoration-none " style={{ float: "right", "margin-right": "20px" }} to={`/shops/add`}>
                                            <AiFillPlusCircle size={26} />
                                        </Link>
                                    </h6>
                                </div>
                            </div>
                            <div className="card-body pt-4 p-3">
                                {shops.map((shop) => (
                                    <ul className="list-group" key={shop.id}>
                                        <li className="list-group-item border-0 d-flex p-4 mb-2 bg-gray-100 border-radius-lg">
                                            <div className="d-flex flex-column">
                                                <h6 className="mb-3 text-sm">{shop.name}</h6>
                                                <span className="mb-2 text-xs">
                            Shop Address: <span className="text-dark font-weight-bold ms-sm-2">{shop.address}</span>
                          </span>
                                                <span className="mb-2 text-xs">
                            Phone Number: <span className="text-dark ms-sm-2 font-weight-bold">{shop.phone_number}</span>
                          </span>
                                                <span className="text-xs">
                            Shop Status: <span className="text-dark ms-sm-2 font-weight-bold text-uppercase">{shop.status}</span>
                          </span>
                                            </div>

                                            <div className="ms-auto text-end">
                                                <Link className=" font-weight-bold text-decoration-none " style={{ float: "right", "margin-right": "20px" }}>
                                                    <AiOutlineAlert size={29} style={{ color: getBadgeColor(shop.status) }} />
                                                </Link>
                                                <Link
                                                    className="text-black-50 font-weight-bold text-decoration-none "
                                                    style={{ float: "right", "margin-right": "20px" }}
                                                    onClick={() => deleteShop(shop.id)}
                                                >
                                                    <AiOutlineDelete size={26} />
                                                </Link>
                                                <Link className="text-black-50 font-weight-bold text-decoration-none " style={{ float: "right", "margin-right": "20px" }} to={`/shops/${shop.id}/update`}>
                                                    <AiOutlineEdit size={26} />
                                                </Link>
                                                <Link
                                                    className="text-black-50 font-weight-bold text-decoration-none "
                                                    style={{ float: "right", "margin-right": "20px" }}
                                                    onClick={() => openModal(shop.id)}
                                                >
                                                    <AiOutlineUsergroupAdd size={26} />
                                                </Link>
                                            </div>
                                            <ReactModal
                                                isOpen={modalStates[shop.id]}
                                                onRequestClose={() => closeModal(shop.id)}
                                                className="custom-modal"
                                                style={{
                                                    overlay: {
                                                        display: "flex",
                                                        justifyContent: "center",
                                                        alignItems: "center",
                                                        backgroundColor: "rgba(0, 0, 0, 0.5)",
                                                    },
                                                    content: {
                                                        width: "400px",
                                                        backgroundColor: "white",
                                                        borderRadius: "8px",
                                                        boxShadow: "0 0 10px rgba(0, 0, 0, 0.3)",
                                                        outline: "none",
                                                        padding: "20px",
                                                    },
                                                }}
                                            >
                                                <h4>Sellers in {shop.name}</h4>
                                                <ul>
                                                    {sellers[shop.id]?.map((seller) => (
                                                        <li key={seller.id}>{seller.name}</li>
                                                    ))}
                                                </ul>
                                            </ReactModal>
                                        </li>
                                    </ul>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </main>
        </body>
    );
}

export default ShopList;
