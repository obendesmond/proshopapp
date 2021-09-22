import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import { IconButton, InputBase, Paper } from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";

const useStyles = makeStyles((theme) => ({
  root: {
    padding: "2px 4px",
    display: "flex",
    alignItems: "center",
    width: 400,
    marginLeft: "10px",
  },
  input: {
    marginLeft: theme.spacing(1),
    flex: 1,
    border: "none",
  },
  iconButton: {
    padding: 10,
  },
  divider: {
    height: 28,
    margin: 4,
  },
}));

export default function SearchBox() {
  const classes = useStyles();
  const history = useHistory();
  const [keyword, setKeyword] = useState("");

  const submitHandler = (e) => {
    e.preventDefault();
    if (keyword.trim()) {
      history.push(`/search/${keyword}`);
      setKeyword("");
    } else {
      history.push("/");
    }
  };

  return (
    <Paper
      component="form"
      onSubmit={(e) => submitHandler(e)}
      className={classes.root}
    >
      <IconButton className={classes.iconButton} aria-label="menu">
        {/* <MenuIcon /> */}
      </IconButton>
      <InputBase
        className={classes.input}
        placeholder="Search Products"
        inputProps={{ "aria-label": "search google maps" }}
        value={keyword}
        onChange={(e) => setKeyword(e.target.value)}
      />
      <IconButton
        type="submit"
        className={classes.iconButton}
        aria-label="search"
        onClick={(e) => submitHandler(e)}
      >
        <SearchIcon />
      </IconButton>
    </Paper>
  );
}
