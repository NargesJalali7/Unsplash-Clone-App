import { createContext, Dispatch, SetStateAction } from "react";
import { PhotoType } from "./App.types";

type BookmarkContextType = {
  likedPhotos: PhotoType[];
  toggleLike: (photo: PhotoType) => void;
  isSidebarOpen: boolean;
  setIsSidebarOpen: Dispatch<SetStateAction<boolean>>;
};

export const BookmarkContext = createContext<BookmarkContextType>({
  likedPhotos: [],
  toggleLike: () => {},
  isSidebarOpen: false,
  setIsSidebarOpen: () => {},
});
