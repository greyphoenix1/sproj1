import axios from 'axios';
import TopBar from '../TopBar';
import { useState } from 'react';

function UploadPage () {
    const [status, setStatus] = useState('');
    const [file, setFile] = useState(null);

    const handleFileChange = (event) => {
        setFile(event.target.files[0]);
    }

    const handleUpload = async () => {
        if (!file) {
            setStatus('No file selected');
            return
        }
        const formData = new FormData();
        formData.append('Images', file);

        try {
            await axios.post('/api/v1/images/upload', formData, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`,
                    'Content-Type':  'multipart/form-data'
                },
            });
            setStatus('Uploaded');
        } catch (error) {
            setStatus('Upload failed');
        }

    };


    return( <>
    <head>

    </head>


    <TopBar></TopBar>

    <div className='background'>
        <input type='file' onChange={handleFileChange}/>
        <button onClick={handleUpload}>Upload Image</button>
        <h3>{status}</h3>
    </div>

    </>)
}

export default UploadPage;