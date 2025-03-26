import React, { useState } from "react";

const Banner = () => {
  const [banners, setBanners] = useState([]);
  const [newBanner, setNewBanner] = useState(null);

  // Handle file input change
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setNewBanner({
        file,
        preview: URL.createObjectURL(file),
      });
    }
  };

  // Submit banner
  const handleUpload = async () => {
    if (!newBanner) {
      alert("Please select a banner to upload.");
      return;
    }

    const formData = new FormData();
    formData.append("banner", newBanner.file);

    try {
      const response = await fetch("/api/upload-banner", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        const uploadedBanner = await response.json();
        setBanners((prev) => [...prev, uploadedBanner]);
        alert("Banner uploaded successfully!");
        setNewBanner(null);
      } else {
        alert("Failed to upload banner. Please try again.");
      }
    } catch (error) {
      console.error("Error uploading banner:", error);
      alert("An error occurred while uploading the banner.");
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Manage Banners</h2>
      <div className="mb-4">
        <label className="block mb-2 text-sm font-medium text-gray-700">
          Upload New Banner
        </label>
        <input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50"
        />
        {newBanner && (
          <div className="mt-4">
            <img
              src={newBanner.preview}
              alt="Preview"
              className="w-full h-48 object-cover rounded-lg"
            />
            <button
              onClick={handleUpload}
              className="mt-2 px-4 py-2 bg-blue-600 text-white rounded-lg"
            >
              Upload
            </button>
          </div>
        )}
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-2">Uploaded Banners</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {banners.map((banner, index) => (
            <div key={index} className="relative">
              <img
                src={banner.url}
                alt={`Banner ${index + 1}`}
                className="w-full h-48 object-cover rounded-lg"
              />
              <p className="mt-1 text-sm text-gray-600">{banner.title || "Untitled"}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Banner;
