import React,{Component} from "react";
import { AiFillHeart } from "react-icons/ai";


export default class Footer extends Component{
    render() {
        return(
            <footer style={{ position: "fixed", width: "50%", backgroundColor: "white" }}>
                <div className="container-fluid">
                    <div className="row align-items-center justify-content-lg-between">
                        <div className="col-lg-6 mb-lg-0 mb-4">
                            <div className="copyright text-center text-sm text-muted text-lg-start">
                                © <script>
                                document.write(new Date().getFullYear())
                            </script>2023,
                                made with <AiFillHeart/> by
                                <a href="https://github.com/amenibelhadj" className="text-black-50 bold" target="_blank"> Ameni Belhadj</a>
                            </div>
                        </div>
                    </div>
                </div>
            </footer>
        )
    }
}