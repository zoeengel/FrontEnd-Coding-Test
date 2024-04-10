import React from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Link from "@mui/material/Link";
import Typography from "@mui/material/Typography";
import CelebrationRoundedIcon from "@mui/icons-material/CelebrationRounded";

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
            <ListItemText
              primary={
                <Typography variant="body2" style={{ fontWeight: "lighter" }}>
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
