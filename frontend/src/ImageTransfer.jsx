import React, { useEffect, useRef, useState } from 'react';
import io from 'socket.io-client';
import TopBar from './TopBar'
import { Link } from 'react-router-dom';

const socket = io('http://localhost:3000');

function ImageTranfer() {
    const fileInputRef = useRef();
    const [status, setStatus] = useState('Connecting...');
    const [devices, setDevices] = useState([]);

    useEffect(() => {
        socket.on('status', (msg) => {
            setStatus(msg);
        });

        socket.on("devicesFound", (foundDevices) => {
            setDevices(foundDevices);
            setStatus('Select a device to connect');
        })

        socket.on('receiveImage', (data) => {
            const img = document.createElement('img');
            img.src = URL.createObjectURL(new Blob([data]));
            document.body.appendChild(img);
        });
    }, []);

    const handleSendImage = () => {
        const file = fileInputRef.current.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                const buffer = e.target.result;
                socket.emit('sendImage', buffer);
            };
            reader.readAsArrayBuffer(file);
        }
    }

    const handleConnectToDevice = (device) => {
        socket.emit('connectToDevice', device);
    }

    return (
        <>
            <head>
                <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@48,700,0,0" />

            </head>

            <TopBar />
            <div className='background'>
                <div className="back">
                    <Link to="/homepage">
                        <svg xmlns="http://www.w3.org/2000/svg" height="48px" viewBox="0 -960 960 960" width="48px" fill="#000000"><path d="m297.18-440.39 238.95 238.96L480-145.87 145.87-480 480-814.7l56.13 56.13-238.95 238.96H814.7v79.22H297.18Z" /></svg>
                    </Link>
                </div>

                <div className='status-container'>
                    <p>Status: {status}</p>
                    {devices.length > 0 && (
                        <ul>
                            {devices.map((device, index) => (
                                <li key={index} onClick={() => handleConnectToDevice(device)}>
                                    {device}
                                </li>
                            ))}
                        </ul>
                    )}
                </div>

                <input className='upload' type="file" ref={fileInputRef} />
                <button className='send' onClick={handleSendImage}>Send Image</button>
            </div>
        </>
    );

}

export default ImageTranfer;