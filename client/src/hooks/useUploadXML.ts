import { useUploadXMLMutation } from "../api/creditApi";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export const useUploadXML = () => {
  const [uploadXML, { isLoading }] = useUploadXMLMutation();
  const navigate = useNavigate();

  const handleUpload = async (file: File | null) => {
    if (!file) {
      toast.error("No file selected. Please upload an XML file.");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await uploadXML(formData).unwrap();
      toast.success(response.message);
      navigate(`/reports/${response.reportId}`);
    } catch (error: any) {
      if (error?.data?.error) {
        toast.error(error.data.error);
      } else {
        toast.error("File upload failed. Please try again.");
      }
    }
  };

  return { handleUpload, isLoading };
};
