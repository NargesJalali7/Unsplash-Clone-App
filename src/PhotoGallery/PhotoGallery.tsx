import { Box, Typography, IconButton } from "@mui/material";
import { FaHeart } from "react-icons/fa";
import Pagination from "@mui/material/Pagination";
import { PhotoGalleryProps } from "./PhotoGallery.Types";

export default function PhotoGallery ({
  photos,
  fetchPhotos,
  searchtext,
  currentPage,
  totalPhotos,
  picturesPerPage,
  toggleLike,
  likedPhotos,
}: PhotoGalleryProps ) {
    if (!Array.isArray(photos)) return null;

  const handlePageChange = (_event: React.ChangeEvent<unknown>, pageNumber: number) => {
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
        {photos.length > 0 ? (
          <Box
            sx={{
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "center",
              gap: 2.5,
            }}
          >
            {photos.map((photo) => {
              const isLiked = likedPhotos.some((p) => p.id === photo.id);

              return (
                <Box
                  key={photo.id}
                  sx={{
                    position: "relative",
                    borderRadius: 3,
                    overflow: "hidden",
                    width: 250,
                    height: 250,
                    boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
                    transition: "transform 0.3s ease",
                    "&:hover": {
                      transform: "scale(1.07)",
                    },
                  }}
                >
                  <Box
                    component="img"
                    src={photo.urls.thumb}
                    alt={photo.alt_description || "Unsplash photo"}
                    sx={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                    }}
                  />
                  <IconButton
                    onClick={() => toggleLike(photo)}
                    sx={{
                      position: "absolute",
                      top: 8,
                      right: 8,
                      fontSize: 17,
                      backgroundColor: "rgba(90, 87, 87, 0.6)",
                      "&:hover": {
                        backgroundColor: "rgba(0,0,0,0.6)",
                      },
                      zIndex: 10,
                    }}
                  >
                    {isLiked ? (
                      <FaHeart color="purple" />
                    ) : (
                      <FaHeart color="white" />
                    )}
                  </IconButton>
                </Box>
              );
            })}
          </Box>
        ) : (
          <Typography variant="body1" color="textSecondary">
            Please search something...
          </Typography>
        )}

        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            marginTop: 4,
            paddingX: { xs: 1, sm: 2, md: 0 },
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
            sx={{
              "& .MuiPagination-ul": {
                flexWrap: "wrap",
                justifyContent: "center",
                gap: 1,
              },
            }}
          />
        </Box>
      </Box>
    </>
  );
}
