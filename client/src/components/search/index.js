import React from 'react'
import {TextField} from '@mui/material'

function Index(props) {
    const handleChange = (e) => {
        if(e.target.value!==''){
            props.setSearch(true);
            props.setFiltredData(props.data.filter((item)=>{
                return Object.keys(item).some((key)=>{
                    return(item[key].toString().toLowerCase().includes(e.target.value.toString().toLowerCase()))
                })
        }))
        }else{
            props.setSearch(false);
        }
    }
  return (
    <TextField
        id="search"
        label="Search"
        type="search"
        margin="normal"
        variant="outlined"
        style={props.style}
        onChange={handleChange}
    />
  )
}

export default Index