import HeroSection from "./HeroSection/HeroSection";
import BookMarkList from "./BookMark/BookMark";
import SearchBar from "./SearchBar/SearchBar";
import PhotoGallery from "./PhotoGallery/PhotoGallery";
import "./App.css";
import { useState, useRef, useEffect } from "react";
import { BookmarkContext } from "./BookmarkContext";
import { PhotoType } from "./App.types";

function App() {
  const [photos, setPhotos] = useState<PhotoType[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchtext, setSearchtext] = useState("");
  const [totalPhotos, setTotalPhotos] = useState(0);
  const [likedPhotos, setLikedPhotos] = useState<PhotoType[]>([]);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)

  const accessKey = "e-BkdQ9oYva6jfie_WTzp-U2AP_H7ltt1ZLKDybO6d0";
  const picturesPerPage = 7;
  const debounceRef = useRef<((query: string, page?: number) => void) & { cancel?: () => void } | null>(null);
  const fetchPhotos = (query: string = "nature", page: number = 1) => {
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


  const debounce = <T extends (...args: any[]) => void>(func: T, delay: number) => {
    let timeoutId: ReturnType<typeof setTimeout>;

    const debounced = (...args: Parameters<T>) => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        func(...args);
      }, delay);
    };

    debounced.cancel = () => {
      clearTimeout(timeoutId);
    };

    return debounced;
  };


  useEffect(() => {
    debounceRef.current = debounce(fetchPhotos, 500);
    callDebouncedFetch();
    return () => {
      debounceRef.current?.cancel?.();
    };
  }, []);

  const callDebouncedFetch = (query: string = "nature", page: number = 1) => {
    if (debounceRef.current) {
      debounceRef.current(query, page);
    }
  };

  const toggleLike = (photo: PhotoType) => {
    let newLikedPhotos: PhotoType[];

    if (likedPhotos.some((obj) => obj.id === photo.id)) {
      newLikedPhotos = likedPhotos.filter((obj) => obj.id !== photo.id);
    } else {
      newLikedPhotos = [...likedPhotos, photo];
    }
    setLikedPhotos(newLikedPhotos);
    localStorage.setItem("likedPhotos", JSON.stringify(newLikedPhotos));
  };

    useEffect(() => {
    const savedPhotos = localStorage.getItem("likedPhotos");
    if (savedPhotos) {
      try {
        const parsed = JSON.parse(savedPhotos);
        if (Array.isArray(parsed)) {
          setLikedPhotos(parsed);
        }
      } catch (e) {
        console.error("Failed to parse saved liked photos.");
      }
    }
  }, []);


  return (
    <>
      <BookmarkContext.Provider
        value={{ likedPhotos, toggleLike, isSidebarOpen, setIsSidebarOpen }}
      >
        <HeroSection />
        <BookMarkList />
      </BookmarkContext.Provider>

      <SearchBar
        searchtext={searchtext}
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
        toggleLike={toggleLike}
        likedPhotos={likedPhotos}
      />
    </>
  );
}

export default App;
