import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import GitHubIcon from "@mui/icons-material/GitHub";

function SearchBar({ setSearchQuery }) {
  const [searchValue, setSearchValue] = useState("");

  const handleSearchChange = (event) => {
    const searchValue = event.target.value;
    setSearchValue(searchValue);
    setSearchQuery(searchValue);
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
      }}
    >
      <GitHubIcon style={{ color: "white", width: 50, height: 50 }} />
      <form onSubmit={(e) => e.preventDefault()}>
        <TextField
          id="search-bar"
          label="Search GitHub Repos..."
          value={searchValue}
          onChange={handleSearchChange}
          style={{
            width: 450,
            borderRadius: 5,
            backgroundColor: "whitesmoke",
          }}
          variant="outlined"
        />
      </form>
    </div>
  );
}

export default SearchBar;
