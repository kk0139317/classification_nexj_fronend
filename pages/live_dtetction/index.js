// pages/LiveCamera.js

import React, { useState, useRef } from 'react';
import axios from 'axios';

const LiveCamera = () => {
    const [classification, setClassification] = useState(null);
    const videoRef = useRef();

    const captureImage = async () => {
        const canvas = document.createElement('canvas');
        canvas.width = videoRef.current.videoWidth;
        canvas.height = videoRef.current.videoHeight;
        canvas.getContext('2d').drawImage(videoRef.current, 0, 0);
        const imgDataUrl = canvas.toDataURL('image/jpeg');

        try {
            const response = await axios.post('http://127.0.0.1:8000/api/classify_image', { image: imgDataUrl });
            setClassification(response.data);
        } catch (error) {
            console.error('Error classifying image:', error);
        }
    };

    return (
        <div>
            <video ref={videoRef} autoPlay />
            <button onClick={captureImage}>Capture Image</button>
            {classification && (
                <div>
                    <h2>Classification Result</h2>
                    <p>Prediction: {classification.prediction}</p>
                    <p>Confidence: {classification.confidence.toFixed(2)}%</p>
                </div>
            )}
        </div>
    );
};

export default LiveCamera;
