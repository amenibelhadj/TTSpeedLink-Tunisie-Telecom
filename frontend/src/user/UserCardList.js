import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Aside from "../template/Aside";
import { AiOutlineCaretDown, AiOutlineCaretUp} from "react-icons/ai";
import LOGO_TT from "../LOGO_TT_.jpg";
import Footer from "../template/Footer";

const UserCardList = () => {
    const [users, setUsers] = useState([]);
    const [sortedUsers, setSortedUsers] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [sortOrders, setSortOrders] = useState({});
    const [currentPage, setCurrentPage] = useState(1);
    const [usersPerPage] = useState(10);


    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:3001/user/users/cards');
                console.log(response.data);
                setUsers(response.data);
                setSortedUsers(response.data);
            } catch (error) {
                console.error(error);
            }
        };

        fetchData();
    }, []);

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

    const indexOfLastUser = currentPage * usersPerPage;
    const indexOfFirstUSer = indexOfLastUser - usersPerPage;
    const currentUsers = users.slice(indexOfFirstUSer, indexOfLastUser);

    const pageNumbers = Math.ceil(users.length / usersPerPage);

    // Function to render page numbers and handle pagination
    const renderPageNumbers = () => {
        const maxPageButtons = 5;
        const ellipsis = '...';

        // Function to determine the indices of the page buttons to be displayed
        const getPageButtonIndices = () => {
            // If the total number of page numbers is less than or equal to the maximum number of page buttons
            if (pageNumbers <= maxPageButtons) {
                // Return an array of page numbers from 1 to pageNumbers
                return Array.from({ length: pageNumbers }, (_, index) => index + 1);
            }

            const pageButtonIndices = [];

            // If the current page is near the beginning
            if (currentPage <= 2) {
                pageButtonIndices.push(1, 2, 3, 4, ellipsis, pageNumbers);
            }
            // If the current page is near the end
            else if (currentPage >= pageNumbers - 1) {
                pageButtonIndices.push(1, ellipsis, pageNumbers - 3, pageNumbers - 2, pageNumbers - 1, pageNumbers);
            }
            // If the current page is in the middle
            else {
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
                                <h6 className="text-white text-capitalize ps-3">Client table
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
                                        <th className="text-uppercase text-secondary text-xs font-weight-bolder opacity-7">
                                            Name{" "}
                                            <AiOutlineCaretDown
                                                size={15}
                                                onClick={() => handleSort("name", "asc")}
                                                style={{ float: "right", cursor: "pointer" }}
                                            />
                                            <AiOutlineCaretUp
                                                size={15}
                                                onClick={() => handleSort("name", "desc")}
                                                style={{ float: "right", cursor: "pointer" }}
                                            />
                                        </th>
                                        <th className="text-uppercase text-secondary text-xs font-weight-bolder opacity-7 ps-2">
                                            CIN{" "}
                                            <AiOutlineCaretDown
                                                size={15}
                                                onClick={() => handleSort("cin", "asc")}
                                                style={{ float: "right", cursor: "pointer" }}
                                            />
                                            <AiOutlineCaretUp
                                                size={15}
                                                onClick={() => handleSort("cin", "desc")}
                                                style={{ float: "right", cursor: "pointer" }}
                                            />
                                        </th>
                                        <th className="text-uppercase text-secondary text-xs font-weight-bolder opacity-7 ps-2">
                                            Region{" "}
                                            <AiOutlineCaretDown
                                                size={15}
                                                onClick={() => handleSort("region", "asc")}
                                                style={{ float: "right", cursor: "pointer" }}
                                            />
                                            <AiOutlineCaretUp
                                                size={15}
                                                onClick={() => handleSort("region", "desc")}
                                                style={{ float: "right", cursor: "pointer" }}
                                            />
                                        </th>
                                        <th></th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {sortedUsers.map((user) => (
                                        <tr key={user.userId}>
                                            <td>
                                                <div className="d-flex px-2 py-1">
                                                    <div>
                                                        <img
                                                            src={LOGO_TT}
                                                            className="avatar avatar-sm me-3 border-radius-lg"
                                                            alt="user1"
                                                        />
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
                                            <td>
                                                {user.cards &&
                                                    user.cards.map((card) => (
                                                        <div key={card.id} style={{ marginRight: "20px" }}>
                                                            <p className="text-xsfont-weight-bold mb-1">Number: {card.number}</p>
                                                            <p className="text-xs font-weight-bold mb-1">PIN Code: {card.pinCode}</p>
                                                            <p className="text-xs font-weight-bold mb-1">Status: {card.status}</p>
                                                            <p className="text-xs font-weight-bold mb-1">Activation Date: {card.activationDate}</p>
                                                        </div>
                                                    ))}
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
            <div className="page-numbers-container" style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                {renderPageNumbers()}
            </div>
            <Footer />
        </main>
        </body>
    );
};

export default UserCardList;
