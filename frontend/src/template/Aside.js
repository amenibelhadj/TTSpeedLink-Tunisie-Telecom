import React,{Component} from "react";
import { FcShop,FcAssistant,FcPortraitMode,FcFilingCabinet,FcComboChart,FcWorkflow,FcSimCard } from "react-icons/fc";
import { GiExitDoor } from "react-icons/gi";
import { Link } from 'react-router-dom';
import Cookies from "js-cookie";


export default class Aside extends Component{
    handleLogout = () => {
        // Remove the token cookie
        Cookies.remove("token");
        window.location.href = "/";

        console.log("Logout successful. Redirecting to Login page.");

    };
    render() {
        return(
            <aside className="sidenav navbar navbar-vertical navbar-expand-xs border-0 border-radius-xl my-3 fixed-start ms-3 bg-gradient-dark ps bg-white" id="sidenav-main">
                <div className="sidenav-header text-center">
                    <i className="fas fa-times p-3 cursor-pointer text-white opacity-5 position-absolute end-0 top-0 d-none d-xl-none" aria-hidden="true" id="iconSidenav"></i>
                    <Link className="navbar-brand" to="/home">
                        <h5 className="text-white font-weight-bolder">TT Speed Link</h5>
                    </Link>
                </div>
                <hr className="horizontal light mt-0 mb-2"/>
                    <div className="collapse navbar-collapse w-auto ps" id="sidenav-collapse-main">
                        <ul className="navbar-nav">
                            <li className="nav-item">
                                <a className="nav-link text-white active bg-gradient-primary d-flex align-items-center">
                                    <div className="me-2">
                                        <FcComboChart size={24} />
                                    </div>
                                    <div className="text-center">
                                        <Link
                                            className="text-white font-weight-bold text-decoration-none"
                                            to="/review"
                                        >
                                            Review
                                        </Link>
                                    </div>
                                </a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link text-white active bg-gradient-primary d-flex align-items-center">
                                    <div className="me-2">
                                        <FcAssistant size={24} />
                                    </div>
                                    <div className="text-center">
                                        <Link
                                            className="text-white font-weight-bold text-decoration-none"
                                            to="/users/staff"
                                        >
                                            Staff Management
                                        </Link>
                                    </div>
                                </a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link text-white active bg-gradient-primary d-flex align-items-center">
                                    <div className="me-2">
                                        <FcPortraitMode size={24} />
                                    </div>
                                    <div className="text-center">
                                        <Link
                                            className="text-white font-weight-bold text-decoration-none"
                                            to="/users/client"
                                        >
                                            Client Management
                                        </Link>
                                    </div>
                                </a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link text-white active bg-gradient-primary d-flex align-items-center">
                                    <div className="me-2">
                                        <FcShop size={24} />
                                    </div>
                                    <div className="text-center">
                                        <Link
                                            className="text-white font-weight-bold text-decoration-none"
                                            to="/shops"
                                        >
                                            Shop Management
                                        </Link>
                                    </div>
                                </a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link text-white active bg-gradient-primary d-flex align-items-center">
                                    <div className="me-2">
                                        <FcFilingCabinet size={24} />
                                    </div>
                                    <div className="text-center">
                                        <Link
                                            className="text-white font-weight-bold text-decoration-none"
                                            to="/stocks"
                                        >
                                            Stock Management
                                        </Link>
                                    </div>
                                </a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link text-white active bg-gradient-primary d-flex align-items-center">
                                    <div className="me-2">
                                        <FcSimCard size={24} />
                                    </div>
                                    <div className="text-center">
                                        <Link
                                            className="text-white font-weight-bold text-decoration-none"
                                            to="/cards"
                                        >
                                            Card Management
                                        </Link>
                                    </div>
                                </a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link text-white active bg-gradient-primary d-flex align-items-center">
                                    <div className="me-2">
                                        <FcWorkflow size={24} />
                                    </div>
                                    <div className="text-center">
                                        <Link
                                            className="text-white font-weight-bold text-decoration-none"
                                            to="/cards/client"
                                        >
                                            Get A SIM card
                                        </Link>
                                    </div>
                                </a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link text-white active bg-gradient-primary d-flex align-items-center">
                                    <div className="me-2">
                                        <GiExitDoor size={24} className="text-danger" />
                                    </div>
                                    <div className="text-center">
                                        <Link
                                            className="text-white font-weight-bold text-decoration-none"
                                            onClick={this.handleLogout}
                                        >
                                            Sign Out
                                        </Link>
                                    </div>
                                </a>
                            </li>
                        </ul>
                    </div>
            </aside>
        )
    }
}