import axios from "axios";
import React, {useEffect, useState} from "react";
import TopBar from "../TopBar";


function ViewImages() {
    const [images, setImages] = useState([]);

    useEffect(() => {
        const fetchImages = async () => {
            const response = await axios.get('/api/v1/images/upload', {
                headers: {
                    Autherization: `Bearer ${localStorage.getItem('token')}`,
                },
            });
        setImages(response.data);
    };
    fetchImages();
}, {});

return(<>
    <head>

    </head>
    <TopBar></TopBar>

    <div className="container">
        <div>
            {images.map((image,index) => (
                <img key={index} src={`http://localhost:3000/${image}`} alt={`User Image ${index}`} />
            ))};
        </div>
    </div>
</>)
}

export default ViewImages;