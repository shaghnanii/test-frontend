import {useEffect, useState} from "react";
import axios from "axios";
import DataTable from 'react-data-table-component';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
import NavbarHome from "../../components/Home/Navbar";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';


export const AddCategory = (props) => {
    const [data, setData] = useState({});

    const [errors, setErrors] = useState(false)

    useEffect(() => {
        //
    }, []);

    const handleChange = (e) => {
        const { id, value } = e.target;
        setData((prevState) => ({
            ...prevState,
            [id]: value,
        }));
    };

    function submitHandler(e) {
        e.preventDefault()
        const payload = {
            name: data.name,
        };
        axios
            .post("http://localhost:8000/api/categories", payload, {
                headers: {
                    Authorization: `bearer ${localStorage.getItem('LOGINACCESSTOKEN')}`
                }
            })
            .then(function (response) {
                if (response.status === 200) {
                    props.history.push("/categories");
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
    }
    return (
        <>
            <div className="container">
                <h6>Add New Category</h6>
            </div>

            <div className="container">
                <Form>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Category Name</Form.Label>
                        <br/>
                        <Form.Control id="name" value={data.name} onChange={handleChange} type="text" placeholder="Enter Name" />
                        <div>
                            {errors && errors.name && errors.name[0] &&
                                <span style={{color: 'red'}}>{errors.name[0]}</span>}
                        </div>
                    </Form.Group>



                    <Button onClick={submitHandler} variant="primary" type="btn">
                        Submit
                    </Button>
                </Form>
            </div>
        </>
    );
}