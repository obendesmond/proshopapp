import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Pagination } from "@material-ui/lab";

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      marginTop: theme.spacing(2),
    },
  },
}));

export default function Paginate({ pages, page, handlePageChange }) {
  const classes = useStyles();

  return (
    pages > 1 && (
      <div className={classes.root}>
        <Pagination
          page={page}
          count={pages}
          color="primary"
          onChange={handlePageChange}
        />
      </div>
    )
  );
}
