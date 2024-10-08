import { useState, useEffect } from 'react';
import NavbarComponent from "./NavbarComponent";
import axios from "axios";
import Swal from "sweetalert2";
import { useNavigate, useParams } from 'react-router-dom';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { getToken } from '../services/authorize';

const EditComponent=()=> {
    const { slug } = useParams();
    const [state,setState] = useState({
        title:"",
        author:"",
        slug:""
    })
    const {title,author} = state

    const [content,setContent] = useState('')

    const submitContent=(e)=> {
        setContent(e)
    }

    const navigate = useNavigate();
    
    const showUpdateForm = () => (
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
                    <ReactQuill 
                        value={content}
                        onChange={submitContent}
                        theme="snow"
                        className="pb-5 mb-3"
                        style={{border: '1px solid #666'}}
                    />
                </div>
                <div className="form-group">
                    <label>ผู้แต่ง</label>
                    <input type="text" className="form-control" 
                        value={author}
                        onChange={inputValue("author")}
                    />
                </div>
                <br />
                <input type="submit" value="อัพเดต" className="btn btn-primary"/>
            </form>
    )

    //ดึงข้อมูลบทความที่ต้องการแก้ไข
    useEffect(() => {
        axios
        .get(`${process.env.REACT_APP_API}/blog/${slug}`)
        .then(response=>{
            const {title,content,author,slug} = response.data
            setState({...state,title,author,slug})
            setContent(content)
        })
        .catch(err => alert(err))
        // eslint-disable-next-line
    },[])

    //กำหนดค่าให้กับ state
    const inputValue=name=>event=>{
        setState({...state,[name]:event.target.value});
    }
    // http://localhost:5500/api/blog/slug => put
    const submitForm=(e)=>{
        e.preventDefault();
     //console.table({title,content,author})
        console.log("API URL = ",process.env.REACT_APP_API)
        axios
        .put(`${process.env.REACT_APP_API}/blog/${slug}`,{title,content,author},
            {
                headers: {
                    authorization: `Bearer ${getToken()}`,
                },
            }
        )
        .then(response=>{
            Swal.fire({
                title: "แจ้งเตือน",
                text: "อัพเดตบทความเรียบร้อย",
                icon: "success"
            });
            const {title,content,author,slug} = response.data
            setState({...state,title,author,slug})
            setContent(content)
            navigate('/') // ใช้ navigate สำหรับการนำทาง
        })
        .catch(err=>{
            alert(err)
        })
    }
    return (
        <div className = "container p-5">
            <NavbarComponent />
            <h1>แก้ไขบทความ</h1>
            {showUpdateForm()}
        </div>
        );
      }

export default EditComponent;