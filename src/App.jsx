import HeroSection from "./HeroSection/HeroSection.jsx";
import SearchBar from "./SearchBar/SearchBar.jsx";
import PhotoGallery from "./PhotoGallery/PhotoGallery.jsx";
import "./App.css";
import { useState, useRef, useEffect } from "react";

function App() {
  const [photos, setPhotos] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchtext, setSearchtext] = useState("");
  const ACCESS_KEY = "e-BkdQ9oYva6jfie_WTzp-U2AP_H7ltt1ZLKDybO6d0";
  const picturesPerPage = 7;
  const debounceRef = useRef();

  const fetchPhotos = (query, page = 1) => {
    fetch(
      `https://api.unsplash.com/search/photos?query=${query}&page=${page}&per_page=${picturesPerPage}&client_id=${ACCESS_KEY}`
    )
      .then((response) => response.json())
      .then((data) => {
        setPhotos(data.results);
      })
      .catch((error) => {
        console.error("Error fetching photos:", error);
        setPhotos([]);
        setCurrentPage(page);
      });
  };

  const debounce = (func, delay) => {
    let timeoutId;
    return (...args) => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => func(...args), delay);
    };
  };

  useEffect(() => {
    debounceRef.current = debounce(fetchPhotos, 500);
  }, []);

  const callDebouncedFetch = (query) => {
    if (debounceRef.current) {
      debounceRef.current(query);
    }
  };

  return (
    <>
      <HeroSection />
      <SearchBar
        searchtext={searchtext}
        setPhotos={setPhotos}
        setSearchtext={setSearchtext}
        callDebouncedFetch={callDebouncedFetch}
      />
      <PhotoGallery
        photos={photos}
        fetchPhotos={fetchPhotos}
        currentPage={currentPage}
        searchtext={searchtext}
      />
    </>
  );
}

export default App;
