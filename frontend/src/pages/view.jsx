import axios from "axios";
import React, { useEffect, useState } from "react";
import TopBar from "../TopBar";


function ViewImages() {
    const [images, setImages] = useState([]);

    useEffect(() => {
        const fetchImages = async () => {
            try {
                const token = localStorage.getItem('token');
                const response = await axios.get('/api/v1/images/userProfile', {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                    },
                });
                console.log('api response:', response.data);

                setImages(response.data.Images);
            } catch (error) {
                console.log('error:', error);
            }
        };
        fetchImages();
    }, []);

    return (<>
        <head>

        </head>
        <TopBar></TopBar>

        <div className='background'>
            <div>
                {images.map((image, index) => {
                    const filename = image.replace(/^uploads[\\/]/, '');
                    console.log(filename);
                    
                    return (
                    <img 
                    key={index} 
                    src={`http://localhost:3000/uploads/${filename}`} 
                    alt={`User Image ${index}`}
                />
                );
            })};
            </div>
        </div>
    </>)
}

export default ViewImages;