import { Box, TextField, Button } from "@mui/material";
import "./SearchBar.css";

export default function SearchBar({
  callDebouncedFetch,
  setSearchtext,
  searchtext,
  setPhotos,
}) {
  return (
    <>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          p: 2,
          backgroundColor: "white",
          borderRadius: 2,
          maxWidth: 300,
          margin: "0 auto",
        }}
      >
        <TextField
          fullWidth
          id="outlined-basic"
          label="Search Something..."
          variant="outlined"
          sx={{
            "& label": {
              color: "#6e1a8fff",
            },
            "& label.Mui-focused": {
              color: "#6e1a8fff",
            },
            "& .MuiOutlinedInput-root": {
              "& fieldset": {
                borderColor: "#bd66c5ff",
              },
              "&.Mui-focused fieldset": {
                borderColor: "#390b4eff",
              },
            },
          }}
          value={searchtext}
          onChange={(event) => {
            const value = event.target.value;
            setSearchtext(value);

            if (value.trim() !== "") {
              callDebouncedFetch(value.trim(), 1);
            } else {
              callDebouncedFetch();
            }
          }}
        />
      </Box>

      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          gap: 2,
        }}
      >
        {["books", "coffee", "mobiles", "computers", "technology"].map(
          (keyword) => (
            <Button
              sx={{
                color: "#510d57ff",
                borderColor: "#431047ff",
                borderRadius: "24px",
                fontWeight: "bold",
                transition: "background-color 0.2s ease",
                cursor: "pointer",
                "&:hover": {
                  backgroundColor: "#851a8fff",
                  color: "#fff",
                  borderColor: "#851a8fff",
                },
              }}
              variant="outlined"
              key={keyword}
              onClick={() => {
                setSearchtext(keyword);
                if (keyword.trim() !== "") {
                  callDebouncedFetch(keyword.trim(), 1);
                } else {
                  callDebouncedFetch();
                }
              }}
            >
              {keyword}
            </Button>
          )
        )}
      </Box>
    </>
  );
}
