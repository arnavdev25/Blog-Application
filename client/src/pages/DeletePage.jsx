import axios from 'axios';
import React, { useEffect } from 'react';
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css
import { useNavigate, useParams } from 'react-router-dom';

const DeletePage = () => {
    const params = useParams();
    const navigate = useNavigate();
    const id = params.id;
    useEffect(()=>{
        confirmBox();
    },[])
    const confirmBox = ()=>{
        confirmAlert({
            title: 'Confirm to delete',
            message: 'Are you sure to do this.',
            buttons: [
              {
                label: 'Yes',
                onClick: () => dlt()
              },
              {
                label: 'No',
                onClick: () => navigate(`/blogs/${id}`)
              }
            ]
          });
          const dlt = ()=>{
            axios.put(`http://localhost:8080/blogs/delete/${id}`);
            navigate("/blogs")
          }
    }
  return (
    <div>
      
    </div>
  )
}

export default DeletePage
