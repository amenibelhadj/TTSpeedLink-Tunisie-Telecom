import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from 'react-router-dom';
import { AiFillPlusCircle, AiOutlineScan, AiOutlineFileText,AiOutlineCaretDown,AiOutlineCaretUp } from "react-icons/ai";
import Aside from "../template/Aside";
import LOGO_TT from "../LOGO_TT_.jpg";

function UserList() {
    const [users, setUsers] = useState([]);
    const [sortedUsers, setSortedUsers] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [sortOrders, setSortOrders] = useState({});
    const [currentPage, setCurrentPage] = useState(1);
    const [usersPerPage] = useState(20);

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        try {
            const response = await axios.get("http://localhost:3001/user");
            const sortedData = response.data;
            setUsers(sortedData);
            setSortedUsers(sortedData);
            initializeSortOrders(sortedData);
        } catch (error) {
            console.error(error);
        }
    };

    const initializeSortOrders = (data) => {
        const initialSortOrders = {};
        Object.keys(data[0]).forEach((key) => {
            initialSortOrders[key] = "asc";
        });
        setSortOrders(initialSortOrders);
    };

    const handleSort = (column) => {
        const updatedSortOrders = { ...sortOrders };
        updatedSortOrders[column] = sortOrders[column] === "asc" ? "desc" : "asc";
        setSortOrders(updatedSortOrders);

        const sortedData = [...sortedUsers].sort((a, b) => {
            let comparison = 0;
            if (a[column] > b[column]) {
                comparison = 1;
            } else if (a[column] < b[column]) {
                comparison = -1;
            }
            return sortOrders[column] === "asc" ? comparison : -comparison;
        });
        setSortedUsers(sortedData);
    };

    const handleSearch = (event) => {
        const query = event.target.value.toLowerCase();
        setSearchQuery(query);

        const filteredData = users.filter((user) =>
            Object.values(user).some((value) => {
                if (typeof value === "string") {
                    return value.toLowerCase().includes(query);
                }
                return false;
            })
        );

        setSortedUsers(filteredData);
    };

    function getBadgeColor(role) {
        switch (role) {
            case 'admin':
                return '#8b008b';
            case 'seller':
                return '#87ceeb';
            case 'client':
                return '#7fff00';
            default:
                return '#000000';
        }
    };

    const indexOfLastUser = currentPage * usersPerPage;
    const indexOfFirstUSer = indexOfLastUser - usersPerPage;
    const currentUsers = users.slice(indexOfFirstUSer, indexOfLastUser);

    const pageNumbers = Math.ceil(users.length / usersPerPage);

    const renderPageNumbers = () => {
        const maxPageButtons = 5;
        const ellipsis = '...';

        const getPageButtonIndices = () => {
            if (pageNumbers <= maxPageButtons) {
                return Array.from({length: pageNumbers}, (_, index) => index + 1);
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
        <body className="g-sidenav-show  bg-gray-100">
        <Aside />
        <main className="main-content border-radius-lg ">
            <div className="row mt-3">
                <div className="col-12">
                    <div className="card my-4 " style={{ "marginRight": "15px", "marginLeft": "15px" }}>
                        <div className="card-header p-0 position-relative mt-n4 mx-3 z-index-2">
                            <div className="dark-version shadow-dark border-radius-lg pt-4 pb-3">
                                <h6 className="text-white text-capitalize ps-3">Staff table
                                    <Link className="text-white font-weight-bold text-decoration-none " style={{ "float": "right", "marginRight": "15px" }} to={`/users/add`}>
                                        <AiFillPlusCircle size={26} />
                                    </Link>
                                    <Link className="text-white font-weight-bold text-decoration-none " style={{ "float": "right", "marginRight": "15px" }} to={`/users/scan`}>
                                        <AiOutlineScan size={26} />
                                    </Link>
                                    <input
                                        type="text"
                                        value={searchQuery}
                                        onChange={handleSearch}
                                        placeholder="Search for a user"
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
                                        <th className="text-uppercase text-secondary text-xs font-weight-bolder opacity-7">Name{" "}
                                            <AiOutlineCaretDown size={15} onClick={() => handleSort("name", "asc")} style={{ "float": "right",cursor: 'pointer' }} />
                                            <AiOutlineCaretUp size={15} onClick={() => handleSort("name", "desc")} style={{ "float": "right",cursor: 'pointer' }} />
                                        </th>
                                        <th className="text-uppercase text-secondary text-xs font-weight-bolder opacity-7 ps-2">CIN{" "}
                                            <AiOutlineCaretDown size={15} onClick={() => handleSort("cin", "asc")} style={{ "float": "right",cursor: 'pointer' }} />
                                            <AiOutlineCaretUp size={15} onClick={() => handleSort("cin", "desc")} style={{ "float": "right",cursor: 'pointer' }} />
                                        </th>
                                        <th className="text-uppercase text-secondary text-xs font-weight-bolder opacity-7 ps-2">Region{" "}
                                            <AiOutlineCaretDown size={15} onClick={() => handleSort("region", "asc")} style={{ "float": "right",cursor: 'pointer' }} />
                                            <AiOutlineCaretUp size={15} onClick={() => handleSort("region", "desc")} style={{ "float": "right",cursor: 'pointer' }}/>
                                        </th>
                                        <th className="text-center text-uppercase text-secondary text-xs font-weight-bolder opacity-7">Role{" "}
                                            <AiOutlineCaretDown size={15} onClick={() => handleSort("role", "asc")} style={{ "float": "right",cursor: 'pointer' }} />
                                            <AiOutlineCaretUp size={15} onClick={() => handleSort("role", "desc")} style={{ "float": "right",cursor: 'pointer' }} />
                                        </th>
                                        <th className="text-center text-uppercase text-secondary text-xs font-weight-bolder opacity-7">Created At{" "}
                                            <AiOutlineCaretDown size={15} onClick={() => handleSort("createdAt", "asc")} style={{ "float": "right",cursor: 'pointer' }} />
                                            <AiOutlineCaretUp size={15} onClick={() => handleSort("createdAt", "desc")} style={{ "float": "right",cursor: 'pointer' }} />
                                        </th>
                                        <th className="text-center text-uppercase text-secondary text-xs font-weight-bolder opacity-7">Updated At{" "}
                                            <AiOutlineCaretDown size={15} onClick={() => handleSort("updatedAt", "asc")} style={{ "float": "right",cursor: 'pointer' }} />
                                            <AiOutlineCaretUp size={15} onClick={() => handleSort("updatedAt", "desc")} style={{ "float": "right",cursor: 'pointer' }} />
                                        </th>
                                        <th className="text-secondary opacity-7"></th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {sortedUsers.map((user) => {
                                        if (user.role === "admin" || user.role === "seller") {
                                            return (
                                                <tr key={user.id}>
                                                    <td>
                                                        <div className="d-flex px-2 py-1">
                                                            <div>
                                                                <img src={LOGO_TT} className="avatar avatar-sm me-3 border-radius-lg" alt="user1" />
                                                            </div>
                                                            <div className="d-flex flex-column justify-content-center">
                                                                <h6 className="mb-0 text-sm">{user.name}</h6>
                                                                <p className="text-xs text-secondary mb-0">{user.email}</p>
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td>
                                                        <p className="text-xs font-weight-bold mb-0">{user.cin}</p>
                                                    </td>
                                                    <td>
                                                        <p className="text-xs font-weight-bold mb-0">{user.region}</p>
                                                    </td>
                                                    <td className="align-middle text-center text-sm">
                                                        <span className="badge badge-sm border-black" style={{ backgroundColor: getBadgeColor(user.role) }}>{user.role}</span>
                                                    </td>
                                                    <td className="align-middle text-center">
                                                        <span className="text-xs font-weight-bold mb-0">{new Date(user.createdAt).toLocaleDateString('fr-FR')}</span>
                                                    </td>
                                                    <td className="align-middle text-center">
                                                        <span className="text-xs font-weight-bold mb-0">{new Date(user.updatedAt).toLocaleDateString('fr-FR')}</span>
                                                    </td>
                                                    <td className="align-middle">
                                                        <Link className="text-secondary font-weight-bold text-black text-xs" to={`/users/${user.id}`}><AiOutlineFileText size={24} /></Link>
                                                    </td>
                                                </tr>
                                            );
                                        } else {
                                            return null;
                                        }
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
        </main>
        </body>
    );
}

export default UserList;
