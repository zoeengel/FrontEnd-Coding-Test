import React, { useState, useEffect } from "react";
import SearchBar from "./Search";
import SearchResultCard from "./SearchResultCard";
import axios from "axios";
import Typography from "@mui/material/Typography";
import "./LandingPage.css";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import CircularProgress from "@mui/material/CircularProgress";
import { Link as OtherLink } from "react-router-dom";

function LandingPage() {
  const [searchText, setSearchText] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedRepoId, setSelectedRepoId] = useState(null);

  const handleFetchSearchResults = async (searchQuery) => {
    setIsLoading(true);
    setError(null); // Clear previous errors

    try {
      const response = await axios.get(
        `https://api.github.com/search/repositories?q=${searchQuery}`
      );
      setSearchResults(response.data.items);
      console.log(response.data.items);
    } catch (error) {
      console.error("Error fetching search results:", error);
      <Typography>Oops, something went wrong...</Typography>;
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (searchText) {
      handleFetchSearchResults(searchText);
    }
  }, [searchText]); // Call API on searchText change

  return (
    <div className="landing-section">
      <SearchBar setSearchQuery={setSearchText} />
      <div className="card-container">
        {isLoading ? (
          <Typography className="preloaded-text">
            <CircularProgress />
          </Typography>
        ) : error ? (
          <Typography>Error: {error}</Typography>
        ) : searchResults.length > 0 ? (
          <List>
            {searchResults.map((result) => (
              <ListItem key={result.id}>
                <SearchResultCard
                  result={result}
                  //   setSelectedRepoId={handleRepoSelection}
                />
              </ListItem>
            ))}
          </List>
        ) : (
          <Typography className="preloaded-text">
            Start your repo search!
          </Typography>
        )}
      </div>
    </div>
  );
}

export default LandingPage;
