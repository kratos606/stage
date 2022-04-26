import React,{useState,useContext} from 'react'
import {Button,Box, TextField, Typography,Avatar,Alert} from '@mui/material'
import UserContext from '../hooks/userContext'
import PersonIcon from '@mui/icons-material/Person'
import { Loading } from '../components'
import { Navigate, useNavigate } from 'react-router-dom'
import axios from 'axios'

function Login() {
    const [inputs,setInputs] = useState({});
    const [error,setError] = useState(null);
    const {user,getUser,isLoading} = useContext(UserContext);
    const navigate = useNavigate();
    const login = async(e) => {
        e.preventDefault();
        try{
            let res = await axios.post('http://localhost:5000/auth/login', 
            {
                email: inputs.email, 
                password: inputs.password
            });
            if(res.data.error){
                return setError(res.data.error);
            }
            await getUser();
            navigate('/');
        }catch(err) {
            console.log(err);
        }  
    }
    if(isLoading){
        return <Loading />
    }
    if(user){
        return <Navigate to='/' replace/>
    }
    return (
        <Box sx={{width: '100%', height:'100vh',display: 'flex',alignItems: 'center',justifyContent: 'center'}}>
            <Box className="login-form" 
                sx={{
                    width:'min(100%,500px)',
                    height:'max-content',  
                    backgroundColor:'#2C343A',
                    display:'flex',
                    flexDirection:'column',
                    alignItems:'center',
                    padding: '2rem',
                    }}
                >
                <Avatar sx={{ bgcolor: '#3CB371',width:'100px',height:'100px',marginTop: '-75px'}}>
                    <PersonIcon sx={{color:'#22272B',width:'80px',height:'80px'}}/>
                </Avatar>
                <Typography variant="h3" sx={{marginBlock:'20px'}}>
                    Login
                </Typography>
                {error && <Alert severity="error">{error}</Alert>}
                <form onSubmit={login}>
                    <TextField
                        variant="outlined"
                        label="E-mail"
                        type={'email'}
                        value={inputs.email || ''}
                        onChange={(e) => setInputs({...inputs,email:e.target.value})}
                        sx={{marginBlock:'20px'}}
                        fullWidth
                    />
                    <TextField
                        variant="outlined"
                        label="Password"
                        value={inputs.password || ''}
                        onChange={(e) => setInputs({...inputs,password:e.target.value})}
                        type={'password'}
                        fullWidth
                    />
                    <Button variant="contained" color="primary" sx={{marginBlockStart:'3rem',marginBlockEnd:'2rem',paddingBlock:'.5rem'}} fullWidth type='submit'>
                        Login
                    </Button>
                </form>
            </Box>
        </Box>
    )
}

export default Login