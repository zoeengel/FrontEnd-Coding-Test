import React, { useState, useEffect } from "react";
import axios from "axios";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader";
import Typography from "@mui/material/Typography";
import LinkIcon from "@mui/icons-material/Link";
import StarBorderRoundedIcon from "@mui/icons-material/StarBorderRounded";
import CallSplitRoundedIcon from "@mui/icons-material/CallSplitRounded";
import BugReportRoundedIcon from "@mui/icons-material/BugReportRounded";
import Button from "@mui/material/Button";
import Link from "@mui/material/Link";
import IssuesList from "./IssuesList";

function SearchResultCard({ result }) {
  const [repoIssues, setRepoIssues] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedRepoId, setSelectedRepoId] = useState(null);

  const handleListIssues = async (repoOwner, repoName) => {
    setIsLoading(true); // Set loading state
    setError(null); // Clear previous errors
    console.log("handle list issues click");

    try {
      const response = await axios.get(
        `https://api.github.com/repos/${repoOwner}/${repoName}/issues`
      );
      setRepoIssues(response.data); // Update state with fetched issues
      console.log(repoIssues);
    } catch (error) {
      console.error("Error fetching issues:", error);
      setError(error.message); // Update state with error message
    } finally {
      setIsLoading(false); // Clear loading state
    }
  };

  return (
    <Card
      style={{
        width: "40em",
        backgroundColor: "#000814",
        alignSelf: "center",
        justifyContent: "center",
      }}
    >
      <CardHeader
        title={
          <Link
            href={result.html_url}
            target="_blank"
            rel="noreferrer noopener"
            underline="hover"
          >
            {result.name} {""}
            <LinkIcon
              style={{ alignItems: "center", alignContent: "center" }}
            />
          </Link>
        }
      />
      <CardContent>
        <Typography variant="body2" color="grey">
          <b>About</b> <br /> {result.description}
        </Typography>
        <br />
        <Typography
          variant="body2"
          color="grey"
          style={{ display: "flex", alignContent: "center" }}
        >
          <LinkIcon fontSize="small" />{" "}
          <Link
            href={result.html_url}
            target="_blank"
            rel="noreferrer noopener"
            underline="none"
          >
            {result.url}
          </Link>
        </Typography>
        <Typography
          variant="body2"
          color="grey"
          style={{ display: "flex", alignContent: "center" }}
        >
          <CallSplitRoundedIcon fontSize="small" /> {result.forks} forks
        </Typography>
        <Typography
          variant="body2"
          color="grey"
          style={{ display: "flex", alignContent: "center" }}
        >
          <StarBorderRoundedIcon fontSize="small" /> {""}
          {result.stargazers_count} stars
        </Typography>
        <Typography
          variant="body2"
          color="grey"
          style={{ display: "flex", alignContent: "center" }}
        >
          <BugReportRoundedIcon fontSize="small" /> {""}
          {result.open_issues} issues
        </Typography>
        <Button
          variant="contained"
          size="small"
          onClick={() => handleListIssues(result.owner.login, result.name)}
        >
          View issues
        </Button>
        {repoIssues.length > 0 && (
          <IssuesList issues={repoIssues} /> // Pass issues data to IssuesList component
        )}
      </CardContent>
    </Card>
  );
}

export default SearchResultCard;
