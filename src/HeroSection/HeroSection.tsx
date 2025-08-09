import { useEffect, useState } from "react";
import { Box, Typography, IconButton } from "@mui/material";
import { BsFillBookmarkHeartFill } from "react-icons/bs";
import "./HeroSection.css";
import { useContext } from "react";
import { BookmarkContext } from "../BookmarkContext";
import React from "react";

type UnsplashPhoto = {
  urls: {
    regular: string;
  };
};

const HeroSection: React.FC = () => {
  const [heroBackground, setHeroBackground] = useState<string>("");
  const { setIsSidebarOpen } = useContext(BookmarkContext);

  useEffect(() => {
    const accessKey = "e-BkdQ9oYva6jfie_WTzp-U2AP_H7ltt1ZLKDybO6d0";

    fetch(`https://api.unsplash.com/photos/random?client_id=${accessKey}`)
      .then((response) => response.json())
      .then((pictureData: UnsplashPhoto) => {
        setHeroBackground(pictureData.urls.regular);
      })
      .catch((error) => {
        console.error("There was a problem with the fetch operation:", error);
      });
  }, []);

  return (
    <>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          alignContent: "center",
          height: { xs: "300px", sm: "400px", md: "600px" },
          width: "100%",
          backgroundImage: `url(${heroBackground})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        <IconButton
          onClick={() => setIsSidebarOpen(true)}
          sx={{
            position: "absolute",
            top: 30,
            right: 30,

            backgroundColor: "rgba(0,0,0,0.4)",
            "&:hover": {
              backgroundColor: "rgba(0,0,0,0.6)",
            },
            zIndex: 10,
          }}
        >
          <BsFillBookmarkHeartFill
            color="purple"
            style={{ fontSize: "clamp(18px, 4vw, 35px)" }}
          />
        </IconButton>
        <Typography
          variant="h1"
          color="purple"
          sx={{
            fontSize: { xs: 35, sm: 50, md: 70 },
          }}
        >
          Unsplash
        </Typography>
        <Typography
          variant="body1"
          color="purple"
          sx={{
            fontSize: { xs: 12, sm: 22, md: 32 },
          }}
        >
          The most powerful photo engine in the world.
        </Typography>
      </Box>
    </>
  );
}
export default HeroSection;