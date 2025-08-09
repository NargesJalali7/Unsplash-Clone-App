export type PhotoType = {  // use this to type photos, likedPhotos, and API data.
  id: string;
  urls: {
    regular: string;
    small: string;
    thumb: string;
  };
  alt_description: string | null;
  likes: number;
  user: {
    name: string;
    portfolio_url: string | null;
  };
};

