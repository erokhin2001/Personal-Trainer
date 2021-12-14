import React, { useState } from 'react';
import { CSVLink } from "react-csv";

function ExportCSV() {
    const [customers, setCustomers] = useState([]);
    const headers = [
        { label: "First Name", key: "firstname" },
        { label: "Last Name", key: "lastname" },
        { label: "Street Address", key: "streetaddress" },
        { label: "Postcode", key: "postcode" },
        { label: "City", key: "city" },
        { label: "Email", key: "email" },
        { label: "Phobe number", key: "phone" },
      ];

    fetch('https://customerrest.herokuapp.com/api/customers')
    .then(response => response.json())
    .then(data => setCustomers(data.content))
    .catch(err => console.error(err))



    return(
            <CSVLink data={customers} headers={headers} filename={"customers.csv"}>
                Get CSV version
            </CSVLink>
    );
}

export default ExportCSV;