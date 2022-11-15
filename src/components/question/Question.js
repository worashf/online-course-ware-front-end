import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';

import {
    Table, Modal, Button, Upload, message,
    Input, Select,
} from 'antd';
import axios from 'axios';
import {
    EditOutlined, UploadOutlined,
    DownCircleOutlined, FolderAddOutlined,
    UpCircleOutlined, DeleteOutlined, DownOutlined, PlusCircleOutlined
} from "@ant-design/icons"
import { tuple } from 'antd/lib/_util/type';



const Question = () => {
    const [courses, setCourses] = useState([]);
    const [questionCategories, setQuestionCategories] = useState([])
    const [questionCategory, setQuestionCategory] = useState(null)
    const [isAddquestionCategory, setIsAddquestionCategory] = useState(false);
    const [courseId, setCourseId] = useState("");
    const [hideQuestionCategory, setHideQuestionCategory] = useState(false)
    const [chooseQuestion, setChooseQuestion] = useState(null);
    const [trueFalseQuestion, setTrueFalseQuestion] = useState(null);
    const [blankQuestion, setBlankQuestion] = useState(null);
    const [addChosseQuestion, setAddChooseQuestion] = useState(false);
    const [addTrueFasleQuestion, setAddTrueFalseQuestion] = useState(false);
    const [addBlankQuestion, setAddBlankQuestion] = useState(false)
    const [questionCategoryId,setQuestionCategoryId]= useState("")
    const [showQuestion, setShowQuestion] =useState(false);
    const [chooseQuestions,setChooseQuestions]=useState([]);
    const [blankQuestions,setBlankQuestions]=useState([]);
    const [tfQuestions,setTfQuestions]=useState([]);


    const currentUser = useSelector(state => state.users.currentUser)

    const { userName } = currentUser
    const { role } = currentUser
    const token = localStorage.getItem("token")


    useEffect(() => {
        handleSelectApproved();
    }, [])



    const handleSelectApproved = async () => {

        if (role === "Teacher") {
            const response = await axios.get(`http://localhost:8080/api/your/courses/${userName}`,
                { headers: { "Authorization": `Bearer ${token}` } });
            setCourses(response.data)
        }
        if (role === "Student") {
            const response = await axios.get(`http://localhost:8080/api/courses/student/${userName}`,
                { headers: { "Authorization": `Bearer ${token}` } });
            setCourses(response.data)
        }

    }

    const handleAddQuestionCategory = async () => {
        const response = await axios.post(`http://localhost:8080/api/question-categories/${courseId}`, questionCategory
            , { headers: { "Authorization": `Bearer ${token}` } });
        if (response.data.questionCategoryId) {
            message.success("Question Category", 1)
        }
    }

    const openAddQuestionCategory = (course) => {
        const { courseId } = course;
        setCourseId(courseId)
        setIsAddquestionCategory(true);
    }
    const resetOpenQuestionCategory = () => {
        setIsAddquestionCategory(false);
        setQuestionCategory(null);

    }

    const showQuestionCategories = async (course) => {
        const { courseId } = course;
        setHideQuestionCategory(true)
        const response = await axios.get(`http://localhost:8080/api/question-categories/${courseId}`)
        setQuestionCategories(response.data)

    }

    const handleAddChooseQuestion = (questionCategory) => {
        const {questionCategoryId} =questionCategory;
       setQuestionCategoryId(questionCategoryId);
        setAddChooseQuestion(true);


    }
    const handeAddBlankQuestion = (questionCategory) => {
        const {questionCategoryId} =questionCategory;
        setQuestionCategoryId(questionCategoryId);
        setAddBlankQuestion(true)
    }
    const handeAddTrueFalseQuestion = (questionCategory) => {
        const {questionCategoryId} =questionCategory;
        setQuestionCategoryId(questionCategoryId);
        setAddTrueFalseQuestion(true)
    }

    const resetAddChooseQuestion = () => {
        setAddChooseQuestion(false);
        setChooseQuestion(null)
    }
    const resetAddTrueFalseQuestion = () => {
        setAddTrueFalseQuestion(false);
        setTrueFalseQuestion(null)
    }

    const resetAddBlankQuestion = () => {
        setAddBlankQuestion(false);
        setBlankQuestion(null)
    }

    const createChooseQUestion = async () => {
        
        const response = await axios.post(`http://localhost:8080/api/choose-question/${questionCategoryId}`, chooseQuestion
            , { headers: { "Authorization": `Bearer ${token}` } });
        if (response.data) {
            message.success("Added choose question succesfuly", 1)
        }
    }
    const createBlankQUestion = async () => {
        const response = await axios.post(`http://localhost:8080/api/blank-question/${questionCategoryId}`, blankQuestion
            , { headers: { "Authorization": `Bearer ${token}` } });
        if (response.data) {
            message.success("Added blank question succesfuly", 1)
        }
    }
    const createTrueFalseQUestion = async () => {
        const response = await axios.post(`http://localhost:8080/api/tf-question/${questionCategoryId}`, trueFalseQuestion
            , { headers: { "Authorization": `Bearer ${token}` } });
        if (response.data) {
            message.success("Added True/false question succesfuly", 1)
        }
    }
   
    const  handleShowQuestions = async(questionCategory)=>{
        const { questionCategoryId } = questionCategory;
             setShowQuestion(true)
        const choose = await axios.get(`http://localhost:8080/api/choose-question/${questionCategoryId}`)
        setChooseQuestions(choose.data)
        const blank = await axios.get(`http://localhost:8080/api/blank-question/${questionCategoryId}`)
        setBlankQuestions(blank.data)
        const response = await axios.get(`http://localhost:8080/api/tf-question/${questionCategoryId}`)
        setTfQuestions(response.data)
    }

        const hideShowQuestions =()=>{
            setShowQuestion(false);
            setChooseQuestions([]);
            setBlankQuestions([]);
            setTfQuestions([]);
    }

    const CourseColumns = [
        {
            key: 1,
            title: "Course Id",
            dataIndex: "courseId",

        },
        {
            key: 2,
            title: "Course Name",
            dataIndex: "courseName",

        },
        {
            key: 3,
            title: "Actions",
            render: (record) => {
                return (
                    <>
                        {role === "Teacher" ?
                            (<>
                                <Button onClick={() => openAddQuestionCategory(record)} icon={< PlusCircleOutlined />} style={{ color: "blue", marginLeft: 10, fontSize: 15 }}>Add questions title </Button>
                                <Button onClick={() => showQuestionCategories(record)} icon={<  DownCircleOutlined />} style={{ color: "blue", marginLeft: 10, fontSize: 15 }}> Show Question Categories  </Button>
                                <Button onClick={() => setHideQuestionCategory(false)} icon={<  DownCircleOutlined />} style={{ color: "blue", marginLeft: 10, fontSize: 15 }}> Hide Question Categories  </Button>

                            </>
                            ) : <>  <Button icon={<UpCircleOutlined />} style={{ color: "blue", marginLeft: 10, fontSize: 15 }}>Show</Button> </>

                        }
                    </>
                )
            }

        }

    ]

    const QuestionCategoriesColumns = [
        {
            key: 1,
            width: '10%',
            title: "Question Category Id",
            dataIndex: "questionCategoryId",

        },
        {
            key: 2,
            width: '15%',
            title: "Question Category Title",
            dataIndex: "questionCategoryName",

        },
        {
            key: 3,
            width: '50%',
            title: "Actions",
            render: (record) => {
                return (
                    <>
                        {role === "Teacher" ?
                            (<>
                                <Button onClick={() => handleAddChooseQuestion(record)} icon={< PlusCircleOutlined  style={{color:"#0f03fc"}}/>} style={{ color: "blue", marginLeft: 10, fontSize: 15 }}>add choose  </Button>
                                <Button onClick={() => handeAddBlankQuestion(record)} icon={<  PlusCircleOutlined />} style={{ color: "#0f03fc", marginLeft: 10, fontSize: 15 }}> add blank   </Button>
                                <Button onClick={() => handeAddTrueFalseQuestion(record)} icon={<  PlusCircleOutlined />} style={{ color: "#0f03fc", marginLeft: 10, fontSize: 15 }}> add true or false   </Button>
                                <Button onClick={() => handleShowQuestions(record)} icon={<  PlusCircleOutlined />} style={{ color: "#0f03fc", marginLeft: 10, fontSize: 15 }}> Show questions </Button>
                                <Button onClick={() => hideShowQuestions(record)} icon={<  PlusCircleOutlined />} style={{ color: "#0f03fc", marginLeft: 10, fontSize: 15 }}> Hide Questions  </Button>
                            </>
                            ) : <>  <Button icon={<UpCircleOutlined />} style={{ color: "blue", marginLeft: 10, fontSize: 15 }}>Show</Button> </>

                        }
                    </>
                )
            }

        }
    ]


    const ChooseQuestionColumns = [
        {
            key: 1,
            title: "Question Id",
            dataIndex: "chooseQuestionId",

        },
        {
            key: 2,
            title: "Question  title",
            dataIndex: "questionName",

        },
        {
            key: 3,
            title: "Actions",
            render: (record) => {
                return (
                    <>
                        {role === "Teacher" ?
                            (<>
                                <Button onClick={() => openAddQuestionCategory(record)} icon={< PlusCircleOutlined />} style={{ color: "blue", marginLeft: 10, fontSize: 15 }}>Add questions title </Button>
                                <Button onClick={() => showQuestionCategories(record)} icon={<  DownCircleOutlined />} style={{ color: "blue", marginLeft: 10, fontSize: 15 }}> Show Question Categories  </Button>
                                <Button onClick={() => setHideQuestionCategory(false)} icon={<  DownCircleOutlined />} style={{ color: "blue", marginLeft: 10, fontSize: 15 }}> Hide Question Categories  </Button>

                            </>
                            ) : <>  <Button icon={<UpCircleOutlined />} style={{ color: "blue", marginLeft: 10, fontSize: 15 }}>Show</Button> </>

                        }
                    </>
                )
            }

        }

    ]

    const TrueFalseColumns = [
        {
            key: 1,
            title: "Question Id",
            dataIndex: "tfQuestionId",

        },
        {
            key: 2,
            title: "Question title",
            dataIndex: "questionName",

        },
      

    ]
    const BlankColumns = [
        {
            key: 1,
            title: "Question Id",
            dataIndex: "blankQuestionId",

        },
        {
            key: 2,
            title: "Question Title",
            dataIndex: "questionName",

        },
     

    ]



    const renderAddQuestionCategory = () => {
        return (

            <>
                <Modal
                    title="Create Question Category"
                    visible={isAddquestionCategory}
                    okText="Save"
                    onCancel={resetOpenQuestionCategory}
                    onOk={() => {

                        handleAddQuestionCategory();
                        resetOpenQuestionCategory();
                    }}
                >
                    <label style={{ fontWeight: 400, color: "blue", marginBottom: 10 }}>

                        Question Category Title
                    </label>

                    <Input placeholder='Enter Question Category Title'
                        style={{ marginTop: 10, padding: 10 }}
                        value={questionCategory?.questionCategoryName}
                        allowClear
                        onChange={(e) => {
                            setQuestionCategory((pre) => {
                                return { ...pre, questionCategoryName: e.target.value };
                            });
                        }}
                    />



                </Modal>

            </>


        )
    }


    const renderAddChooseQuestion = () => {
        return (

            <>
                <Modal
                    title="Add Choose Question"
                    visible={addChosseQuestion}
                    okText="Save"
                    onCancel={resetAddChooseQuestion}
                    onOk={() => {
               createChooseQUestion()
               resetAddChooseQuestion()

                    }}
                >
                    <label style={{ fontWeight: 400, color: "blue", marginBottom: 10 }}>

                        Question Title
                    </label>

                    <Input placeholder='Enter Question  Title'
                        style={{ marginTop: 10, padding: 10 }}
                        value={chooseQuestion?.questionName}
                        allowClear
                        onChange={(e) => {
                            setChooseQuestion((pre) => {
                                return { ...pre, questionName: e.target.value };
                            });
                        }}
                    />
                    <label style={{ fontWeight: 400, color: "blue", marginBottom: 10 }}>

                        Choose A
                    </label>

                    <Input placeholder='Enter choose A'
                        style={{ marginTop: 10, padding: 10 }}
                        value={chooseQuestion?.chooseA}
                        allowClear
                        onChange={(e) => {
                            setChooseQuestion((pre) => {
                                return { ...pre, chooseA: e.target.value };
                            });
                        }}
                    />
                    <label style={{ fontWeight: 400, color: "blue", marginBottom: 10 }}>

                        Choose B
                    </label>

                    <Input placeholder='Enter  choose B'
                        style={{ marginTop: 10, padding: 10 }}
                        value={chooseQuestion?.chooseB}
                        allowClear
                        onChange={(e) => {
                            setChooseQuestion((pre) => {
                                return { ...pre, chooseB: e.target.value };
                            });
                        }}
                    />
                    <label style={{ fontWeight: 400, color: "blue", marginBottom: 10 }}>

                        Choose C
                    </label>

                    <Input placeholder='Enter choose C'
                        style={{ marginTop: 10, padding: 10 }}
                        value={chooseQuestion?.chooseC}
                        allowClear
                        onChange={(e) => {
                            setChooseQuestion((pre) => {
                                return { ...pre, chooseC: e.target.value };
                            });
                        }}
                    />
                    <label style={{ fontWeight: 400, color: "blue", marginBottom: 10 }}>

                        Choose D
                    </label>

                    <Input placeholder='Enter choose D'
                        style={{ marginTop: 10, padding: 10 }}
                        value={chooseQuestion?.chooseD}
                        allowClear
                        onChange={(e) => {
                            setChooseQuestion((pre) => {
                                return { ...pre, chooseD: e.target.value };
                            });
                        }}
                    />

                </Modal>

            </>


        )
    }


    const renderAddTrueFalseQuestion = () => {
        return (

            <>
                <Modal
                    title="Create True/False Question"
                    visible={addTrueFasleQuestion}
                    okText="Save"
                    onCancel={resetAddTrueFalseQuestion}
                    onOk={() => {

                      
                       resetAddTrueFalseQuestion()
                    }}
                >
                    <label style={{ fontWeight: 400, color: "blue", marginBottom: 10 }}>

                       True / False Question  Title
                    </label>

                    <Input placeholder='Enter True/ False Question Title'
                        style={{ marginTop: 10, padding: 10 }}
                        value={questionCategory?.questionName}
                        allowClear
                        onChange={(e) => {
                            setTrueFalseQuestion((pre) => {
                                return { ...pre, questionName: e.target.value };
                            });
                        }}
                    />



                </Modal>

            </>


        )
    }


    const renderAddBlankQuestion = () => {
        return (

            <>
                <Modal
                    title="Create Blank Question"
                    visible={addBlankQuestion}
                    okText="Save"
                    onCancel={resetAddBlankQuestion}
                    onOk={() => {

                       createBlankQUestion();
                       resetAddBlankQuestion();
                    }}
                >
                    <label style={{ fontWeight: 400, color: "blue", marginBottom: 10 }}>

                        Question Category Title
                    </label>

                    <Input placeholder='Enter Blank Question Title'
                        style={{ marginTop: 10, padding: 10 }}
                        value={blankQuestion?.questionName}
                        allowClear
                        onChange={(e) => {
                            setBlankQuestion((pre) => {
                                return { ...pre, questionName: e.target.value };
                            });
                        }}
                    />



                </Modal>

            </>


        )
    }


    return (
        <>

            <Table style={{ marginTop: 50 }}
                dataSource={courses}
                columns={CourseColumns}
                bordered="true"
            >

            </Table>

            {
                isAddquestionCategory && renderAddQuestionCategory()
            }
            {
                hideQuestionCategory && (
                  <div>
                          <p style={{color:"white", backgroundColor:"#041382",
    padding:"20px",width:"100%",textAlign:'center',fontSize:"25px"}}>Question Categories</p>
           <Table style={{ marginTop: 50 }}
                        dataSource={questionCategories}
                        columns={QuestionCategoriesColumns}
                        bordered="true"
                    >

                    </Table>
                  </div>
          
                )
            }
            {
                addChosseQuestion && renderAddChooseQuestion()
            }
   {
   addBlankQuestion && renderAddBlankQuestion ()
   }
   {
       addTrueFasleQuestion && renderAddTrueFalseQuestion ()
   }
      {
   showQuestion && (
       <div>
    
    <p style={{color:"white", backgroundColor:"#041382",
    padding:"20px",width:"100%",textAlign:'center',fontSize:"25px"}}>Choose Questions</p>
      
       <div>
        {
     
       chooseQuestions.map((e,i) => {
        return (
            <div key={e.chooseQuestionId} style={{display:'flex',flexDirection:"column"}}>
              <div style={{display:'flex'}}>
              <h2 style={{padding:"0 20px"}}> {++i}</h2>
              <h2 style={{color:"blue"}}> {e.questionName}</h2>
                  </div>  
              <div style={{display:"flex",}}>
              <h2 style={{padding:"0 20px"}}> <span style={{color:"blue", padding:"5px",marginRight:"10px", borderRadius:"10px",
              border :"1px solid black"}}>A</span> {e.chooseA}</h2>
              <h2 style={{padding:"0 20px"}}><span style={{color:"blue", padding:"5px",marginRight:"10px", borderRadius:"10px",
              border :"1px solid black"}}>B</span> {e.chooseB}</h2>
              </div>
              <div style={{display:"flex"}}>
             <h2 style={{padding:"0 20px"}}> <span style={{color:"blue", padding:"5px",marginRight:"10px", borderRadius:"10px",
              border :"1px solid black"}}>C</span>  {e.chooseC}</h2>
              <h2 style={{padding:"0 30px"}}> <span style={{color:"blue", padding:"5px",marginRight:"10px",borderRadius:"10px",
              border :"1px solid black"}}>D</span>  {e.chooseD}</h2>
              </div>
    
              
         
            </div>
          )
        })
    }
       </div>
       <div>
               
    <p style={{color:"white", backgroundColor:"#041382",
    padding:"20px",width:"100%",textAlign:'center',fontSize:"25px"}}>Discussion Questions</p>
      
               <Table style={{ marginTop: 50 }}
        dataSource={blankQuestions}
        columns={BlankColumns}
        bordered="true"
    >

    </Table>
       </div>
       <div>
          
    <p style={{color:"white", backgroundColor:"#041382",
    padding:"20px",width:"100%",textAlign:'center',fontSize:"25px"}}>True False Questions</p>
      
    
           <Table style={{ marginTop: 50 }}
           dataSource={tfQuestions}
           columns={TrueFalseColumns}
           bordered="true"
       >
   
       </Table>
       
            
       </div>
       </div>
       


)
   }

        </>
    )
}
export default Question;