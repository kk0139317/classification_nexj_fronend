'use client';
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const PredictionsTable = () => {
    const [predictions, setPredictions] = useState([]);
    const [selectedPrediction, setSelectedPrediction] = useState(null);

    useEffect(() => {
        // Fetch predictions from the backend
        axios.get('http://192.168.1.25:8000/api/predictions/')
            .then(response => {
                setPredictions(response.data);
            })
            .catch(error => {
                console.error('Error fetching predictions:', error);
            });
    }, []);

    const openPopup = (prediction) => {
        setSelectedPrediction(prediction);
    };

    const closePopup = () => {
        setSelectedPrediction(null);
    };

    
    return (
        <div className="container mx-auto mt-8 px-4  mb-10 pb-0 ">
            <h2 className="text-4xl font-bold text-center mb-6  text-gray-800">Predictions Table</h2>
            <div className="overflow-x-auto bg-white shadow-2xl rounded-lg">
                <table className="min-w-full table-auto divide-y divide-gray-200">
                    <thead className="bg-blue-500 text-white">
                        <tr>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider">Image</th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider">Prediction</th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider">Confidence</th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider">Timestamp</th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider">Image Name</th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider">Original Dimensions</th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider">Model Dimensions</th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider">View</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                        {predictions.map(prediction => (
                            <tr key={prediction.id} className="transition duration-300 ease-in-out transform hover:bg-blue-100 cursor-pointer">
                                <td className="-pr-4 pl-6 py-4 whitespace-nowrap">
                                    <img src={`http://192.168.1.25:8000/${prediction.image}`} alt="Prediction" className="h-16 w-16 object-cover rounded-full border-2 border-blue-500" onClick={() => openPopup(prediction)} />
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">{prediction.prediction}</td>
                                <td className="px-6 py-4 whitespace-nowrap">{prediction.confidence.toFixed(2)}%</td>
                                <td className="px-6 py-4 whitespace-nowrap">{new Date(prediction.timestamp).toLocaleString()}</td>
                                <td className="px-6 py-4 ">{prediction.image_name}</td>
                                <td className="px-6 py-4 whitespace-nowrap">{prediction.original_height} X {prediction.original_width}</td>
                                <td className="px-6 py-4 whitespace-nowrap">{prediction.model_height} X {prediction.model_width}</td>
                                <td className="px-6 py-4 whitespace-nowrap"><a href="#" className="text-blue-600 hover:underline" onClick={() => openPopup(prediction)}>View</a></td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            {/* Popup Card */}
            {selectedPrediction && (
                <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-75 z-50">
                    <div className="relative bg-white rounded-lg p-8 max-w-3xl w-full shadow-lg">
                        <button className="absolute top-4 right-4 text-gray-500 hover:text-gray-700" onClick={closePopup}>
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                        <h3 className="text-2xl font-bold mb-4 text-gray-800">Prediction Details</h3>
                        <div className="flex flex-col sm:flex-row">
                            <div className="flex-shrink-0">
                                <img src={`http://192.168.1.25:8000/${selectedPrediction.image}`} alt="Prediction" className="h-64 w-full sm:w-64 object-cover rounded-lg border-2 border-gray-300" />
                            </div>
                            <div className="sm:ml-6 mt-4 sm:mt-0 space-y-2">
                                <p className="font-semibold text-lg">Prediction: <span className="text-gray-700">{selectedPrediction.prediction}</span></p>
                                <p className="font-semibold text-lg">Confidence: <span className="text-gray-700">{selectedPrediction.confidence.toFixed(2)}%</span></p>
                                <p className="font-semibold text-lg">Timestamp:  <span className="text-gray-700">{new Date(selectedPrediction.timestamp).toLocaleString()}</span></p>
                                <p className="font-semibold text-lg">Image Name: <span className="text-gray-700">{selectedPrediction.image_name}</span></p>
                                <p className="font-semibold text-lg">Original Dimensions: <span className="text-gray-700">{selectedPrediction.original_height} x {selectedPrediction.original_width}</span></p>
                                <p className="font-semibold text-lg">Model Dimensions: <span className="text-gray-700">224 x 224</span></p>
                                <p className="font-semibold text-lg">URL: <a href={`http://192.168.1.25:8000/${selectedPrediction.image}`} className="text-blue-600 hover:underline break-all" download >{`http://127.0.0.1:8000/${selectedPrediction.image}`}</a></p>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default PredictionsTable;
