import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {useParams, useNavigate, Link} from 'react-router-dom';
import { AiOutlineEdit } from "react-icons/ai";
import { AiOutlineDelete } from "react-icons/ai";
import LOGO_TT from "../LOGO_TT_.jpg";
import Aside from "../template/Aside";


function UserDetails() {
    const [user, setUser] = useState(null);
    const [shop, setShop] = useState(null);
    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        fetchUser();
    }, []);

    const fetchUser = async () => {
        try {
            const responseUser = await axios.get(`http://localhost:3001/user/${id}`);
            setUser(responseUser.data);

            if (responseUser.data.shopId) {
                const responseShop = await axios.get(`http://localhost:3001/shop/${responseUser.data.shopId}`);
                setShop(responseShop.data);
            }
        } catch (error) {
            console.error(error);
        }
    };

    const handleDelete = async () => {
        try {
            const confirmed = window.confirm("Are you sure you want to delete this user?");
            if (confirmed) {
                await axios.delete(`http://localhost:3001/user/${id}`);
                console.log('User successfully deleted.');
                navigate('/users');
            } else {
                console.log('Deletion canceled.');
            }
        } catch (error) {
            console.error(error);
        }
    };


    return (
        <body className="g-sidenav-show  bg-gray-100">
        <Aside/>
        <main className="main-content border-radius-lg ">
            <div className="container-fluid px-2 px-md-4">
                <div className="page-header min-height-300 border-radius-xl mt-3" style={{backgroundImage: "url('https://ft.univ-tlemcen.dz/assets/uploads/_Images/D%C3%A9partements/The_Evolution_of_Kuwaits_Telecom_Industry-article.jpg')"}}>
                    <span className="mask bg-gradient-primary opacity-6"></span>
                </div>
                <div className="card card-body mx-3 mx-md-4 mt-n7 ">
                    <div className="row gx-4 mb-2">
                        <div className="col-auto">
                            <div className="avatar avatar-xl position-relative">
                                <img src={LOGO_TT} alt="profile_image" className="w-100 border-radius-lg shadow-sm" />
                            </div>
                        </div>
                        <div className="col-auto my-auto">
                            <div className="h-100">
                                <h5 className="mb-1 text-uppercase">{user.name}</h5>
                                <p className="mb-0 font-weight-normal text-sm text-uppercase">{user.role}</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row justify-content-center text-center">
                    <div className="col-10 col-xl-10 mt-3">
                        <div className="card card-plain h-100">
                            <div className="card-body p-4">
                                <Link className="text-black font-weight-bold text-decoration-none"  style={{"float": "right", "margin-right":"20px"}} onClick={handleDelete}>
                                    <AiOutlineDelete size={26} style={{ color: "#e91e63" }} />
                                </Link>
                                <Link className="text-black font-weight-bold text-decoration-none"  style={{"float": "right", "margin-right":"10px"}} to={`/users/${user.id}/update`}>
                                    <AiOutlineEdit size={26}/>
                                </Link>
                                <br/><br/>
                                <li className="list-group-item border-0 ps-0 text-sm">
                                    <strong className="text-dark">CIN:</strong> &nbsp; {user.cin}
                                </li>
                                <li className="list-group-item border-0 ps-0 text-sm">
                                    <strong className="text-dark">Email:</strong> &nbsp; {user.email}
                                </li>
                                <li className="list-group-item border-0 ps-0 text-sm">
                                    <strong className="text-dark">Location:</strong> &nbsp; {user.address}, {user.region}
                                </li>
                                <li className="list-group-item border-0 ps-0 text-sm">
                                    <strong className="text-dark">Created At:</strong> &nbsp; {user.createdAt}
                                </li>
                                <li className="list-group-item border-0 ps-0 text-sm">
                                    <strong className="text-dark">Updated At:</strong> &nbsp; {user.updatedAt}
                                </li>
                                {user.role === 'seller' && shop && (
                                    <li className="list-group-item border-0 ps-0 text-sm">
                                        <strong className="text-dark">Shop:</strong> &nbsp; {shop.name}
                                    </li>
                                )}
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </main>
        </body>




    );
}

export default UserDetails;
