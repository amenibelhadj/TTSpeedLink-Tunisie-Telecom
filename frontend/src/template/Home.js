import React from "react";
import Aside from "../template/Aside";


function Home() {

    return (
        <body className="g-sidenav-show bg-gray-100">
        <main className="main-content mt-0 ps">
            <div className="page-header align-items-start min-vh-100" style={{backgroundImage: "url('https://images.unsplash.com/photo-1624280433509-b01afeaf68e5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1315&q=80')"}}>
                <span className="mask bg-gradient-dark opacity-6"></span>
                <Aside />
            </div>
        </main>
        </body>
    );
}

export default Home;
