import React, { useState, useEffect } from 'react';
import {AgGridReact} from 'ag-grid-react';
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import * as moment from "moment";

import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-material.css';

function TrainingList() {
    const [trainings, setTrainings] = useState([]);
    const [open, setOpen] = useState(false);
    const [msg, setMsg] = useState('');

    useEffect(() => {
        fetchTrainings();
    }, []);

    const handleClose = () => {
        setOpen(false)
    }

    const fetchTrainings = () => {
        fetch('https://customerrest.herokuapp.com/gettrainings')
        .then(response => response.json())
        .then(data => setTrainings(data))
        .catch(err => console.error(err))
    }

    const deleteTraining = (url) => {
        if (window.confirm('Are you sure?')) {
            fetch('https://customerrest.herokuapp.com/api/trainings/' + url.data.id, {method: 'DELETE'})
            .then(response => {
                if (response.ok) {
                    setMsg('Training deleted');
                    setOpen(true);
                    fetchTrainings();
                } else {
                    alert('Something went wrong')
                }
            })
            .catch((err) => console.error(err))
        }
    }

    function fullName(url) {
        try{
            return url.data.customer.firstname + ' ' + url.data.customer.lastname;

        }catch(e){
            console.log('data missing');
        }
    }

    const columns = [
        {field: 'date', sortable: true, filter: true, width: 410,  
            valueGetter: function date(params) {
                return moment(params.data.date).format("MMMM Do YYYY, h:mm")
        }},
        {field: 'duration', sortable: true, filter: true},
        {field: 'activity', sortable: true, filter: true},
        {field: 'customer', width: 210, sortable: true, filter: true, valueGetter: fullName},
        {
            headerName: "",
            sortable: false,
            filter: false,
            width: 120,
            field: "links[0].href",
            cellRendererFramework: (params) => (
                <Button 
                    size="small" 
                    color="error" 
                    onClick={() => deleteTraining(params)}
                >
                    Delete
                </Button>
            ),
        },
    ];


    return (
        <div>
            <div className="ag-theme-material" style={{marginTop: 8, height: 600, width: '90%', margin: 'auto'}}>
                <AgGridReact 
                    rowData={trainings}
                    columnDefs={columns}
                    pagination={true}
                    paginationPageSize={10}
                    suppressCellSelection={true}
                />
            </div>
            <Snackbar 
                open={open}
                autoHideDuration={3000}
                message={msg}
                onClose={handleClose}
            />
        </div>
    );
}

export default TrainingList;