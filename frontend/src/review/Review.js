import React, { useEffect, useState } from "react";
import Aside from "../template/Aside";
import axios from 'axios';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import {FcSimCardChip,FcSalesPerformance,FcTodoList,FcFactoryBreakdown} from "react-icons/fc";

const Review= ()=> {
    const [salesDay, setSalesDay] = useState(0);
    const [salesMonth, setSalesMonth] = useState(0);
    const [salesYear, setSalesYear] = useState(0);
    const [salesWeek, setSalesWeek] = useState(0);
    const [top3Regions, setTop3Regions] = useState([]);
    const [sumByDay, setSumByDay] = useState([]);
    const [sumByMonth, setSumByMonth] = useState([]);
    const [sumByWeek, setsumByWeek] = useState([]);
    const [sumByYear, setSumByYear] = useState([]);
    const [totalAllTime, setTotalAllTime] = useState('');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const tunisPosition = [36.8188, 10.1665];
    const arianaPosition = [36.8663, 10.1933];
    const bejaPosition = [36.7221, 9.1869];
    const bizertePosition = [37.2728, 9.8717];
    const sfaxPosition = [34.7395, 10.7602];
    const soussePosition = [35.8262, 10.6383];
    const gabesPosition = [33.8819, 10.0982];
    const nabeulPosition = [36.4565, 10.7312];
    const medeninePosition = [33.3531, 10.4934];
    const monastirPosition = [35.7832, 10.8303];
    const kairouanPosition = [35.6806, 10.1016];
    const jendoubaPosition = [36.5018, 8.7800];
    const tozeurPosition = [33.9179, 8.1275];
    const kebiliPosition = [33.7035, 8.9731];
    const zaghouanPosition = [36.4008, 10.1443];
    const mahdiaPosition = [35.5037, 10.9306];
    const silianaPosition = [36.0834, 9.3658];
    const tataouinePosition = [32.9292, 10.4518];





    const customMarkerIcon = L.icon({
        iconUrl: `/TT1.png`,
        iconSize: [45, 35],
        iconAnchor: [12.5, 41],
        popupAnchor: [0, -41],
    });

    const getBoxColor = (index) => {
        const colors = ["#fff", "#fff", "#fff"]; // Add more colors if needed
        return colors[index % colors.length];
    };

    const getRankColor = (index) => {
        const colors = ["#FF4500", "#FF8C00", "#FFA500"]; // Add more colors if needed
        return colors[index % colors.length];
    };

    useEffect(() => {
        fetch('http://localhost:3001/sale/day')
            .then(response => response.json())
            .then(data => setSalesDay(data.count))
            .catch(error => console.error(error));

        fetch('http://localhost:3001/sale/week')
            .then(response => response.json())
            .then(data => setSalesWeek(data.count))
            .catch(error => console.error(error));

        fetch('http://localhost:3001/sale/month')
            .then(response => response.json())
            .then(data => setSalesMonth(data.count))
            .catch(error => console.error(error));

        fetch('http://localhost:3001/sale/year')
            .then(response => response.json())
            .then(data => setSalesYear(data.count))
            .catch(error => console.error(error));
    }, []);

    useEffect(() => {
        // Fonction pour récupérer le top 3 des régions les plus répétées depuis l'API
        const fetchTop3Regions = async () => {
            try {
                const response = await axios.get('http://localhost:3001/sale/region/mostRepeated');
                setTop3Regions(response.data);
                setLoading(false);
            } catch (error) {
                setError('Erreur lors de la récupération des données');
                setLoading(false);
            }
        };

        fetchTop3Regions();
    }, []);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('http://localhost:3001/invoice/invoices/sum');
                const data = await response.json();
                setSumByDay(data.sumByDay);
                setsumByWeek(data.sumByWeek);
                setSumByMonth(data.sumByMonth);
                setSumByYear(data.sumByYear);
                setTotalAllTime(data.totalAllTime);
            } catch (error) {
                console.error('Error:', error);
            }
        };

        fetchData();
    }, []);

    function formatDate(dateString) {
        const options = { month: "long", day: "numeric", year: "numeric" };
        return new Date(dateString).toLocaleDateString("en-US", options);
    }



    return (
        <div className="dashboard-container">
            <Aside />
            <main className="main-content">
                <div className="container py-4">
                    <div className="row">
                        <div className="col-lg-4 col-md-6 mb-4">
                            <div className="card">
                                <div className="card-header p-3 pt-1 bg-dark  text-white">
                                    <div className="icon icon-lg icon-shape">
                                        <FcSimCardChip size={35} />
                                    </div>
                                    <div className="text-end pt-1">
                                        <p className="mb-0 text-capitalize font-weight-bolder">SIM Card Sales Data</p>
                                    </div>
                                </div>
                                <div className="card-body">
                                    <div style={{ display: "grid", gridTemplateColumns: "repeat(3, minmax(0, 1fr))", gap: "1rem" }}>
                                        <div>
                                            <p className="mb-0">
                                                <span className="text-black text-sm font-weight-bolder">Present-Day:</span>
                                            </p>
                                            <p className="mb-0">
                                                <div className="circle present-day-sales">{salesDay}</div>
                                            </p>
                                        </div>
                                        <div>
                                            <p className="mb-0">
                                                <span className="text-black text-sm font-weight-bolder">Current Week:</span>
                                            </p>
                                            <p className="mb-0">
                                                <div className="circle total-sales-current-year">{salesWeek}</div>
                                            </p>
                                        </div>
                                        <div>
                                            <p className="mb-0">
                                                <span className="text-black text-sm font-weight-bolder">Current Month:</span>
                                            </p>
                                            <p className="mb-0">
                                                <div className="circle sales-current-month">{salesMonth}</div>
                                            </p>
                                        </div>
                                    </div>
                                    <hr style={{ margin: "1rem 0" }} />
                                    <div className="align-content-center">
                                        <p className="mb-0">
                                            <span className="text-black text-sm font-weight-bolder">Total Sales for the Current Year:</span>
                                        </p>
                                        <p className="mb-0">
                                            <div className="circle total-sales-current-year">{salesYear}</div>
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <div className="card mt-2">
                                <div className="card-header p-3 pt-1 bg-dark  text-white">
                                    <div className="icon icon-lg icon-shape">
                                        <FcSalesPerformance size={35} />
                                    </div>
                                    <div className="text-end pt-1">
                                        <p className="mb-0 text-capitalize font-weight-bolder">SIM Card Sales Income</p>
                                    </div>
                                </div>
                                <div className="card-body">
                                    <div style={{ display: "grid", gridTemplateColumns: "repeat(2, minmax(0, 1fr))", gap: "1rem" }}>
                                        <div>
                                            <p className="mb-0">
                                                <span className="text-black text-sm font-weight-bolder">Daily Income:</span>
                                            </p>
                                            <p className="mb-0">
                        <span style={{ fontSize: "0.9rem", fontWeight: "bold", color: "#FFC107" }}>
                            {sumByDay.map((item) => (
                                <h8 key={item.day}>
                                    {formatDate(item.day)}: {item.total}
                                    <br />
                                </h8>
                            ))}
                        </span>
                                            </p>
                                        </div>
                                        <div>
                                            <p className="mb-0">
                                                <span className="text-black text-sm font-weight-bolder">Monthly Income:</span>
                                            </p>
                                            <p className="mb-0">
                        <span style={{ fontSize: "0.9rem", fontWeight: "bold", color: "#2196F3" }}>
                            {sumByMonth.map((item) => (
                                <h8 key={item.month}>
                                    Month {item.month}: {item.total}
                                    <br />
                                </h8>
                            ))}
                        </span>
                                            </p>
                                        </div>
                                    </div>
                                    <hr style={{ margin: "1rem 0" }} />
                                    <div>
                                        <p className="mb-0">
                                            <span className="text-black text-sm font-weight-bolder">Total Income:</span>
                                        </p>
                                        <p className="mb-0">
                    <span style={{ fontSize: "1rem", fontWeight: "bold", color: "#4CAF50" }}>
                        {sumByYear.map((item) => (
                            <h8 key={item.year}>
                                Year {item.year}: {item.total} dt
                                <br />
                            </h8>
                        ))}
                    </span>
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-xl-4 col-sm-6 mb-xl-0 mb-4">
                            <div className="card">
                                <div className="card-header p-3 pt-1 bg-dark  text-white">
                                    <div className="icon icon-lg icon-shape">
                                        <FcFactoryBreakdown size={35} />
                                    </div>
                                    <div className="text-end pt-1">
                                        <p className="mb-0 text-capitalize font-weight-bolder">Top 3 Repeats: Regions</p>
                                    </div>
                                </div>
                                <div className="card-body">
                                    <div className="top-regions" style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                                        {top3Regions.map((region, index) => (
                                            <div className="region-item" key={index} style={{ backgroundColor: getBoxColor(index), borderRadius: "8px", padding: "8px", margin: "5px", boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)", transition: "transform 0.3s ease" }}>
                                                <div className="region-rank" style={{ backgroundColor: getRankColor(index), color: "white", fontSize: "1rem", fontWeight: "bold", borderRadius: "50%", width: "28px", height: "28px", display: "flex", justifyContent: "center", alignItems: "center", marginRight: "8px" }}>
                                                    {index + 1}
                                                </div>
                                                <div className="region-info" style={{ display: "flex", flexDirection: "column" }}>
                                                    <p className="region-name" style={{ fontSize: "1rem", fontWeight: "bold" }}>
                                                        {region.region}
                                                    </p>
                                                    <p className="region-occurrences" style={{ color: "#000", fontSize: "0.9rem" }}>
                                                        {region.count} occurrences
                                                    </p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-xl-4 col-sm-6 mb-xl-0 mb-3" style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', height: '90vh', overflow: 'hidden'}}>
                            <div className="MapContainerWrapper" style={{ border: '2px solid #fff', borderRadius: '5px', width: '100%', height: '100%', boxShadow: '0 0 5px rgba(0, 0, 0, 0.3)' }}>
                                <MapContainer center={tunisPosition} zoom={9} style={{ height: '100%', width: '100%' }}>
                                    <TileLayer
                                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                                    />
                                    <Marker position={tunisPosition} icon={customMarkerIcon}>
                                        <Popup>Tunis</Popup>
                                    </Marker>
                                    <Marker position={arianaPosition} icon={customMarkerIcon}>
                                        <Popup>Ariana</Popup>
                                    </Marker>
                                    <Marker position={bejaPosition} icon={customMarkerIcon}>
                                        <Popup>Beja</Popup>
                                    </Marker>
                                    <Marker position={bizertePosition} icon={customMarkerIcon}>
                                        <Popup>Bizerte</Popup>
                                    </Marker>
                                    <Marker position={sfaxPosition} icon={customMarkerIcon}>
                                        <Popup>Sfax</Popup>
                                    </Marker>
                                    <Marker position={soussePosition} icon={customMarkerIcon}>
                                        <Popup>Sousse</Popup>
                                    </Marker>
                                    <Marker position={gabesPosition} icon={customMarkerIcon}>
                                        <Popup>Gabes</Popup>
                                    </Marker>
                                    <Marker position={nabeulPosition} icon={customMarkerIcon}>
                                        <Popup>Nabeul</Popup>
                                    </Marker>
                                    <Marker position={medeninePosition} icon={customMarkerIcon}>
                                        <Popup>Mednine</Popup>
                                    </Marker>
                                    <Marker position={monastirPosition} icon={customMarkerIcon}>
                                        <Popup>Monastir</Popup>
                                    </Marker>
                                    <Marker position={kairouanPosition} icon={customMarkerIcon}>
                                        <Popup>Kairouan</Popup>
                                    </Marker>
                                    <Marker position={jendoubaPosition} icon={customMarkerIcon}>
                                        <Popup>Jendouba</Popup>
                                    </Marker>
                                    <Marker position={tozeurPosition} icon={customMarkerIcon}>
                                        <Popup>Tozeur</Popup>
                                    </Marker>
                                    <Marker position={kebiliPosition} icon={customMarkerIcon}>
                                        <Popup>Kebili</Popup>
                                    </Marker>
                                    <Marker position={zaghouanPosition} icon={customMarkerIcon}>
                                        <Popup>Zaghouan</Popup>
                                    </Marker>
                                    <Marker position={mahdiaPosition} icon={customMarkerIcon}>
                                        <Popup>Mahdia</Popup>
                                    </Marker>
                                    <Marker position={silianaPosition} icon={customMarkerIcon}>
                                        <Popup>Siliana</Popup>
                                    </Marker>
                                    <Marker position={tataouinePosition} icon={customMarkerIcon}>
                                        <Popup>Tataouine</Popup>
                                    </Marker>
                                </MapContainer>
                            </div>
                        </div>
                    </div>
                </div>
            </main>

        </div>

    );
}

export default Review;
