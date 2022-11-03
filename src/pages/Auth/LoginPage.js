import './authstyle.css'
import {useEffect, useState} from "react";
import axios from "axios";

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'

export const LoginPage = (props) => {
    const [data, setData] = useState({});

    const [errors, setErrors] = useState(false)

    useEffect(() => {}, []);

    const handleSubmitClick = (e) => {
        console.log("React : ", data)
        e.preventDefault();
        const payload = {
            email: data.email,
            password: data.password,
        };
        axios
            .post("http://localhost:8000/api/login", payload)
            .then(function (response) {
                if (response.status === 200) {
                    setData((prevState) => ({
                        ...prevState,
                        successMessage: "Login successful. Checking User Role...",
                    }));
                    // console.log("Token: ", response)
                    localStorage.setItem("LOGINACCESSTOKEN", response.data.data.authorization.token);
                    localStorage.setItem("IS_AUTH", true);

                    const token = localStorage.getItem("LOGINACCESSTOKEN");
                    // axios get call to check roles of the current logged in user
                    props.history.push("/dashboard");
                }
            })
            .catch(function (error) {
                console.log("err respose:: ", error)
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
                        <h5 className="mb-5 mt-5">Login Page</h5>
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
                            type="password"
                            id="password"
                            className="fadeIn third input-field"
                            name="login"
                            onChange={handleChange}
                            value={data.password}
                            placeholder="Password">
                        </input>

                        <div className="">
                            {errors && errors.email && errors.email[0] &&
                                <span style={{color: 'red'}}>{errors.email[0]}</span>}
                        </div>
                        <div>
                            {errors && errors.password && errors.password[0] &&
                                <span style={{color: 'red'}}>{errors.password[0]}</span>}
                        </div>

                        <input type="button"  onClick={handleSubmitClick} className="fadeIn fourth mt-4" value="Log In"></input>
                    </form>
                </div>
            </div>
        </div>
    );
}