import './home.style.css'
import {useEffect, useState} from "react";
import axios from "axios";

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
import NavbarHome from "../../components/Home/Navbar";
import {Link} from "react-router-dom";
import {Button} from "react-bootstrap";

export const HomePage = (props) => {

    return (
        <>
            <div className="container">
                <h4>Welcome to test task.</h4>
                <br/>
                <Link className="nav-link" to="/dashboard">
                    <Button>Goto Dashboard</Button>
                </Link>
            </div>
        </>
    );
}