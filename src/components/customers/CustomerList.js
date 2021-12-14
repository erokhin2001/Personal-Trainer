import React, { useState, useEffect } from 'react';
import { AgGridReact } from 'ag-grid-react';
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
// import ExportCSV from './ExportCSV'


import AddCustomer from './AddCustomer'
import EditCustomer from './EditCustomer'
import AddTraining from '../trainings/AddTraining';

import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-material.css';

function CustomerList() {
    const [customers, setCustomers] = useState([]);
    const [open, setOpen] = useState(false);
    const [msg, setMsg] = useState('');

    useEffect(() => {
        fetchCustomers();
    }, []);

    const handleClose = () => {
        setOpen(false)
    }

    const fetchCustomers = () => {
        fetch('https://customerrest.herokuapp.com/api/customers')
        .then(response => response.json())
        .then(data => setCustomers(data.content))
        .catch(err => console.error(err))
    }

    const deleteCustomer = (url) => {
        if (window.confirm('Are you sure?')) {
            fetch(url.data.links[0].href, {method: 'DELETE'})
            .then(response => {
                if (response.ok) {
                    setMsg('Customer deleted');
                    setOpen(true);
                    fetchCustomers();
                } else {
                    alert('Something went wrong')
                }
            })
            .catch((err) => console.error(err))
        }
    }

    const addCustomer = customer => {
        fetch('https://customerrest.herokuapp.com/api/customers', {
            method: 'POST',
            headers: {
                'Content-type' : 'application/json'
            },
            body: JSON.stringify(customer)
        })
        .then(response => fetchCustomers())
        .catch((err) => console.error(err))
    };

    const editCustomer = (editedCustomer, link) => {
        fetch(link ,{
            method: 'PUT',
            headers: {
                'Content-type' : 'application/json'
            },
            body: JSON.stringify(editedCustomer)

        })
        .then(_ => {
            setOpen(true);
            fetchCustomers();
        })
        .then(response => {
            setMsg('Customer edited')
        })
        .catch(err => console.error(err))
    };

    const fetchTrainings = () => {
        fetch('https://customerrest.herokuapp.com/gettrainings')
        .then(response => response.json())
        .then(data => fetchTrainings(data))
        .catch(err => console.error(err))
    }

    const addTraining = training => {
        fetch('https://customerrest.herokuapp.com/api/trainings', {
            method: 'POST',
            headers: {
                'Content-type' : 'application/json'
            },
            body: JSON.stringify(training)
        })
        .then(response => fetchTrainings())
        .catch((err) => console.error(err))
    };

    const columns = [
        {field: 'firstname', width: 170, sortable: true, filter: true},
        {field: 'lastname', width: 170, sortable: true, filter: true},
        {field: 'streetaddress', sortable: true, filter: true},
        {field: 'postcode', width: 150, sortable: true, filter: true},
        {field: 'city', width: 160, sortable: true, filter: true},
        {field: 'email', sortable: true, filter: true},
        {field: 'phone', width: 130, sortable: true, filter: true},
        {
            headerName: "",
            sortable: false,
            filter: false,
            width: 100,
            field: "links[0].href",
            cellRendererFramework: (params) => <EditCustomer editCustomer={editCustomer} customer={params.data} />
        },
        {
            headerName: "",
            sortable: false,
            filter: false,
            width: 140,
            field: "links[0].href",
            cellRendererFramework: (params) => <AddTraining addTraining={addTraining} customer={params.data} />
        },
        {
            headerName: "",
            sortable: false,
            filter: false,
            width: 100,
            field: "links[0].href",
            cellRendererFramework: (params) => (
                <Button size="small" color="error" onClick={() => deleteCustomer(params)}>
                    Delete
                </Button>
            ),
        },
        
    ];


    return (
        <div>
            <AddCustomer addCustomer={addCustomer}/>
            <div className="ag-theme-material" style={{marginTop: 8, height: 600, width: '90%', margin: 'auto'}}>
                <AgGridReact 
                    rowData={customers}
                    columnDefs={columns}
                    pagination={true}
                    paginationPageSize={10}
                    suppressCellSelection={true}
                />
            </div>
            {/* <ExportCSV/> */}
            <Snackbar 
                open={open}
                autoHideDuration={3000}
                message={msg}
                onClose={handleClose}
            />
        </div>
    );
}

export default CustomerList;

