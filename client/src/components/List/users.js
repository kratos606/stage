import React,{useState,useEffect} from 'react'
import axios from 'axios';
import { DataGrid } from '@mui/x-data-grid'
import Loading from '../Loading/loading';
import { Check, Close } from '@mui/icons-material';
import DeleteIcon from '@mui/icons-material/Delete'
import EditIcon from '@mui/icons-material/Edit'
import './users.css'
import UpdateUser from '../update/user';
import Delete from '../delete/user';
import Search from '../search';
import Create from '../create/user';

function Users(props) {
  const [data,setData] = useState([]);
  const [selected,setSelected] = useState();
  const [update,setUpdate] = useState(false);
  const [remove,setRemove] = useState(false);
  const [search,setSearch] = useState(false);
  const [filtredData,setFiltredData] = useState([]);
  const [isLoading,setLoading] = useState(false);
  const fetchUsers = async () => {
    setLoading(true);
    await axios.get('http://localhost:5000/user')
    .then(res => {
      setData(res.data);
      setLoading(false);
    }).catch(err => {
      setLoading(false);
    }); 
  }
  const handleAction = (action,data) => {
    if(action === 'delete'){
      setSelected(data);
      setRemove(true);
    }
    if(action === 'update'){
      setSelected(data);
      setUpdate(true);
    }
  }
  useEffect(() => {
    fetchUsers();
  }, []);
  if(isLoading) {
    return <Loading />;
  }
  return (
    <div style={props.style}>
      <div style={{width:'100%',display: 'flex',flexDirection: 'column',justifyItems:'center'}}>
        <Search setFiltredData={setFiltredData} data={data} setSearch={setSearch} />
        <Create />
      </div>
      <div style={{ display: 'flex' }}>
          <DataGrid
            autoHeight
            columns={[
              { field : "_id",headerName: 'id',flex: 1,minWidth:250,headerClassName:'table-header'},
              { field: 'username',flex: 1,minWidth:150,headerClassName:'table-header'},
              { field : "email",flex: 1,minWidth:200,headerClassName:'table-header'},
              { field : "isAdmin",headerName:'admin',flex: 1,minWidth:150,headerClassName:'table-header',
                renderCell: (params) => {
                  return (
                    <div>
                      {params.value ? <Check color='success' /> : <Close color='error'/>}
                    </div>
                  )
                }
              },
              {
                field: "action",flex: 1,minWidth:150,headerClassName:'table-header',sortable: false,filterable: false,hideable: false,
                renderCell: (params) => {
                  const handleClick = (action) => {
                    handleAction(action,params.row);
                  };
                  return <div className='table-action'>
                    <button style={{all:'unset'}} onClick={()=>handleClick('delete')}><DeleteIcon /></button>
                    <button style={{all:'unset'}} onClick={()=>handleClick('update')}><EditIcon /></button>
                  </div>;
                }
              },
            ]}
            rows={search ? filtredData : data}
            getRowId={row => row._id}
            getRowClassName={row => {
              return 'table-row';
            }}
            getCellClassName={(row, column) => {
              return 'table-cell';
            }}
          />
      </div>
      {selected && <UpdateUser user={selected} open={update} setOpen={setUpdate} />}
      {selected && <Delete open={remove} setOpen={setRemove} id={selected._id} />}
    </div>
  )
}

export default Users
