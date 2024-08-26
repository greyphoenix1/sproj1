import axios from 'axios';
import TopBar from '../TopBar';

function UploadPage () {

    const handleUpload = async (event) => {
        const file = event.target.files[0];
        const formData = new FormData();
        formData.append('Image', file);

        await axios.post('/api/v1/images/upload', formData, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
        });
    };


    return( <>
    <head>

    </head>


    <TopBar></TopBar>

    <div className='container'>
        <input type='file' onChange={handleUpload} />
    </div>

    </>)
}

export default UploadPage;