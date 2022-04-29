import React from 'react'
import axios from 'axios'
import {Button,Dialog,DialogTitle,DialogActions} from '@mui/material'
import { useNavigate } from 'react-router-dom';

function Delete(props) {
    const navigate = useNavigate();
    const handleClose = () => {
        props.setOpen(false);
    };
    const handleDelete = async(id) => {
        await axios.delete(`http://localhost:5000/user/${id}`).then(res => {
            window.localStorage.setItem('success',res.data.success);
            props.setOpen(false);
            navigate(0);
        })
    }
  return (
    <Dialog
        open={props.open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">
        {"Are you sure you want to delete this user ?"}
      </DialogTitle>
      <DialogActions>
        <Button onClick={handleClose}>Disagree</Button>
        <Button onClick={() => {handleDelete(props.id)}} autoFocus>
          Agree
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default Delete
