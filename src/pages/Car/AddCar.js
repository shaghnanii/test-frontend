import {useEffect, useState} from "react";
import axios from "axios";
import DataTable from 'react-data-table-component';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
import NavbarHome from "../../components/Home/Navbar";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';


export const AddCar = (props) => {
    const [data, setData] = useState({});
    const [categories, setCategories] = useState([]);
    const [category, setCategory] = useState(null);

    const [errors, setErrors] = useState(false)

    useEffect(() => {
        axios
            .get("http://localhost:8000/api/categories", {
                headers: {
                    Authorization: `bearer ${localStorage.getItem('LOGINACCESSTOKEN')}`
                }
            })
            .then(function (response) {
                if (response.status === 200) {
                    console.log("cateogris: ", response.data.data)
                    setCategories(response.data.data)
                }
            })
            .catch(function (error) {
                toast.info("Failed to load categories from server")
            })
    }, []);

    const handleChange = (e) => {
        const { id, value } = e.target;
        setData((prevState) => ({
            ...prevState,
            [id]: value,
        }));
    };
    function updateCategory(e) {
        setCategory(e.target.value)
    }

    function submitHandler(e) {
        e.preventDefault()
        const payload = {
            color: data.color,
            model: data.model,
            make: data.make,
            registration_no: data.registration_no,
            category_id: category
        };
        axios
            .post("http://localhost:8000/api/cars", payload, {
                headers: {
                    Authorization: `bearer ${localStorage.getItem('LOGINACCESSTOKEN')}`
                }
            })
            .then(function (response) {
                if (response.status === 200) {
                    props.history.push("/cars");
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
                <h6>Add New Car</h6>
            </div>

            <div className="container">
                <Form>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Model</Form.Label>
                        <Form.Control
                            id="model"
                            value={data.model}
                            onChange={handleChange}
                            type="text"
                            placeholder="Model" />
                        <div>
                            {errors && errors.model && errors.model[0] &&
                                <span style={{color: 'red'}}>{errors.model[0]}</span>}
                        </div>

                        <Form.Label>Color</Form.Label>
                        <Form.Control
                            id="color"
                            value={data.color}
                            onChange={handleChange}
                            type="text"
                            placeholder="Color" />
                        <div>
                            {errors && errors.color && errors.color[0] &&
                                <span style={{color: 'red'}}>{errors.color[0]}</span>}
                        </div>

                        <Form.Label>Make</Form.Label>
                        <Form.Control
                            id="make"
                            name="make"
                            value={data.make}
                            onChange={handleChange}
                            type="text"
                            placeholder="Make" />
                        <div>
                            {errors && errors.make && errors.make[0] &&
                                <span style={{color: 'red'}}>{errors.make[0]}</span>}
                        </div>

                        <Form.Label>Registration No</Form.Label>
                        <Form.Control
                            id="registration_no"
                            name="registration_no"
                            value={data.registration_no}
                            onChange={handleChange}
                            type="text"
                            placeholder="Registration #" />
                        <div>
                            {errors && errors.registration_no && errors.registration_no[0] &&
                                <span style={{color: 'red'}}>{errors.registration_no[0]}</span>}
                        </div>


                        <Form.Group className="mb-3">
                            <Form.Label>Select Category</Form.Label>
                            <Form.Select id="category_id" name="category_id" onChange={updateCategory}>
                                {
                                    categories.length && categories.map((item) => (
                                        <option value={item.id}>{ item.name }</option>
                                    ))
                                }
                            </Form.Select>
                            <div>
                                {errors && errors.category_id && errors.category_id[0] &&
                                    <span style={{color: 'red'}}>{errors.category_id[0]}</span>}
                            </div>
                        </Form.Group>

                    </Form.Group>
                    <Button onClick={submitHandler} variant="primary" type="btn">
                        Submit
                    </Button>
                </Form>
            </div>
        </>
    );
}