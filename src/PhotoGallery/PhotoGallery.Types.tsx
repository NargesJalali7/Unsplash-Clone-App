import { PhotoType } from "../App.types";

export type PhotoGalleryProps = {
  photos: PhotoType[];
  fetchPhotos: (query: string, page: number) => void;
  searchtext: string;
  currentPage: number;
  totalPhotos: number;
  picturesPerPage: number;
  toggleLike: (photo: PhotoType) => void;
  likedPhotos: PhotoType[];
};

