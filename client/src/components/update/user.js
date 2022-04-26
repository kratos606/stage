import React, { useEffect } from 'react'
import { Alert,Button,Dialog,DialogTitle,DialogActions,DialogContent,TextField,FormLabel,RadioGroup,Radio,FormControlLabel,FormControl } from '@mui/material'
import axios from 'axios';
import { useNavigate } from "react-router-dom";

function UpdateUser(props) {
    const navigate = useNavigate();
    const [selected,setSelected] = React.useState(props.user)
    const [error,setError] = React.useState(false)
    const handleClose = () => {
        props.setOpen(false);
    };
    const handleUpdate = async() => {
      selected.isAdmin === 'true' ? selected.isAdmin=true : selected.isAdmin=false
      await axios.put(`http://localhost:5000/user/${selected._id}`,{username:selected.username,email:selected.email,password:selected.password,isAdmin:selected.isAdmin}).then(res => {
        if(res.data.error) {
          setError(res.data.error)
        }
        else {
          props.setOpen(false);
          navigate(0);
        }
      })
    }
    useEffect(() => {
        setSelected(props.user);
    }, [props.user,props.open]);
  return (
    <Dialog
          open={props.open}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">
            {'Update User'}
          </DialogTitle>
          <DialogContent>
            {error && <Alert severity="error">{error}</Alert>}
            <TextField
              autoFocus
              margin="dense"
              id="name"
              label="Username"
              type="text"
              fullWidth
              variant="standard"
              value={selected && selected.username}
              onChange={(e)=>{setSelected({...selected,username:e.target.value})}}
            />
            <TextField
              autoFocus
              margin="dense"
              id="name"
              label="Email"
              type="email"
              fullWidth
              value={selected && selected.email}
              variant="standard"
              onChange={(e)=>{setSelected({...selected,email:e.target.value})}}
            />
            <FormControl>
              <FormLabel id="demo-radio-buttons-group-label">isAdmin</FormLabel>
              <RadioGroup
                aria-labelledby="demo-radio-buttons-group-label"
                name="radio-buttons-group"
                value={selected && selected.isAdmin}
                onChange={(e)=>{setSelected({...selected,isAdmin:e.target.value})}}
              >
                <FormControlLabel value="true" control={<Radio />} label="true" />
                <FormControlLabel value="false" control={<Radio />} label="false" />
              </RadioGroup>
            </FormControl>
            <TextField
              autoFocus
              margin="dense"
              id="name"
              label="password"
              type="password"
              value={selected && (selected.password || '')}
              fullWidth
              variant="standard"
              onChange={(e)=>{setSelected({...selected,password:e.target.value})}}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Disagree</Button>
            <Button onClick={handleUpdate} autoFocus>
              Agree
            </Button>
          </DialogActions>
        </Dialog>
  )
}

export default UpdateUser