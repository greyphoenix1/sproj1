import axios from "axios";
import TopBar from "../TopBar";

function ConnectionPage() {

    const token = localStorage.getItem('token');

    axios.get('http://localhost:3000/api/v1/auth/login', {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
    .then(response => {
        console.log(response.data);       
    }).catch(error => {
        console.log('Error:', error);
    })

    return (<>

        <TopBar></TopBar>
        <div className="connection-container">
            <div className="upload-button">
                <h3>Upload images</h3>
        </div>
        </div>
</>
)
}

export default ConnectionPage;