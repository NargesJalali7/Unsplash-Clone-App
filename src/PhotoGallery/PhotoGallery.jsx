import { Box, Typography } from "@mui/material";
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
    <>
      <Box
        sx={{
          maxWidth: 1400,
          margin: "40px auto 60px",
          paddingX: 2,
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
            gap: 2.5,
          }}
        >
          {photos.length > 0 ? (
            photos.map((photo) => (
              <Box
                component="img"
                key={photo.id}
                src={photo.urls.thumb}
                alt={photo.alt_description || "Unsplash photo"}
                sx={{
                  borderRadius: 3,
                  width: 250,
                  height: 250,
                  objectFit: "cover",
                  boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
                  transition: "transform 0.3s ease",
                  "&:hover": {
                    transform: "scale(1.07)",
                  },
                }}
              />
            ))
          ) : (
            <Typography variant="body1" color="textSecondary">
              Please search something...
            </Typography>
          )}
        </Box>
      </Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Pagination
          count={totalPages}
          page={currentPage}
          onChange={handlePageChange}
          color="secondary"
          variant="outlined"
          shape="rounded"
          disabled={searchtext.trim() === ""}
        />
      </Box>
    </>
  );
}
