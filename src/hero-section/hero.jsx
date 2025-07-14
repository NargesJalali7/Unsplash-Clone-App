import { useEffect, useState } from "react";
import "./hero.css";

export default function HeroSection() {
  const [heroBackground, setHeroBackground] = useState([]);
  const [currentHeroBackground, setCurrentHeroBackground] = useState(0);

  useEffect(() => {
    const accessKey = "e-BkdQ9oYva6jfie_WTzp-U2AP_H7ltt1ZLKDybO6d0";

    fetch(`https://api.unsplash.com/photos?per_page=30&client_id=${accessKey}`)
      .then((response) => response.json())
      .then((pictureData) => {
        setHeroBackground(pictureData);
      })
      .catch((error) => {
        console.error("There was a problem with the fetch operation:", error);
      });
  }, []);

  useEffect(() => {
    if (heroBackground.length === 0) return;

    const intervalId = setInterval(() => {
      setCurrentHeroBackground(
        (prevIndex) => (prevIndex + 1) % heroBackground.length
      );
    }, 3000);

    return () => clearInterval(intervalId);
  }, [heroBackground]);

  const width = 1600;
  const height = 900;

  return (
    <div className="hero-background">
      {heroBackground.map((img, index) => (
        <div
          key={img.id}
          className={`hero-image ${
            index === currentHeroBackground ? "visible" : ""
          }`}
          style={{
            backgroundImage: `url(${img.urls.raw}?w=${width}&h=${height}&fit=crop&crop=entropy)`,
          }}
        >
          <div className="hero-content">
            <h1>Unsplash</h1>
            <p>The most powerful photo engine in the world.</p>
          </div>
        </div>
      ))}
    </div>
  );
}
