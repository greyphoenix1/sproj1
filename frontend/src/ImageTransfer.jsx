import React, { useEffect, useRef } from 'react';
import io from 'socket.io-client';

const socket = io('http://localhost:3000');

function ImageTranfer() {
    const fileInputRef = useRef();

    useEffect(() => {
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

    return (
        <div>
            <input type="file" ref={fileInputRef} />
            <button onClick={handleSendImage}>Send Image</button>
        </div>
    );

}

export default ImageTranfer;