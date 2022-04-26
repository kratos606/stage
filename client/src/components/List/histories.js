import React,{ useState, useEffect } from 'react'
import axios from 'axios'
import Loading from '../Loading/loading'
import {Card,CardHeader,CardContent,Typography,Avatar,Tooltip,Dialog,DialogTitle,DialogContent,TextField} from '@mui/material'
import { Check, Close } from '@mui/icons-material';

function stringToColor(string) {
  let hash = 0;
  let i;

  /* eslint-disable no-bitwise */
  for (i = 0; i < string.length; i += 1) {
    hash = string.charCodeAt(i) + ((hash << 5) - hash);
  }

  let color = '#';

  for (i = 0; i < 3; i += 1) {
    const value = (hash >> (i * 8)) & 0xff;
    color += `00${value.toString(16)}`.slice(-2);
  }
  /* eslint-enable no-bitwise */

  return color;
}

function stringAvatar(name) {
  return {
    sx: {
      bgcolor: stringToColor(name),
    },
    children: name[0].toUpperCase(),
  };
}

function Histories(props) {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [open,setOpen] = useState(false);
    const [user, setUser] = useState({});
    const handleDialog = (person) => {
        setOpen(true);
        setUser(person);
    }
    const fetchHistories = async () => {
        setLoading(true);
        const res = await axios.get('http://localhost:5000/history');
        setData(res.data);
        setLoading(false);
    }
    useEffect(() => {
        fetchHistories();    
    },[])
    if(loading){
        return(
            <Loading/>
        )
    }
  return (
    <div style={props.style}>
        <div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fill, 350px)',justifyContent:'space-around',gridRowGap:'2rem'}}>{data.map((item) =>{
        return(
            <Card sx={{ gridRow: item.action === 'Update' ? 'span 2':'span 1',backgroundColor:'#2C343A'}}>
                <CardHeader
                    avatar={
                        item.user && <Tooltip title={item.user.username}><Avatar {...stringAvatar(item.user.username)} onClick={()=>handleDialog(item.user)}/></Tooltip>
                    }
                    title={
                        item.action
                    }
                    subheader={
                        new Date(item.date).toDateString()
                    }
                />
                <CardContent>
                    {
                        (item.action === 'Create' && (
                            // eslint-disable-next-line
                            Object.entries(item.data).map(([key,value]) =>{
                                if(key !== 'version' && key !== '_id' && key !== '__v'){
                                    return (<Typography variant="h5" component="p">
                                        <span style={{color: '#3CB371'}}>{key.split('_').join(' ')}</span>: <span>{value}</span>
                                    </Typography>)
                                }
                            })
                        )) ||
                        (item.action === 'Update' && (
                            <>
                                <Typography variant="h5" sx={{marginBlockEnd:'1rem'}}>
                                    Old Record
                                    <div style={{marginTop:'1rem'}}>
                                        {
                                        // eslint-disable-next-line
                                        Object.entries(item.data.prevPlan).map(([key,value]) =>{
                                            if(key !== 'version' && key !== '_id' && key !== '__v'){
                                                return (<Typography variant="h5" component="p" sx={{marginLeft:'2rem'}}>
                                                    <span style={{color: '#3CB371'}}>{key.split('_').join(' ')}</span>: <span>{value}</span>
                                                </Typography>)
                                            }
                                        })}
                                    </div>
                                </Typography>
                                <Typography variant="h5">
                                    New Record
                                    <div style={{marginTop:'1rem'}}>
                                        {
                                        // eslint-disable-next-line
                                        Object.entries(item.data.currentPlan).map(([key,value]) =>{
                                            if(key !== 'version' && key !== '_id' && key !== '__v'){
                                                return (<Typography variant="h5" component="p" sx={{marginLeft:'2rem'}}>
                                                    <span style={{color: '#3CB371'}}>{key.split('_').join(' ')}</span>: <span>{value}</span>
                                                </Typography>)
                                            }
                                        })}
                                    </div>
                                </Typography>
                            </>
                        )) ||
                        (item.action === 'Delete' && (
                            // eslint-disable-next-line
                            Object.entries(item.data).map(([key,value]) =>{
                                if(key !== 'version' && key !== '_id' && key !== '__v'){
                                    return (<Typography variant="h5" component="p">
                                        <span style={{color: '#3CB371'}}>{key.split('_').join(' ')}</span>: <span>{value}</span>
                                    </Typography>)
                                }
                            })
                        ))
                    }
                </CardContent>
            </Card>
        )
    })}
    <Dialog
        open={open}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        onClose={()=>{setOpen(false)}}
        fullWidth
    >
        <DialogTitle>User Info</DialogTitle>
        <DialogContent style={{paddingInline: '1.5rem',height: '250px'}}>
            <TextField
              autoFocus
              InputProps={{
                readOnly: true,
              }}
              margin="dense"
              id="name"
              label="Id"
              type="text"
              fullWidth
              variant="standard"
              value={user && user._id}
            />
            <TextField
              autoFocus
              InputProps={{
                readOnly: true,
              }}
              margin="dense"
              id="name"
              label="Username"
              type="text"
              fullWidth
              variant="standard"
              value={user && user.username}
            />
            <TextField
              autoFocus
              InputProps={{
                  readOnly: true,
              }}
              margin="dense"
              id="name"
              label="Email"
              type="text"
              fullWidth
              variant="standard"
              value={user && user.email}
            />
            <Typography variant="p" component="p" sx={{color:'rgba(255, 255, 255, 0.7)',fontWeight:'400',marginBlock:'.5rem'}}>
                Admin
            </Typography>
            {user.isAdmin ? <Check color='success' /> : <Close color='error'/>}
        </DialogContent>
    </Dialog>
    </div>
    </div>
  )
}

export default Histories