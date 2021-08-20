import React from "react";
import { CircularProgress, Grid } from "@material-ui/core";

const Loader = ({ size }) => {
  return (
    <Grid container justifyContent="center" alignItems="center">
      <CircularProgress size={size} />
    </Grid>
  );
};

Loader.defaultProps = {
  size: 40,
};

export default Loader;
