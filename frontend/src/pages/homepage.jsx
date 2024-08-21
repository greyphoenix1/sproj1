import axios from "axios";
import TopBar from "../TopBar";

function HomePage() {

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
        <div className="homepage-container">
            <div className="upload-button">
                <h3>Upload images</h3>
        </div>
        <div className="view-button">
            <h3>View images</h3>
        </div>
        <div className="conn-button">
            <h3>Connect and Receive</h3>
        </div>
    </div >

</>
)
}

export default HomePage;