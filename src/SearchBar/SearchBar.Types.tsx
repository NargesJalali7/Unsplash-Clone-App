export type SearchBarProps = {
  callDebouncedFetch: (query?: string, page?: number) => void;
  setSearchtext: React.Dispatch<React.SetStateAction<string>>;
  searchtext: string;
};