import {useEffect, useState} from "react";
import axios from "axios";
import DataTable from 'react-data-table-component';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
import NavbarHome from "../../components/Home/Navbar";
import {Alert, Button} from "react-bootstrap";


export const Category = (props) => {
    const [data, setData] = useState({});

    const [errors, setErrors] = useState(false)

    useEffect(() => {
        axios
            .get(`${process.env.REACT_APP_URL}/categories`, {
                headers: {
                    Authorization: `bearer ${localStorage.getItem(process.env.REACT_APP_TOKEN_VARIABLE)}`
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

    const columns = [
        {
            name: 'ID',
            selector: 'id',
            sortable: true,
        },
        {
            name: 'Name',
            selector: 'name',
            sortable: true,
        },
    ];

    function addCategory() {
        props.history.push('/add-categories')
    }

    return (
        <>
            <div className="container">
                {
                    data.length ?
                        <DataTable
                            title="Categories"
                            data={data}
                            columns={columns}
                            pagination
                            highlightOnHover
                        />
                        :
                        <Alert className="mt-4">No categories data found!</Alert>
                }
            </div>

            <div className="container">
                <Button onClick={addCategory} className="justify-content-center">Add Category</Button>
            </div>
        </>
    );
}