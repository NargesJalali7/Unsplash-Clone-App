import { Box, TextField, Button } from "@mui/material";
import { SearchBarProps } from "./SearchBar.Types";
import "./SearchBar.css";

export default function SearchBar ({
  callDebouncedFetch,
  setSearchtext,
  searchtext,
}: SearchBarProps ) {
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
            width: { xs: "100%", sm: 300 },
            input: {
              fontSize: { xs: "0.9rem", sm: "1rem", md: "1.1rem" },
              padding: "16.5px 14px",
            },
            label: {
              fontSize: { xs: "0.8rem", sm: "0.9rem", md: "1rem" },
            },
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
          flexWrap: "wrap",
          gap: { xs: 1, sm: 2, md: 3 },
        }}
      >
        {["books", "coffee", "mobiles", "computers", "technology"].map(
          (keyword) => (
            <Button
              size="small"
              sx={{
                p: { xs: 0.5, sm: 1, md: 1.5 },
                fontSize: { xs: 7, sm: 14, md: 17 },
                minWidth: { xs: 60, sm: 80, md: 100 },
                whiteSpace: "normal",
                wordBreak: "break-word",
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
};

