import {useEffect, useState} from "react";
import axios from "axios";
import DataTable from 'react-data-table-component';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
import NavbarHome from "../../components/Home/Navbar";
import {Alert, Button} from "react-bootstrap";


export const Car = (props) => {
    const [data, setData] = useState({});

    const [errors, setErrors] = useState(false)

    useEffect(() => {
        axios
            .get("http://localhost:8000/api/cars", {
                headers: {
                    Authorization: `bearer ${localStorage.getItem("LOGINACCESSTOKEN")}`
                }
            })
            .then(function (response) {
                if (response.status === 200) {
                    setData(response.data.data)
                }
            })
            .catch(function (error) {
                console.log("error response: ", error)
            });
    }, []);

    function addCar() {
        props.history.push('/add-cars')
    }
    const columns = [
        {
            name: 'Color',
            selector: 'color',
            sortable: true,
        },
        {
            name: 'Model',
            selector: 'model',
            sortable: true,
        },
        {
            name: 'Make',
            selector: 'make',
            sortable: true,
        },
        {
            name: 'Registration #',
            selector: 'registration_no',
            sortable: true,
        },
        {
            name: 'Category',
            selector: 'category.name',
            sortable: true,
        },
    ];

    return (
        <>
            <div className="container">
                {
                    data.length ?
                        <DataTable
                            title="Cars"
                            data={data}
                            columns={columns}
                            pagination
                            highlightOnHover
                        />
                        :
                        <Alert className="mt-4">No car data found!</Alert>
                }
            </div>
            <div className="container">
                <Button onClick={addCar} className="justify-content-center">Add Car</Button>
            </div>
        </>
    );
}