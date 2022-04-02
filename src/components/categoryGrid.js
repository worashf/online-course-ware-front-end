import React,{useState,useEffect} from 'react';
import { Table,Modal,Button,Input} from 'antd';
import { useDispatch,useSelector } from 'react-redux';
import {EditOutlined,DeleteOutlined, PlusCircleOutlined } from "@ant-design/icons"
import { addCategory, deleteCategory, listCategories } from '../redux/actions/categoryActions';

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

const CategoryGrid = () => {
 
    const [isAdd, setIsAdd] = useState(false);
    const [isEdit,setIsEdit] =useState(false);
    const [category, setCategory]  =useState(null);
    
   

    const categories = useSelector(state => state.categories);
   
    const dispatch = useDispatch();




    const CategoryColumns = [
        {
            key: 1,
            title: "Category Id",
            dataIndex: "categoryId",

        },
        {
            key: 2,
            title: "Category Name",
            dataIndex: "categoryName",

        },
        {
            key: 3,
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
     dispatch(listCategories())
 },[dispatch])

    const handleAdd =() =>{
        setIsAdd(true);
    }
    const resetAdd =() =>{
        setIsAdd(false);
        setCategory(null)
    }
    const handleEdit =(category)=>{

    }
    const handleDelete=(category) =>{
        Modal.confirm({
            title: "Are you sure to delete this category",
            okText: "Yes",
            okType: "danger",
            onOk: () => {
                dispatch(deleteCategory(category));

            }
        })
    }

    const renderAddCategory =() =>{
        return (
        
 <>
            <Modal
              title= "Create Category"
              visible={isAdd}
              okText="Save"
              onCancel={resetAdd}
              onOk={() => {
                  dispatch(addCategory(category))
                 
                  resetAdd();
               }}
            >
              <label style={{ fontWeight: 400, color: "blue", marginBottom: 10}}>
               
                Course Category  Name
              </label>
    
              <Input placeholder='Enter Category Name'
                style={{ marginTop: 10,padding: 10}}
                value={category?.categoryName}
                allowClear
                onChange={(e) => {
                  setCategory((pre) => {
                   return { ...pre, categoryName: e.target.value };
                  });
                }}
              />
             
             
             
         </Modal>
  
          </>

            
        )
    }


    return(
        <>

          <Button onClick={handleAdd} icon={<PlusCircleOutlined  style={{ color: "#fff" }} />} size="large"  style={new_button}> New Category </Button>
               
            
             <Table
                dataSource={categories}
                columns={CategoryColumns}
                bordered="true"
            >

            </Table>
            {isAdd && renderAddCategory()}

       </>
    )
}
 

export default  CategoryGrid;

