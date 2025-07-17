import { useState } from "react";
import "./unsplashClone.css";

export default function PhotoGallery() {
  const [photos, setPhotos] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchtext, setSearchtext] = useState("");

  const picturesPerPage = 7;
  const ACCESS_KEY = "e-BkdQ9oYva6jfie_WTzp-U2AP_H7ltt1ZLKDybO6d0";

  const fetchPhotos = (query, page = 1) => {
    fetch(
      `https://api.unsplash.com/search/photos?query=${query}&page=${page}&per_page=${picturesPerPage}&client_id=${ACCESS_KEY}`
    )
      .then((response) => response.json())
      .then((data) => {
        setPhotos(data.results);
        setCurrentPage(page);
      })
      .catch((error) => {
        console.error("Error fetching photos:", error);
        setPhotos([]);
      });
  };

  const handleSearch = () => {
    if (searchtext.trim() !== "") {
      fetchPhotos(searchtext.trim(), 1);
    } else {
      setPhotos([]);
    }
  };

  const handlePageChange = (pageNumber) => {
    fetchPhotos(searchtext.trim(), pageNumber);
  };

  const totalPages = 7;

  return (
    <div className="gallery-container">
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search anything you want..."
          value={searchtext}
          onChange={(e) => setSearchtext(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") handleSearch();
          }}
        />
        <button onClick={handleSearch}>Search</button>
      </div>

      <div className="suggested-keywords">
        {["books", "coffee", "mobiles", "computers", "technology"].map(
          (keyword) => (
            <button
              key={keyword}
              onClick={() => {
                setSearchtext(keyword);
                fetchPhotos(keyword, 1);
              }}
            >
              {keyword}
            </button>
          )
        )}
      </div>

      <div className="photo-gallery">
        {photos.length > 0 ? (
          photos.map((photo) => (
            <img
              key={photo.id}
              src={photo.urls.thumb}
              alt={photo.alt_description || "Unsplash photo"}
            />
          ))
        ) : (
          <p>Please search something...</p>
        )}
      </div>

      <div className="pagination">
        {Array.from({ length: totalPages }, (_, i) => (
          <button
            key={i}
            onClick={() => handlePageChange(i + 1)}
            className={currentPage === i + 1 ? "active" : ""}
            disabled={photos.length === 0}
          >
            {i + 1}
          </button>
        ))}
      </div>
    </div>
  );
}
