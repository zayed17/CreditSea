import  { useState } from "react";
import { useUploadXML } from "../hooks/useUploadXML";
import FileUpload from "../components/FileUpload";
import Button from "../components/Button";

const UploadPage = () => {
  const [file, setFile] = useState<File | null>(null);
  const { handleUpload, isLoading } = useUploadXML();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">
      <div className="w-full max-w-xl bg-white rounded-xl shadow-2xl p-8">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-800 mb-3">Upload Credit Report</h2>
          <p className="text-gray-600">Upload your XML file to process your credit report</p>
        </div>

        <FileUpload onFileSelect={setFile} />
        <Button onClick={() => handleUpload(file)} disabled={!file || isLoading} isLoading={isLoading} text="Upload File" />
      </div>
    </div>
  );
};

export default UploadPage;
