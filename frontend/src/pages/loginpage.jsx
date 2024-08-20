import axios from "axios";
import TopBar from "../TopBar";
import React, {useState} from "react";

function LoginPage () {

    const [name, setName] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async () => {
        try {
            const response = await axios.post('http://localhost:3000/api/v1/auth/login', {
                name,
                password
            });
            
            console.log("User logged in:", response.data);
            
        } catch (error) {
            console.log(error.response ? error.response : error.data);
        }
    }

    return(<>
    <head>
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@48,700,0,0" />

    </head>
    <TopBar></TopBar>

    <div className="login-container">
        <div className="back">
            <a href="/">
            <svg xmlns="http://www.w3.org/2000/svg" height="48px" viewBox="0 -960 960 960" width="48px" fill="#000000"><path d="m297.18-440.39 238.95 238.96L480-145.87 145.87-480 480-814.7l56.13 56.13-238.95 238.96H814.7v79.22H297.18Z" /></svg>
            </a>
        </div>
        <input placeholder="enter name" className="name" value={name} onChange={(e) => setName(e.target.value)}></input>
        <input placeholder="enter password" className="password" value={password} onChange={(e) => setPassword(e.target.value)}></input>
        <div className="reg-submit" onClick={handleLogin}>
            <h3>Submit</h3>
            </div>
    </div>

</>
)
}

export default LoginPage;