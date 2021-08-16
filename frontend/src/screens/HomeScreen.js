import React from "react";
import { Grid, makeStyles } from "@material-ui/core";
import Product from "../components/Product/Product";
import products from "../products";

const useStyles = makeStyles((theme) => ({
  con: {
    margin: "50px 0 50px 0",
  },
  smcon: {
    marginBottom: "10px",
  },
}));

const HomeScreen = () => {
  const classes = useStyles();
  return (
    <>
      <h1>Latest Products</h1>
      <Grid
        className={classes.con}
        container
        direction="row"
        justifyContent="center"
        spacing={3}
      >
        {products.map((product) => (
          <Grid
            className={classes.smcon}
            key={product._id}
            item
            xs={12}
            sm={6}
            md={4}
          >
            <Product product={product} />
          </Grid>
        ))}
      </Grid>
    </>
  );
};

export default HomeScreen;
