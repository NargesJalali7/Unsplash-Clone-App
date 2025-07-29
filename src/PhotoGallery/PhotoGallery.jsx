import "./PhotoGallery.css";
import Pagination from "@mui/material/Pagination";

export default function PhotoGallery({
  photos,
  fetchPhotos,
  searchtext,
  currentPage,
  totalPhotos,
  picturesPerPage,
}) {
  if (!Array.isArray(photos)) return null;

  const handlePageChange = (event, pageNumber) => {
    fetchPhotos(searchtext.trim(), pageNumber);
  };

  const totalPages = Math.ceil(totalPhotos / picturesPerPage);
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
        <Pagination
          count={totalPages}
          page={currentPage}
          onChange={handlePageChange}
          color="secondary"
          disabled={searchtext.trim() === ""}
        />
      </div>
    </div>
  );
}
