import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Grid } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: "black",
    padding: 50,
  },
  copy: {
    textAlign: "center",
    alignItems: "center",
    color: "white",
  },
}));

const Footer = () => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Grid container>
        <Grid className={classes.copy} item xs={12}>
          Copyright &copy; ProShop
        </Grid>
      </Grid>
    </div>
  );
};

export default Footer;
