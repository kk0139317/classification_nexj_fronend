import React, { useRef, useState, useCallback } from 'react';
import Webcam from 'react-webcam';
import axios from 'axios';

const LivePrediction = () => {
    const webcamRef = useRef(null);
    const [prediction, setPrediction] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const [showPopup, setShowPopup] = useState(false);
    const [image, setImage] = useState(null);
    const [imageDimensions, setImageDimensions] = useState({ width: 0, height: 0 });
    const [imageName, setImageName] = useState('live_image.jpg');
    const [facingMode, setFacingMode] = useState('user'); // 'user' for front camera, 'environment' for back camera

    const MODEL_WIDTH = 224;
    const MODEL_HEIGHT = 224;

    const capture = useCallback(async () => {
        const imageSrc = webcamRef.current.getScreenshot();
        setImage(imageSrc);
        if (imageSrc) {
            try {
                setLoading(true);

                // Clear previous image dimensions
                setImageDimensions({ width: 0, height: 0 });

                // Load image to get dimensions
                const img = new Image();
                img.onload = () => {
                    setImageDimensions({ width: img.width, height: img.height });
                };
                img.src = imageSrc;

                // Create FormData object
                const formData = new FormData();
                formData.append('image', imageSrc);
                formData.append('url', window.location.href);

                // Post image to server for prediction
                const response = await axios.post('https://192.168.1.25:8000/api/livepredict/', formData, {
                    headers: {
                      'Content-Type': 'multipart/form-data',
                    //   'Access-Control-Allow-Origin': 'https://192.168.1.244:3000', // Ensure CORS allows your frontend URL
                    },
                  });
                  
                console.log('Server response:', response.data);
                setPrediction(response.data);
                setShowPopup(true);
                setError(null);
            } catch (error) {
                console.error('Error uploading image:', error);
                setError('Error uploading image. Please try again.');
            } finally {
                setLoading(false);
            }
        }
    }, [webcamRef]);

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-white">
            <h1 className="text-5xl font-extrabold mb-8 text-gray-800 text-center">
                Live Cat & Dog Image Classifier
            </h1>
            <div className="mb-6 relative">
                <div className="relative border-4 border-indigo-500 rounded-lg shadow-xl overflow-hidden w-80 h-60">
                    <Webcam
                        audio={false}
                        ref={webcamRef}
                        screenshotFormat="image/jpeg"
                        width={320}
                        height={240}
                        className="absolute inset-0"
                        videoConstraints={{
                            facingMode: facingMode,
                        }}
                    />
                    <div className="absolute inset-0 bg-indigo-100 bg-opacity-50 flex items-center justify-center transition-opacity duration-300 opacity-0 hover:opacity-100">
                        <button
                            onClick={capture}
                            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-full transition duration-300"
                            disabled={loading}
                        >
                            {loading ? 'Classifying...' : 'Capture & Classify'}
                        </button>
                    </div>
                </div>
                <button
                    onClick={() => setFacingMode(facingMode === 'user' ? 'environment' : 'user')}
                    className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-full transition duration-300 mt-4"
                >
                    {facingMode === 'user' ? 'Switch to Back Camera' : 'Switch to Front Camera'}
                </button>
            </div>
            {error && <p className="text-red-600 mt-4 text-center">{error}</p>}
            {showPopup && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-60 transition-opacity">
                    <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-md relative transform transition-all scale-95">
                        <button
                            className="absolute top-2 right-2 text-gray-600 hover:text-gray-800"
                            onClick={() => setShowPopup(false)}
                        >
                            &#10005;
                        </button>
                        <div className="flex flex-col items-center">
                            <img
                                src={image}
                                alt="Captured"
                                className="rounded-lg mb-6 border border-gray-300 shadow-lg"
                                style={{ maxWidth: '300px' }}
                            />
                            <p className="text-gray-700">Name: {imageName}</p>
                            <p className="text-gray-700">
                                Original Dimensions: {imageDimensions.width}px (W) x {imageDimensions.height}px (H)
                            </p>
                            <p className="text-gray-700">
                                Model Dimensions: {MODEL_WIDTH}px (W) x {MODEL_HEIGHT}px (H)
                            </p>
                            {prediction ? (
                                <div className="text-center">
                                    <h2 className="text-3xl font-bold mb-2 text-gray-800">Prediction Result</h2>
                                    <p className="text-lg text-gray-700">
                                        This image is classified as a{' '}
                                        <span className="font-semibold text-indigo-600">
                                            {prediction.prediction}
                                        </span>{' '}
                                        with confidence{' '}
                                        <span className="font-semibold text-indigo-600">
                                            {prediction.confidence}%
                                        </span>.
                                    </p>
                                </div>
                            ) : (
                                <div className="text-center">
                                    <h2 className="text-3xl font-bold mb-2 text-gray-800">Classifying...</h2>
                                    <p className="text-lg text-gray-700">
                                        Please wait while we classify your image.
                                    </p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default LivePrediction;
