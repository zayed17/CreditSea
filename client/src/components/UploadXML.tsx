import React, { useState } from 'react';
import { useUploadXMLMutation } from '../api/creditApi';

const UploadPage: React.FC = () => {
    const [file, setFile] = useState<File | null>(null);
    const [uploadXML] = useUploadXMLMutation();
    const [message, setMessage] = useState('');

    const handleUpload = async () => {
        if (!file) return alert('Please select a file');
        const formData = new FormData();
        formData.append('file', file);

        try {
            await uploadXML(formData).unwrap();
            setMessage('Upload successful');
        } catch (error) {
            setMessage('Upload failed');
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-blue-500 to-indigo-600 p-6">
            <div className="bg-white p-8 rounded-lg shadow-2xl w-full max-w-lg text-center">
                <h2 className="text-3xl font-bold text-gray-800 mb-6">Upload XML File</h2>
                <p className="text-gray-600 mb-4">Select an XML file and upload it to process your credit report.</p>
                <div className="flex flex-col items-center space-y-4">
                    <input 
                        type="file" 
                        className="border p-3 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-blue-500" 
                        onChange={(e) => setFile(e.target.files?.[0] || null)}
                    />
                    <button 
                        className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-md w-full transition-all shadow-md"
                        onClick={handleUpload}
                    >
                        Upload File
                    </button>
                </div>
                {message && <p className="mt-4 text-lg font-medium text-gray-700">{message}</p>}
            </div>
        </div>
    );
};

export default UploadPage;
