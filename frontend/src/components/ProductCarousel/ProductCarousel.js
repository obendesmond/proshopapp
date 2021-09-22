import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import MobileStepper from "@material-ui/core/MobileStepper";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import KeyboardArrowLeft from "@material-ui/icons/KeyboardArrowLeft";
import KeyboardArrowRight from "@material-ui/icons/KeyboardArrowRight";
import IconButton from "@material-ui/core/IconButton";
import { listTopProducts } from "../../actions/productActions";
import Loader from "../Loader/Loader";
import Message from "../Message/Message";
import ItemsCarousel from "react-items-carousel";
import Product from "../Product/Product";

const useStyles = makeStyles((theme) => ({
  root: {
    margin: "20px",
  },
}));

export default function ProductCarousel() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [open, setOpen] = useState(true);
  const [activeItemIndex, setActiveItemIndex] = useState(0);
  const noOfCards = 2;
  const chevronWidth = 40;

  const productTopRated = useSelector((state) => state.productTopRated);
  const { products, loading, error } = productTopRated;

  useEffect(() => {
    dispatch(listTopProducts());
  }, [dispatch]);

  return loading ? (
    <Loader size={40} />
  ) : error ? (
    <Message
      message={error}
      close={() => setOpen(false)}
      open={open}
      severity="error"
    />
  ) : (
    <Grid container justifyContent="center" className={classes.root}>
      <Grid item sm={12}>
        <div style={{ padding: `0 ${chevronWidth}px` }}>
          <ItemsCarousel
            requestToChangeActive={setActiveItemIndex}
            activeItemIndex={activeItemIndex}
            numberOfCards={noOfCards}
            infiniteLoop
            gutter={20}
            leftChevron={
              <IconButton>
                <KeyboardArrowLeft />
              </IconButton>
            }
            rightChevron={
              <IconButton>
                <KeyboardArrowRight />
              </IconButton>
            }
            outsideChevron
            chevronWidth={chevronWidth}
          >
            {products.map((product) => (
              <Product isProductCarousel={true} product={product} />
            ))}
          </ItemsCarousel>
        </div>
      </Grid>
    </Grid>
  );
}
