import React, { useState, useCallback } from "react";
import { Upload, FileText } from "lucide-react";
import { toast } from "react-toastify";

interface FileUploadProps {
  onFileSelect: (file: File | null) => void;
}

const FileUpload: React.FC<FileUploadProps> = ({ onFileSelect }) => {
  const [file, setFile] = useState<File | null>(null);
  const [isDragging, setIsDragging] = useState(false);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const droppedFile = e.dataTransfer.files[0];
    if (droppedFile?.type === "text/xml") {
      setFile(droppedFile);
      onFileSelect(droppedFile);
    } else {
      toast.error("Please select a valid XML file.");
    }
  }, [onFileSelect]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0] || null;
    if (selectedFile?.type === "text/xml") {
      setFile(selectedFile);
      onFileSelect(selectedFile);
    } else {
      toast.error("Invalid file type. Please select an XML file.");
    }
  };

  return (
    <div
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      className={`border-2 border-dashed rounded-lg p-8 mb-6 text-center transition-all ${
        isDragging ? "border-blue-500 bg-blue-50" : "border-gray-300"
      } ${file ? "bg-green-50 border-green-300" : ""}`}
    >
      <div className="flex flex-col items-center space-y-4">
        {file ? (
          <div className="flex items-center space-x-3">
            <FileText className="w-8 h-8 text-green-500" />
            <span className="text-green-600 font-medium">{file.name}</span>
          </div>
        ) : (
          <>
            <Upload className="w-12 h-12 text-blue-500 mb-2" />
            <p className="text-gray-600">Drag and drop your XML file here, or</p>
            <label className="inline-block px-4 py-2 bg-blue-100 text-blue-600 rounded-md cursor-pointer hover:bg-blue-200 transition-colors">
              Browse Files
              <input type="file" accept=".xml" className="hidden" onChange={handleFileChange} />
            </label>
          </>
        )}
      </div>
    </div>
  );
};

export default FileUpload;
