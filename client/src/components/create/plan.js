import React,{useState,useEffect} from 'react'
import {Alert,TextField,Button,Dialog,DialogTitle,DialogActions,DialogContent} from '@mui/material'
import {useNavigate} from 'react-router-dom'
import axios from 'axios'

function Plan(props) {
    const [selected,setSelected]=useState({})
    const [success,setSuccess] = useState(false);
    const [error,setError]=useState(null)
    const [open,setOpen]=useState(false)
    const navigate = useNavigate();
    const handleClose = () => {
        setOpen(false);
    }
    const create = () => {
        setOpen(true);
    }
    const handleSubmit = async() => {
        await axios.post('http://localhost:5000/plan',{code_RLP:selected.code_RLP,ordre_jour:selected.ordre_jour,ordre_lecture_paquet:selected.ordre_lecture_paquet,tournée_debut:selected.tournée_debut,tournée_fin:selected.tournée_fin}).then(res => {     
            if(res.data.error) {
                setError(res.data.error);
            } else {
                setOpen(false);
                navigate(0);
            }
        }).catch(err => {
            setError(err.message);
        });
    }
    useEffect(() => {
      if(window.localStorage.getItem('success')) {
        setSuccess(true);
      }
    },[])
  return (
    <div style={props.style}>
        <Button variant="contained" onClick={create} sx={{color:'white',height:'60px',width:'100%'}}>Create</Button>
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
        {error && <Alert severity="error">{error[0] || error}</Alert>}
        <TextField
          autoFocus
          margin="dense"
          id="name"
          label="code_RLP"
          type="text"
          fullWidth
          variant="standard"
          value={(selected && selected.code_RLP) || ''}
          onChange={(e)=>{setSelected({...selected,code_RLP:e.target.value})}}
        />
        <TextField
          autoFocus
          margin="dense"
          id="name"
          label="ordre_jour"
          type="text"
          fullWidth
          value={(selected && selected.ordre_jour) || ''}
          variant="standard"
          onChange={(e)=>{setSelected({...selected,ordre_jour:e.target.value})}}
        />
        <TextField
          autoFocus
          margin="dense"
          id="name"
          label="ordre_lecture_paquet"
          type="text"
          fullWidth
          value={(selected && selected.ordre_lecture_paquet) || ''}
          variant="standard"
          onChange={(e)=>{setSelected({...selected,ordre_lecture_paquet:e.target.value})}}
        />
        <TextField
          autoFocus
          margin="dense"
          id="name"
          label="tournee_debut"
          type="text"
          fullWidth
          value={(selected && selected.tournée_debut) || ''}
          variant="standard"
          onChange={(e)=>{setSelected({...selected,tournée_debut:e.target.value})}}
        />
        <TextField
          autoFocus
          margin="dense"
          id="name"
          label="tournee_fin"
          type="text"
          fullWidth
          value={(selected && selected.tournée_fin) || ''}
          variant="standard"
          onChange={(e)=>{setSelected({...selected,tournée_fin:e.target.value})}}
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

export default Plan
