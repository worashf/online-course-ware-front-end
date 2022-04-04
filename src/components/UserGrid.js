import React,{useState,useEffect} from 'react';
import { Table,Modal,Button,Input} from 'antd';
import { useDispatch,useSelector } from 'react-redux';
import {EditOutlined,DeleteOutlined,
     PlusCircleOutlined ,DownCircleOutlined,UpCircleOutlined } from "@ant-design/icons"
import { addRole,listRoles,deleteRole,updateRole } from '../redux/actions/roleAction';
import { listUsers } from '../redux/actions/usersAction';

import './role.css'


const  new_button ={
     "background": "#1b418c",
    "color": "#fff",
    "height": "50px",
    "marginBottom": "20px",
    "borderRadius": "5px",
    "fontSize": "20px",
    "paddingBottom": "20px",
    "border": "1px solid #6e6859 ",
    "marginLeft": "300px",
  
}

const UserGrid = () => {
 
    const [isAdd, setIsAdd] = useState(false);
    const [isEdit,setIsEdit] =useState(false);
    const [showRole ,setShowRole] =useState(false)
    const [role, setRole]  =useState(null);
    
   
   const roles = useSelector(state =>state.roles)
   const users  = useSelector((state => state.users.users))
   
    const dispatch = useDispatch();




    const UserColumns = [
        {
            key: 1,
            title: "user Id",
            dataIndex: "userId",
            width:"5%"

        },

        {
            key: 2,
            title: "User Name",
            dataIndex: "userName",
            width:"10%"

        },
        {
            key: 3,
            title: "Status",
            dataIndex: "status",
            width:"10%"

        },
        {
            key: 4,
            title: "email",
            dataIndex: "email",

        },
        {
            key: 5,
            title: "Actions",
            render: (record) => {
                return (
                    <>
                    <Button  onClick={() =>{ handleEdit(record)}} icon={< EditOutlined/>}   style={{ color: "blue", marginLeft: 10, fontSize: 18 }}/>
                      <Button onClick={() =>{handleDelete(record)}} icon={<DeleteOutlined />}  style={{ color: "red", marginLeft: 10, fontSize: 18 }} />
                    </>
                )
            }

        }
    ]
    const roleColumns = [
        {
            key: 1,
            title: "Role Id",
            dataIndex: "roleId",

        },

        {
            key: 2,
            title: "Role Name",
            dataIndex: "roleName",

        },
       
        {
            key: 5,
            title: "Actions",
            render: (record) => {
                return (
                    <>
                    <Button  onClick={() =>{ handleEdit(record)}} icon={< EditOutlined/>}   style={{ color: "blue", marginLeft: 10, fontSize: 18 }}/>
                      <Button onClick={() =>{handleDelete(record)}} icon={<DeleteOutlined />}  style={{ color: "red", marginLeft: 10, fontSize: 18 }} />
                    </>
                )
            }

        }
    ]
 useEffect(()=>{
     dispatch(listRoles());
     dispatch(listUsers());
 },[dispatch])
 const handleShowRole =()=>{
     setShowRole(true)
 }
 const handleHideRole =()=>{
     setShowRole(false)
 }

    const handleAdd =() =>{
        setIsAdd(true);
    }
    const resetAdd =() =>{
        setIsAdd(false);
          setRole(null);
    }
    const handleEdit =(category)=>{

    }
    const handleDelete=(role) =>{
        Modal.confirm({
            title: "Are you sure to delete this role",
            okText: "Yes",
            okType: "danger",
            onOk: () => {
                dispatch(deleteRole(role))
             

            }
        })
    }

    const renderAddRole =() =>{
        return (
        
 <>
            <Modal
              title= "Create Course"
              visible={isAdd}
              okText="Save"
              onCancel={resetAdd}
              onOk={() => {
                   dispatch(addRole(role))
                  resetAdd();
               }}
            >
   



              <label style={{ fontWeight: 400, color: "blue", marginBottom: 10,display:"block"}}>
               
                Role Name
              </label>
    
              <Input placeholder='Enter Course Name'
                style={{ marginTop: 10,padding: 10}}
                value={role?.roleName}
                allowClear
                onChange={(e) => {
                  setRole((pre) => {
                   return { ...pre, roleName: e.target.value };
                  });
                }}
              />
            
    
             
         </Modal>
  
          </>

            
        )
    }


    return(
        <>

          <Button onClick={handleAdd} icon={<PlusCircleOutlined  style={{ color: "#fff" }} />} size="large"  style={new_button}> New Role </Button>
          <Button icon={<DownCircleOutlined style={{ color: "#fff" }} />} size="large"
           style={{marginLeft:30, background:"#1b418c",color:"#fff" }} onClick={handleShowRole}>Show Roles</Button>
                <Button icon={<UpCircleOutlined style={{ color: "#fff" }} />} size="large"
                style={{marginLeft:30, background:"#1b418c",color:"#fff"}} onClick={handleHideRole}>Hide Roles</Button>
                <div className={showRole ? "show-role" : "hide-role"}>  
          <Table
                dataSource={roles}
                columns={roleColumns}
                bordered="true"
            >
  </Table>
</div>
             <Table
                dataSource={users}
                columns={UserColumns}
                bordered="true"
            >

            </Table>
            {isAdd && renderAddRole()}
            

       </>
    )
}
 

export default  UserGrid;

