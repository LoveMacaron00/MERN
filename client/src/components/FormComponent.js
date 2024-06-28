import { useState } from "react";
import NavbarComponent from "./NavbarComponent";
import axios from "axios";
import Swal from "sweetalert2";
import { useNavigate } from 'react-router-dom';

const FormComponent=()=> {
    const [state,setState] = useState({
        title:"",
        content:"",
        author:""
    })
    const {title,content,author} = state
    const navigate = useNavigate();
    //กำหนดค่าให้กับ state
    const inputValue=name=>event=>{
        //console.log(name,"=",event.target.value)
        setState({...state,[name]:event.target.value});
    }
    const submitForm=(e)=>{
        e.preventDefault();
        //console.table({title,content,author})
        console.log("API URL = ",process.env.REACT_APP_API)
        axios
        .post(`${process.env.REACT_APP_API}/create`,{title,content,author})
        .then(response=>{
            Swal.fire({
                title: "แจ้งเตือน",
                text: "บันทึกข้อมูลบทความเรียบร้อย",
                icon: "success"
            });
            setState({...state,title:"",content:"",author:""});
            navigate('/') // ใช้ navigate สำหรับการนำทาง
        })
        .catch(err=>{
            Swal.fire({
                title: "แจ้งเตือน",
                text: err.response.data.error,
                icon: "error"
            });
        })
    }
    return (
        <div className = "container p-5">
            <NavbarComponent />
            <h1>เขียนบทความ</h1>
            {/* {JSON.stringify(state)} */}
            <form onSubmit={submitForm}>
                <div className="form-group">
                    <label>ชื่อบทความ</label>
                    <input type="text" className="form-control" 
                        value={title} 
                        onChange={inputValue("title")}
                    />
                </div>
                <div className="form-group">
                    <label>รายละเอียด</label>
                    <textarea className="form-control" 
                        value={content}
                        onChange={inputValue("content")}
                    ></textarea>
                </div>
                <div className="form-group">
                    <label>ผู้แต่ง</label>
                    <input type="text" className="form-control" 
                        value={author}
                        onChange={inputValue("author")}
                    />
                </div>
                <br />
                <input type="submit" value="บันทึก" className="btn btn-primary"/>
            </form>
        </div>
        );
      }

export default FormComponent;