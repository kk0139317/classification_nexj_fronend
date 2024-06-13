import React, { useState } from 'react';
import axios from 'axios';
import Link from 'next/link';
const UploadImage = () => {
    const [image, setImage] = useState(null);
    const [showPopup, setShowPopup] = useState(false);
    const [prediction, setPrediction] = useState(null);
    const [error, setError] = useState(null);
    const [file, setFile] = useState(null);
    const [imageDimensions, setImageDimensions] = useState({ width: 0, height: 0 });
    const [imageName, setImageName] = useState('');

    const MODEL_WIDTH = 224;
    const MODEL_HEIGHT = 224;

    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];
        setFile(selectedFile);
        const imageUrl = URL.createObjectURL(selectedFile);
        setImage(imageUrl);
        setImageName(selectedFile.name);

        const img = new Image();
        img.onload = () => {
            setImageDimensions({ width: img.width, height: img.height });
        };
        img.src = imageUrl;
    };

    const handleSubmit = async () => {
        if (!file) {
            setError('Please select an image.');
            return;
        }

        const formData = new FormData();
        formData.append('file', file);
        formData.append('url', window.location.href); // Send the URL of the page

        try {
            const response = await axios.post('http://192.168.1.25:8000/api/upload/', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            setPrediction(response.data);
            setShowPopup(true);
            setError(null);
        } catch (error) {
            console.error('Error uploading image:', error);
            setError('Error uploading image. Please try again.');
        }
    };

    return (
        <div className="flex items-center justify-center ">
            <div className="bg-gray-100 rounded-lg shadow-lg p-8 w-full max-w-md">
                <h1 className="text-4xl font-bold mb-6 text-gray-800 text-center">Cat & Dog Image Classifier</h1>
                <div className="mb-6 text-center">
                    <input
                        type="file"
                        accept="image/*"
                        onChange={handleFileChange}
                        className="hidden"
                        id="upload-input"
                    />
                    <label htmlFor="upload-input" className="block bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-6 rounded-full cursor-pointer transition duration-300">
                        Upload Image
                    </label>
                </div>
                {image && (
                    <div className="mb-6 text-center">
                        <div className="border border-gray-300 p-4 rounded-lg inline-block">
                            <img src={image} alt="Uploaded" className="rounded-lg mb-4" style={{ maxWidth: '100%' }} />
                            <p className="text-gray-700">Name: {imageName}</p>
                            <p className="text-gray-700">Original Dimensions: {imageDimensions.width}px (W) x {imageDimensions.height}px (H)</p>
                            <p className="text-gray-700">Model Dimensions: {MODEL_WIDTH}px (W) x {MODEL_HEIGHT}px (H)</p>
                        </div>
                    </div>
                )}
                {error && <p className="text-red-600 mb-4 text-center">{error}</p>}
                {image && (
                    <div className="text-center">
                        <button
                            onClick={handleSubmit}
                            className="bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-6 rounded-full transition duration-300"
                        >
                            Submit
                        </button>
                    </div>
                )}
                {showPopup && (
                    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                        <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-md relative">
                            <button
                                className="absolute top-2 right-2 text-gray-600 hover:text-gray-800"
                                onClick={() => setShowPopup(false)}
                            >
                                &#10005;
                            </button>
                            <div className="flex flex-col items-center  ">
                                <img src={image} alt="Uploaded" className="rounded-lg mb-6 border border-gray-300" style={{ maxWidth: '300px' }} />
                                <p className="text-gray-700">Name: {imageName}</p>
                                <p className="text-gray-700">Original Dimensions: {imageDimensions.width}px (W) x {imageDimensions.height}px (H)</p>
                                <p className="text-gray-700">Model Dimensions: {MODEL_WIDTH}px (W) x {MODEL_HEIGHT}px (H)</p>
                                {prediction ? (
                                    <div className="text-center">
                                        <h2 className="text-2xl font-bold mb-2 text-gray-800">Prediction Result</h2>
                                        <p className="text-lg text-gray-700">
                                            This image is classified as a <span className="font-semibold text-indigo-600">{prediction.prediction}</span> with confidence <span className="font-semibold text-indigo-600">{prediction.confidence.toFixed(2)}%</span>.
                                        </p>
                                        <Link href='/all_predictions'
                                        className=''
                                        > all prediction</Link>
                                    </div>
                                ) : (
                                    <div className="text-center">
                                        <h2 className="text-2xl font-bold mb-2 text-gray-800">Classifying...</h2>
                                        <p className="text-lg text-gray-700">Please wait while we classify your image.</p>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default UploadImage;
