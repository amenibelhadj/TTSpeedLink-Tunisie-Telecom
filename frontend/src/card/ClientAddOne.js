import React from "react";
import {Link} from 'react-router-dom';
import Aside from "../template/Aside";
import {
    TbHexagonNumber1,
    TbHexagonNumber2,
    TbHexagonNumber3,
    TbUserPlus,
    TbUserSearch,
    TbHexagonNumber4,
    TbSquareRoundedNumber1, TbSquareRoundedNumber2, TbSquareRoundedNumber3, TbSquareRoundedNumber4
} from "react-icons/tb";
import {FcNews,FcManager} from "react-icons/fc";


function ClientAddOne() {

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
                    <h6 className="text-black text-capitalize ps-3">First Step: Integrate Client</h6>
                </div>
            </div>
            <div className="card-body mt-5" style={{ display: "flex", justifyContent: "space-around", margin: "150px 150px" }}>
                <Link to="/users/scan" className="text-black font-weight-bold text-decoration-none">
                    <div className="card ">
                        <div className="card-header mx-5 p-4 text-center">
                            <div className="icon icon-shape icon-lg shadow text-center border-radius-lg">
                                <FcNews size={54} className="text-center mt-1" />
                            </div>
                        </div>
                        <div className="card-body pt-0 p-3 text-center">
                            <h6 className="text-center mb-0 mt-4">Scan the ID card</h6>
                        </div>
                    </div>
                </Link>
                <Link to="/cards/step-one" className="text-black font-weight-bold text-decoration-none">
                    <div className="card">
                        <div className="card-header mx-5 p-4 text-center">
                            <div className="icon icon-shape icon-lg shadow text-center border-radius-lg">
                                <FcManager size={54} className="text-white text-center mt-1" />
                            </div>
                        </div>
                        <div className="card-body pt-0 p-3 text-center">
                            <h6 className="text-center mb-0 mt-4">Enter the User</h6>
                        </div>
                    </div>
                </Link>
            </div>
        </main>
        </body>
    );
}

export default ClientAddOne;
