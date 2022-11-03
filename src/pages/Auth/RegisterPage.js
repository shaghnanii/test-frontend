import './authstyle.css'
import {useEffect, useState} from "react";
import axios from "axios";

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
import {Link} from "react-router-dom";

export const RegisterPage = (props) => {
    const [data, setData] = useState({});

    const [errors, setErrors] = useState(false)

    useEffect(() => {}, []);

    const handleSubmitClick = (e) => {
        console.log("React : ", data)
        e.preventDefault();
        const payload = {
            name: data.name,
            email: data.email,
        };
        axios
            .post(`${process.env.REACT_APP_URL}/register`, payload)
            .then(function (response) {
                console.log('api respone status; ', response.status)
                if (response.status === 200) {
                    toast.success(response.data.message)
                    props.history.push("/login");
                }
            })
            .catch(function (error) {
                setErrors([])
                if (error.response.status === 422) {
                    setErrors(error.response.data.errors)
                }
                else if (error.response.status === 401) {
                    toast.error(error.response.data.message)
                }
            });
    };

    const redirectToLogin = (msg) => {
        props.history.push({
            pathname: "/login",
            state: { detail: msg },
        });
    };

    const handleChange = (e) => {
        const { id, value } = e.target;
        setData((prevState) => ({
            ...prevState,
            [id]: value,
        }));
    };

    return (
        <div className="container">
            <div className="wrapper fadeInDown">
                <div id="formContent">
                    <div className="fadeIn first">
                        <h5 className="mb-5 mt-5">Register Page</h5>
                    </div>
                    <form>
                        <input
                            type="text"
                            id="email"
                            className="fadeIn second input-field"
                            name="email"
                            onChange={handleChange}
                            value={data.email}
                            placeholder="Enter Email">
                        </input>
                        <input
                            type="text"
                            id="name"
                            className="fadeIn third input-field"
                            name="name"
                            onChange={handleChange}
                            value={data.name}
                            placeholder="Name">
                        </input>

                        <div className="">
                            {errors && errors.name && errors.name[0] &&
                                <span style={{color: 'red'}}>{errors.name[0]}</span>}
                        </div>
                        <div>
                            {errors && errors.email && errors.email[0] &&
                                <span style={{color: 'red'}}>{errors.email[0]}</span>}
                        </div>

                        <input type="button"
                               onClick={handleSubmitClick}
                               className="fadeIn fourth mt-4"
                               value="Register">
                        </input>
                    </form>
                    <Link to="/Login">Goto Login</Link>
                </div>
            </div>
        </div>
    );
}