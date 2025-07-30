import HeroSection from "./HeroSection/HeroSection.jsx";
import SearchBar from "./SearchBar/SearchBar.jsx";
import PhotoGallery from "./PhotoGallery/PhotoGallery.jsx";
import "./App.css";
import { useState, useRef, useEffect } from "react";

function App() {
  const [photos, setPhotos] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchtext, setSearchtext] = useState("");
  const [totalPhotos, setTotalPhotos] = useState();
  const accessKey = "e-BkdQ9oYva6jfie_WTzp-U2AP_H7ltt1ZLKDybO6d0";
  const picturesPerPage = 7;
  const debounceRef = useRef();
  const timeoutRef = useRef(null);

  const fetchPhotos = (query = "nature", page = 1) => {
    fetch(
      `https://api.unsplash.com/search/photos?query=${encodeURIComponent(
        query
      )}&page=${page}&per_page=${picturesPerPage}&client_id=${accessKey}`
    )
      .then((response) => {
        if (response.status === 403) {
          throw new Error(
            "Rate limit exceeded. Please try again in a few minutes."
          );
        }
        if (!response.ok) {
          throw new Error("Failed to fetch photos.");
        }
        return response.json();
      })

      .then((data) => {
        setPhotos(data.results);
        setTotalPhotos(data.total);
        setCurrentPage(page);
      })
      .catch((error) => {
        console.error("Error fetching photos:", error);
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
    callDebouncedFetch();

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  const callDebouncedFetch = (query = "nature", page = 1) => {
    if (debounceRef.current) {
      debounceRef.current(query, page);
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
        picturesPerPage={picturesPerPage}
        photos={photos}
        fetchPhotos={fetchPhotos}
        currentPage={currentPage}
        searchtext={searchtext}
        totalPhotos={totalPhotos}
      />
    </>
  );
}

export default App;
