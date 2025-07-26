import "./PhotoGallery.css";

export default function PhotoGallery({
  photos,
  fetchPhotos,
  searchtext,
  currentPage,
}) {
  const handlePageChange = (pageNumber) => {
    fetchPhotos(searchtext.trim(), pageNumber);
  };

  const totalPages = 7;
  return (
    <div className="gallery-container">
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
            disabled={photos.length === 0 || searchtext.trim() === ""}
          >
            {i + 1}
          </button>
        ))}
      </div>
    </div>
  );
}
