import { useEffect, useState } from "react";
import { Box, Typography } from "@mui/material";
import "./HeroSection.css";

export default function HeroSection() {
  const [heroBackground, setHeroBackground] = useState("");

  useEffect(() => {
    const accessKey = "e-BkdQ9oYva6jfie_WTzp-U2AP_H7ltt1ZLKDybO6d0";

    fetch(`https://api.unsplash.com/photos/random?client_id=${accessKey}`)
      .then((response) => response.json())
      .then((pictureData) => {
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
          height: 400,
          backgroundImage: `url(${heroBackground})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        <Typography variant="h1" color="purple">
          Unsplash
        </Typography>
        <Typography variant="body1" color="purple">
          The most powerful photo engine in the world.
        </Typography>
      </Box>
    </>
  );
}
