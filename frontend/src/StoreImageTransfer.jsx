import React, {useEffect, useState} from 'react';
import io from 'socket.io-client';

const socket = io('http://localhost');

function StoredImageTransfer() {
    const [images, setImages] = useState([]);

    useEffect(() => {
        socket.emit('requestImages', 'userId');
        socket.on('receiveImages', (data) => {
            setImages(data);
        });

        return () => {
            socket.off('receiveImages');
        };
    }, []);


    return (
        <div>
            {images.length > 0 && (
                <ul>
                    {images.map((image, index) => (
                        <li key={index}>
                            <img src={image.url} alt={`Image ${image}`} />
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );

}

export default StoredImageTransfer;