import { Typography } from "@material-ui/core";
import React from "react";

const CartScreen = (props) => {
  const id = props.match.params.id;
  const qty = props.match.params.qty;
  return (
    <div>
      <Typography>
        ID is {id} and QTY is {qty}
      </Typography>
    </div>
  );
};

export default CartScreen;
