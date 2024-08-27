import axios from "axios";
import React, { useEffect, useState } from "react";
import TopBar from "../TopBar";
import { Link } from 'react-router-dom'

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
            <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@48,700,0,0" />
        </head>
        <TopBar></TopBar>

        <div className='background'>
            <div className="back">
                <Link to="/homepage">
                    <svg xmlns="http://www.w3.org/2000/svg" height="48px" viewBox="0 -960 960 960" width="48px" fill="#000000"><path d="m297.18-440.39 238.95 238.96L480-145.87 145.87-480 480-814.7l56.13 56.13-238.95 238.96H814.7v79.22H297.18Z" /></svg>
                </Link>
            </div>
            <div className="imageList">
                {images.map((image, index) => {
                    const filename = image.replace(/^uploads[\\/]/, '');
                    const imageURL = `http://localhost:3000/uploads/${filename}`;
                    console.log(filename);

                    return (<div>
                        <img
                            key={index}
                            src={`http://localhost:3000/uploads/${filename}`}
                            alt={`User Image ${index}`}
                            style={{ width: '200px', height: 'auto', maxWidth: '100%' }}
                        />
                        <div>
                        </div>
                    </div>);
                })};
            </div>
        </div>
    </>)
}

export default ViewImages;