import React, { useState, useEffect } from "react";
import axios from "axios";
import { PieChart, Pie, Sector, Cell } from "recharts";
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
import { Margin, Padding } from "@mui/icons-material";

function SearchResultCard({ result }) {
  const [repoIssues, setRepoIssues] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedRepoId, setSelectedRepoId] = useState(null);
  const [filter, setFilter] = useState("open");
  const [issueCounts, setIssueCounts] = useState({ open: 0, closed: 0 });

  const calculateIssueCounts = (issues) => {
    const openCount = issues.filter((issue) => issue.state === "open").length;
    const closedCount = issues.filter(
      (issue) => issue.state === "closed"
    ).length;
    return { open: openCount, closed: closedCount };
  };

  const handleFilterChange = (event) => {
    setFilter(event.target.value);
  };

  //   const handleListIssues = async (repoOwner, repoName) => {
  //     setIsLoading(true); // Set loading state
  //     setError(null); // Clear previous errors

  //     try {
  //       const response = await axios.get(
  //         `https://api.github.com/repos/${repoOwner}/${repoName}/issues`
  //       ); // Fetch all issues (no filter)
  //       setRepoIssues(response.data);
  //       setIssueCounts(calculateIssueCounts(response.data)); // Update issue counts
  //     } catch (error) {
  //       console.error("Error fetching issues:", error);
  //       setError(error.message); // Update state with error message
  //     } finally {
  //       setIsLoading(false); // Clear loading state
  //     }
  //   };
  const handleListIssues = async (repoOwner, repoName, filter = "open") => {
    setIsLoading(true); // Set loading state
    setError(null); // Clear previous errors
    console.log("handle list issues click");

    try {
      const response = await axios.get(
        `https://api.github.com/repos/${repoOwner}/${repoName}/issues?state=${filter}`
      );
      setRepoIssues(response.data);
      setIssueCounts(calculateIssueCounts(response.data));
      console.log(repoIssues);
    } catch (error) {
      console.error("Error fetching issues:", error);
    } finally {
      setIsLoading(false);
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
          {result.open_issues} open issues
        </Typography>
        <Button
          style={{ color: "transparent", backgroundColor: "transparent" }}
          variant="contained"
          size="small"
          onClick={() => handleListIssues(result.owner.login, result.name)}
        >
          View issues
        </Button>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
          }}
        >
          {issueCounts.open > 0 || issueCounts.closed > 0 ? (
            <PieChart width={550} height={200}>
              <Pie
                data={[
                  // Always include both open and closed data
                  { name: "Open", value: issueCounts.open },
                  { name: "Closed", value: issueCounts.closed },
                ]}
                cx={260}
                cy={100}
                outerRadius={80}
                innerRadius={40}
                labelLine={false}
                label={({ name, value }) => `${name}: ${value}`}
              >
                {issueCounts && ( // Render cells only if data exists
                  <>
                    <Cell key="open" fill="#f44336" />
                    <Cell key="closed" fill="#2ecc71" />
                  </>
                )}
              </Pie>
            </PieChart>
          ) : null}
        </div>
        {repoIssues.length > 0 && <IssuesList issues={repoIssues} />}
        <br />
        <Button
          variant="contained"
          size="small"
          onClick={() =>
            handleListIssues(result.owner.login, result.name, filter)
          }
          style={{ marginRight: 8 }}
        >
          View issues ({filter})
        </Button>
        <Button
          variant="outlined"
          size="small"
          value="closed"
          onClick={handleFilterChange}
          style={{ marginRight: 8 }}
        >
          Closed
        </Button>
        <Button
          variant="outlined"
          size="small"
          value="open"
          onClick={handleFilterChange}
        >
          Open
        </Button>
      </CardContent>
    </Card>
  );
}

export default SearchResultCard;
