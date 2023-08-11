import './App.css';
import React, {Component} from "react";
import UserList from "./user/UserList";
import UserDetails from "./user/UserDetails";
import UserUpdate from "./user/UserUpdate";
import UserAddForm from "./user/UserAddForm";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import UserLogin from "./user/UserLogin";
import ShopAddForm from "./shop/ShopAddForm";
import ShopList from "./shop/ShopList";
import ShopUpdate from "./shop/ShopUpdate";
import StockAdd from "./stock/StockAdd";
import StockList from "./stock/StockList";
import Home from "./template/Home";
import StockUpdate from "./stock/StockUpdate";
import CardList from "./card/CardList";
import ClientAdd from "./card/Client Add";
import OrderAdd from "./card/OrderAdd";
import PickNumber from "./card/PickNumber";
import UserScann from "./user/UserScann";
import UserCardList from "./user/UserCardList";
import InvoiceList from "./invoice/InvoiceList";
import ClientAddOne from "./card/ClientAddOne";
import Review from "./review/Review";
import CarteGeo from "./review/CarteGeo";

class App extends Component{
  render() {
    return(
        <Router>
                    <Routes>
                        <Route exact path="/" element={<UserLogin />} />
                        <Route path="/home" element={<Review />} />
                        <Route path="/review" element={<Review />} />
                        <Route path="/carte" element={<CarteGeo />} />
                        <Route path="/users/staff" element={<UserList />} />
                        <Route path="/users/client" element={<UserCardList />} />
                        <Route path="/users/:id" element={<UserDetails />} />
                        <Route path="/users/add" element={<UserAddForm />} />
                        <Route path="/users/scan" element={<UserScann />} />
                        <Route path="/users/:id/update" element={<UserUpdate />} />
                        <Route path="/shops/add" element={<ShopAddForm />} />
                        <Route path="/shops" element={<ShopList />} />
                        <Route path="/shops/:id/update" element={<ShopUpdate />} />
                        <Route path="/stocks" element={<StockList />} />
                        <Route path="/stocks/add" element={<StockAdd />} />
                        <Route path="/stocks/:id/update" element={<StockUpdate />} />
                        <Route path="/cards" element={<CardList />} />
                        <Route path="/cards/client" element={<ClientAddOne />} />
                        <Route path="/cards/step-one" element={<ClientAdd />} />
                        <Route path="/cards/step-two" element={<OrderAdd />} />
                        <Route path="/cards/step-three" element={<PickNumber />} />
                        <Route path="/invoice" element={<InvoiceList />} />
                    </Routes>
        </Router>
    )
  }
}

export default App;
