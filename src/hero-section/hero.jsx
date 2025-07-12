import { useEffect, useState } from "react";
import "./hero.css";

export default function HeroSection() {
  const [heroBackground, handleHeroBackground] = useState([]);

  useEffect(() => {
    const accessKey = "e-BkdQ9oYva6jfie_WTzp-U2AP_H7ltt1ZLKDybO6d0";

    fetch(`https://api.unsplash.com/photos?per_page=30&client_id=${accessKey}`)
      .then((response) => {
        return response.json();
      })
      .then((pictureData) => {
        console.log("Fetched photos:", pictureData);
        handleHeroBackground(pictureData);
      })
      .catch((error) => {
        console.error("There was a problem with the fetch operation:", error);
      });
  }, []);

  return (
    <>
      {heroBackground.length > 0 && (
        <div
          style={{
            width: "100%",
            height: "60vh",
            backgroundImage: `url(${heroBackground[0].urls.full})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "white",
            fontSize: "3rem",
            fontWeight: "bold",
            textShadow: "0 0 10px rgba(0,0,0,0.6)",
            flexDirection: "column",
          }}
        >
          <h1 style={{ marginBottom: "0.1rem" }}>Unsplash</h1>
          <p style={{ marginBottom: "0.7rem" }}>
            The most powerful photo engine in the world.
          </p>
        </div>
      )}
    </>
  );
}
