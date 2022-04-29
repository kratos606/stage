import React,{useState,useEffect} from 'react'
import axios from 'axios';
import {Alert,Dialog,DialogTitle,DialogActions,DialogContent,TextField,FormLabel,RadioGroup,Radio,FormControlLabel,FormControl,Button,Snackbar} from '@mui/material'
import {useNavigate} from 'react-router-dom'
import { Check,Close } from '@mui/icons-material';

function Create(props) {
  const [error,setError] = useState(null);
  const [success,setSuccess] = useState(false);
  const [selected,setSelected] = useState({})
  const [open, setOpen] = React.useState(false);
  const navigate = useNavigate();
  const handleClose = () => {
    setOpen(false);
  };
  const create = () => {
      setOpen(true);
  }
  const handleSubmit = async() => {
    await axios.post('http://localhost:5000/user',{username:selected.username,email:selected.email,password:selected.password,isAdmin:selected.isAdmin}).then(res => {
        if(res.data.error) {
            setError(res.data.error)
        }
        else {
          window.localStorage.setItem('success',res.data.success);
          setOpen(false);
          navigate(0);
        }
    })
  }
  useEffect(() => {
    if(window.localStorage.getItem('success')) {
      setSuccess(true);
    }
  },[])
    return (
        <div style={props.style}>
        <Button variant="contained" onClick={create} sx={{color:'white',height:'60px',width:'100%',marginBlock:'1rem'}}>Create</Button>
        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">
            {'Create User'}
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
            <FormControl sx={{marginTop:'1rem'}}>
              <FormLabel id="demo-radio-buttons-group-label">Admin</FormLabel>
              <RadioGroup
                aria-labelledby="demo-radio-buttons-group-label"
                sx={{marginTop:'1rem',marginLeft:'2rem'}}
                name="radio-buttons-group"
                value={(selected && selected.isAdmin) || 'false'}
                onChange={(e)=>{setSelected({...selected,isAdmin:e.target.value})}}
              >
                <FormControlLabel value="true" control={<Radio />} label={<Check color='success'/>} />
                <FormControlLabel value="false" control={<Radio />} label={<Close color='error'/>} />
              </RadioGroup>
            </FormControl>
            <TextField
              autoFocus
              margin="dense"
              id="name"
              label="password"
              type="password"
              value={selected && selected.password}
              fullWidth
              variant="standard"
              onChange={(e)=>{setSelected({...selected,password:e.target.value})}}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleSubmit} autoFocus>
              Create
            </Button>
            <Button onClick={handleClose}>Close</Button>
          </DialogActions>
        </Dialog>
        <Snackbar  anchorOrigin={{vertical: 'bottom', horizontal: 'right'}} open={success} autoHideDuration={6000} onClose={()=>{setSuccess(false);window.localStorage.clear()}}>
          <Alert onClose={()=>{setSuccess(false);window.localStorage.clear()}} variant="filled" severity="success" sx={{ width: '100%' }}>
            {window.localStorage.getItem('success')}
          </Alert>
        </Snackbar>
        </div>
    )
}

export default Create
