import HeroSection from "./HeroSection/HeroSection.jsx";
import SearchBar from "./SearchBar/SearchBar.jsx";
import PhotoGallery from "./PhotoGallery/PhotoGallery.jsx";
import "./App.css";
import { useState, useRef, useEffect } from "react";
import axios from "axios";

function App() {
  const [photos, setPhotos] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchtext, setSearchtext] = useState("");
  const ACCESS_KEY = "e-BkdQ9oYva6jfie_WTzp-U2AP_H7ltt1ZLKDybO6d0";
  const picturesPerPage = 7;
  const debounceRef = useRef();
  const timeoutRef = useRef(null);

  const fetchPhotos = (query, page = 1) => {
    axios
      .get(
        `https://api.unsplash.com/search/photos?query=${query}&page=${page}&per_page=${picturesPerPage}&client_id=${ACCESS_KEY}`
      )
      .then((res) => {
        setPhotos(res.data.results);
        setCurrentPage(page);
      })
      .catch((error) => {
        if (error.response) {
          console.error("Error status:", error.response.status);
          console.error("Error data:", error.response.data);
        } else if (error.request) {
          console.error("No response:", error.request);
        } else {
          console.error("Error:", error.message);
        }
        setPhotos([]);
        setCurrentPage(page);
      });
  };

  const debounce = (func, delay) => {
    return (...args) => {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = setTimeout(() => func(...args), delay);
    };
  };

  useEffect(() => {
    debounceRef.current = debounce(fetchPhotos, 500);

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
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
