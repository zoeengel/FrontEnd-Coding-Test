import React from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Typography from "@mui/material/Typography";
import CelebrationRoundedIcon from "@mui/icons-material/CelebrationRounded";
import BugReportRoundedIcon from "@mui/icons-material/BugReportRounded";

function IssuesList({ issues }) {
  if (!issues || issues.length === 0) {
    return (
      <Typography variant="body2">
        No issues found for this repository.
        <CelebrationRoundedIcon fontSize="large" />
      </Typography>
    );
  }

  return (
    <div>
      <Typography variant="h6" style={{ color: "white", fontWeight: "bold" }}>
        Issues
      </Typography>
      <List style={{ color: "white" }}>
        {issues.map((issue) => (
          <ListItem
            style={{
              backgroundColor: "#24292f",
              borderRadius: 6,
              padding: 3,
              margin: 5,
            }}
            key={issue.id}
            button
            component="a"
            href={issue.html_url}
            target="_blank"
            rel="noreferrer noopener"
          >
            <BugReportRoundedIcon fontSize="x-small" />
            <ListItemText
              primary={
                <Typography
                  variant="body2"
                  style={{
                    fontWeight: "lighter",
                    marginLeft: 6,
                    cursor: "pointer",
                  }}
                  onMouseOver={(event) =>
                    (event.target.style.color = "#1a76d2")
                  }
                  onMouseOut={(event) => (event.target.style.color = "white")}
                >
                  {issue.title}
                </Typography>
              }
            />
          </ListItem>
        ))}
      </List>
    </div>
  );
}

export default IssuesList;
