import "./SearchBar.css";

export default function SearchBar({
  callDebouncedFetch,
  setSearchtext,
  searchtext,
  setPhotos,
}) {
  return (
    <>
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search anything you want..."
          value={searchtext}
          onChange={(event) => {
            const value = event.target.value;
            setSearchtext(value);
            if (value.trim() !== "") {
              callDebouncedFetch(value.trim(), 1);
            } else {
              setPhotos([]);
            }
          }}
        />
      </div>

      <div className="suggested-keywords">
        {["books", "coffee", "mobiles", "computers", "technology"].map(
          (keyword) => (
            <button
              key={keyword}
              onClick={() => {
                setSearchtext(keyword);
                if (keyword.trim() !== "") {
                  callDebouncedFetch(keyword.trim(), 1);
                } else {
                  setPhotos([]);
                }
              }}
            >
              {keyword}
            </button>
          )
        )}
      </div>
    </>
  );
}
