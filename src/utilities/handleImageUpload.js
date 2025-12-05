import { toast } from "react-toastify";

const handleImageUpload = async (e, setPreview, setUploading, setImageUrl, folder) => {
  const file = e.target.files[0];
  if (!file) return null;

  setPreview && setPreview(URL.createObjectURL(file));
  setUploading(true);

  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", "unsigned_users_upload");
  formData.append("folder", folder);

  try {
    const res = await fetch(
      "https://api.cloudinary.com/v1_1/dy8q8wegg/image/upload",
      { method: "POST", body: formData }
    );

    const data = await res.json();
    setImageUrl && setImageUrl(data.secure_url);
    toast.success("Image uploaded successfully!");
    return data.secure_url; 
  } catch (error) {
    console.error("Upload failed:", error);
    toast.error("Failed to upload image");
    return null;
  } finally {
    setUploading(false);
  }
};

export default handleImageUpload;
