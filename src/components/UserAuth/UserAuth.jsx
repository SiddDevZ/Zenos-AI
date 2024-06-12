import React from 'react'
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const UserAuth = () => {

    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('token');
    
        if (!token) {
          navigate('/sign-in');
        } else {
          const validateToken = async () => {
            try {
              const result = await axios.post(`${config.url}/userauth`, { token });
              if (result.data === 'notfound'){
                localStorage.removeItem('token');
                console.log('Token removed from local storage');
                navigate('/sign-in');
              } else {
                navigate('/chat');
              }
            } catch (error) {
              console.log(error);
              // Handle token validation error here
            }
          };
    
          validateToken();
        }
      }, [navigate]);


    return null;
}

export default UserAuth
