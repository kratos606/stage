import React,{useState,useEffect} from 'react'
import {DataGrid} from '@mui/x-data-grid';
import axios from 'axios';
import Loading from '../Loading/loading';
import DeleteIcon from '@mui/icons-material/Delete'
import EditIcon from '@mui/icons-material/Edit'
import {useNavigate} from 'react-router-dom';
import UpdatePlan from '../update/plan';
import Search from '../search';
import Create from '../create/plan';
import './plans.css';

function Plans(props) {
  const [data,setData] = useState([]);
  const [filtredData,setFiltredData] = useState([]);
  const [search,setSearch] = useState(false);
  const [update,setUpdate] = useState(false);
  const [selected,setSelected] = useState();
  const [loading,setLoading] = useState(false);
  const navigate = useNavigate();
  const handleAction = async(action,plan) => {
    if(action === 'delete'){
      await axios.delete(`http://localhost:5000/plan/${plan._id}`).then(res=>{
        window.localStorage.setItem('success',res.data.success);
        navigate(0);
      })
    }
    if(action === 'update'){
      setSelected(plan);
      setUpdate(true);
    }
  }
  const fetchPlans = async () => {
    setLoading(true);
    await axios.get('http://localhost:5000/plan')
    .then(res => {
      setData(res.data);
      setLoading(false);
    }).catch(err => {
      setLoading(false);
    }); 
  }
  useEffect(() => {
    fetchPlans();
  }, []);
  if(loading) {
    return <Loading/>
  }
  return (
    <div style={props.style}>
    <div style={{width:'100%',display: 'flex',flexDirection: 'column',justifyItems:'center'}}>
      <Search setFiltredData={setFiltredData} data={data} setSearch={setSearch} />
      <Create />
    </div>
    <DataGrid
          autoHeight
          columns={[
            { field : "_id",headerName: 'id',flex: 1,minWidth:100,headerClassName:'table-header'},
            { field: 'code_RLP',headerName:'cod RLP',flex: 1,minWidth:100,headerClassName:'table-header'},
            { field : "ordre_jour",headerName:'ordre jour',flex: 1,minWidth:100,headerClassName:'table-header'},
            { field : "ordre_lecture_paquet",headerName:'ordre lecture paquet',flex: 1,minWidth:200,headerClassName:'table-header'},
            { field : "tournée_debut",headerName:'tournée debut',flex: 1,minWidth:150,headerClassName:'table-header'},
            { field : "tournée_fin",headerName:'tournée fin',flex: 1,minWidth:150,headerClassName:'table-header'},
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
        {selected && <UpdatePlan plan={selected} open={update} setOpen={setUpdate} />}
    </div>
  )
}

export default Plans
