import { createContext } from "react";

export const BookmarkContext = createContext({
  likedPhotos: [],
  toggleLike: () => {},
  isSidebarOpen: false,
  setIsSidebarOpen: () => {},
});
