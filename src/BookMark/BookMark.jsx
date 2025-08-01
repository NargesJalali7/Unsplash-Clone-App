import { Box, IconButton } from "@mui/material";
import { useContext } from "react";
import { BookmarkContext } from "../BookmarkContext.jsx";
import { BsDoorClosed } from "react-icons/bs";
import { RiDeleteBin2Fill } from "react-icons/ri";

export default function BookMarkList() {
  const { likedPhotos, isSidebarOpen, setIsSidebarOpen, toggleLike } =
    useContext(BookmarkContext);

  return (
    <>
      {isSidebarOpen && (
        <Box
          sx={{
            position: "fixed",
            top: 0,
            right: 0,
            width: 350,
            height: "100vh",
            display: "flex",
            flexDirection: "column",
            background: "linear-gradient(135deg, #fce4ec 0%, #ce93d8 100%)",
            boxShadow: "0 40px 60px rgba(0, 0, 0, 0.1)",
            zIndex: 2000,
          }}
        >
          <Box sx={{ padding: 1 }}>
            <IconButton onClick={() => setIsSidebarOpen(false)}>
              <BsDoorClosed />
            </IconButton>
          </Box>
          <Box
            sx={{
              flex: 1,
              overflowY: "auto",
              paddingX: 2,
              paddingBottom: 2,
              direction: "rtl",

              scrollbarWidth: "thin",
              scrollbarColor: "#7030a5ff #fce4ec",
            }}
          >
            <Box
              sx={{
                direction: "ltr",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: 2.5,
              }}
            >
              {likedPhotos.map((photo) => (
                <Box
                  key={photo.id}
                  sx={{
                    width: 250,
                    height: 250,
                    borderRadius: 3,
                    overflow: "hidden",
                    position: "relative",
                    display: "flex",
                    boxShadow: "0 10px 40px rgba(0, 0, 0, 0.2)",
                    borderLeft: "1px solid rgba(0,0,0,0.1)",
                    transition: "transform 0.3s ease",
                    "&:hover": {
                      transform: "scale(1.02)",
                    },
                  }}
                >
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
                    <RiDeleteBin2Fill color="pink" />
                  </IconButton>
                  <Box
                    sx={{
                      width: "100%",
                      height: "100%",
                      backgroundImage: `url(${photo.urls.thumb})`,
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                      backgroundRepeat: "no-repeat",
                    }}
                  />
                </Box>
              ))}
            </Box>
          </Box>
        </Box>
      )}
    </>
  );
}
