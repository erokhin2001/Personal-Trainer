import React, { useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';

function EditCustomer(props) {
    const [open, setOpen] = useState(false);
    const [customer, setCustomer] = useState({
      
        firstname: '',
        lastname: '',
        streetaddress: '',
        postcode: '',
        city: '',
        email: '',
        phone: ''
    });

    const handleClickOpen = () => {
        setCustomer({
            firstname: props.customer.firstname,
            lastname: props.customer.lastname,
            streetaddress: props.customer.streetaddress,
            postcode: props.customer.postcode,
            city: props.customer.city,
            email: props.customer.email,
            phone: props.customer.phone
        });
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleSave = () => {
        props.editCustomer(customer, props.customer.links[0].href);
        handleClose();
    }

    const inputChanged = event => {
        setCustomer({...customer, [event.target.name]: event.target.value});
    }

    return (
        <div>
          <Button size="small" onClick={handleClickOpen}>
            Edit
          </Button>
          <Dialog open={open} onClose={handleClose}>
            <DialogTitle>Edit Customer</DialogTitle>
            <DialogContent>
              <TextField
                margin="dense"
                name="firstname"
                value={customer.firstname}
                onChange={inputChanged}
                label="First name"
                fullWidth
                variant="standard"
              />
              <TextField
                margin="dense"
                name="lastname"
                value={customer.lastname}
                onChange={inputChanged}
                label="Last Name"
                fullWidth
                variant="standard"
              />
              <TextField
                margin="dense"
                name="streetaddress"
                value={customer.streetaddress}
                onChange={inputChanged}
                label="Street Address"
                fullWidth
                variant="standard"
              />
              <TextField
                margin="dense"
                name="postcode"
                value={customer.postcode}
                onChange={inputChanged}
                label="Postcode"
                fullWidth
                variant="standard"
              />
              <TextField
                margin="dense"
                name="city"
                value={customer.city}
                onChange={inputChanged}
                label="City"
                fullWidth
                variant="standard"
              />
              <TextField
                margin="dense"
                name="email"
                value={customer.email}
                onChange={inputChanged}
                label="Email"
                fullWidth
                variant="standard"
              />
              <TextField
                margin="dense"
                name="phone"
                value={customer.phone}
                onChange={inputChanged}
                label="Phone"
                fullWidth
                variant="standard"
              />
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose}>Cancel</Button>
              <Button onClick={handleSave}>Save</Button>
            </DialogActions>
          </Dialog>
        </div>
    );
}
    
export default EditCustomer;
