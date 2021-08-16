import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import Rating from "../Rating/Rating";
import { useHistory } from "react-router-dom";

const useStyles = makeStyles({
  root: {
    maxWidth: 345,
  },
  media: {
    height: 230,
  },
});

const Product = ({ product }) => {
  const classes = useStyles();
  const history = useHistory();

  return (
    <Card
      raised
      className={classes.root}
      onClick={() => history.push(`/product/${product._id}`)}
    >
      <CardActionArea>
        <CardMedia
          className={classes.media}
          image={product.image}
          title="Contemplative Reptile"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            {product.name}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            <Rating
              value={product.rating}
              text={`${product.numReviews} reviews`}
            />
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Typography variant="h4">
          <b>${product.price}</b>
        </Typography>
      </CardActions>
    </Card>
  );
};

export default Product;
