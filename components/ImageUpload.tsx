"use client";
import { cn } from "@/lib/utils";
import { Image as ImageIcon } from "lucide-react";
import { FC, useState } from "react";

interface ImageUploadProps {
  onChange: (value: string) => void;
  value: string;
}

const ImageUpload: FC<ImageUploadProps> = ({ onChange, value: imageSrc }) => {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      if (selectedFile.type.startsWith("image/")) {
        if (selectedFile.size <= 5 * 1024 * 1024) {
          handleUpload(selectedFile);
        } else {
          setError("Please select an image file smaller than 5MB.");
        }
      } else {
        setError("Please select an image file.");
      }
    }
  };

  const handleUpload = async (selectedImage: any) => {
    if (!selectedImage) {
      setError("Please select an image before uploading.");
      return;
    }

    setLoading(true);

    const formData = new FormData();
    formData.set("file", selectedImage);

    try {
      const data = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });
      const response = await data.json();
      if (response.success) {
        onChange(response.src);
      } else {
        console.error("Failed to upload image.");
      }
    } catch (error) {
      console.error("Error uploading image:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <label
      htmlFor="image-upload"
      className={cn(
        "relative overflow-hidden cursor-pointer hover:opacity-70 transition border-dashed p-20 border-2 border-neutral-300 flex flex-col justify-center items-center gap-3 text-neutral-600",
        {
          "border-green-600": imageSrc,
        },
        {
          "animate-pulse": loading,
        }
      )}
    >
      <input
        disabled={loading || imageSrc ? true : false}
        accept="image/*"
        multiple={false}
        type="file"
        id="image-upload"
        className="hidden"
        onChange={handleFileChange}
      />
      <ImageIcon />
      {!loading && !imageSrc && (
        <div className="font-semibold">Click to upload</div>
      )}
      {loading && <p className="text-green-600">uploading...</p>}
      {imageSrc && (
        <p className="text-green-600">Image uploaded sucessfully!</p>
      )}
      <p className="text-red-600">{error.trim().length > 0 && error}</p>
    </label>
  );
};

export default ImageUpload;
