import axios from 'axios';
import { useState, useEffect } from 'react';
import NavbarComponent from './NavbarComponent';
import { useParams } from 'react-router-dom';
import parse from 'html-react-parser';

const SingleComponent = () => {
    const { slug } = useParams();
    const [blog,setBlog] = useState({})

    useEffect(() => {
        axios
        .get(`${process.env.REACT_APP_API}/blog/${slug}`)
        .then(response=>{
            setBlog(response.data)
        })
        .catch(err => alert(err))
        // eslint-disable-next-line
    },[])

    return(
        <div className='container p-5'>
            <NavbarComponent/>
            {blog.title && (
              <>
                <h1>{blog.title}</h1>
                <div className='pt-3'>{parse(blog.content)}</div>
                <p className="text-muted"> ผู้เขียน : {blog.author} , เผยแพร์ : {new Date(blog.createdAt).toLocaleString()}</p>
              </>
            )}
        </div>
    )
}

export default SingleComponent;
