import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import Message from "../components/Message/Message";
import Loader from "../components/Loader/Loader";
import {
  Typography,
  Container,
  makeStyles,
  Grid,
  TableRow,
  TableCell,
  IconButton,
} from "@material-ui/core";
import VisibilityIcon from "@material-ui/icons/Visibility";
import HighlightOffIcon from "@material-ui/icons/HighlightOff";
import { Link } from "react-router-dom";
import { getAllOrders } from "../actions/orderActions";
import DataTable from "../components/DataTable/DataTable";

const useStyles = makeStyles((theme) => ({
  orderCard: {
    padding: "50px",
  },
}));

const OrderListScreen = () => {
  const classes = useStyles();
  const history = useHistory();
  const dispatch = useDispatch();
  const [open, setOpen] = useState(true);

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const orderGetAll = useSelector((state) => state.orderGetAll);
  const { orders, loading, error } = orderGetAll;

  useEffect(() => {
    if (!userInfo || !userInfo.isAdmin) {
      history.push("/login");
    } else {
      dispatch(getAllOrders());
    }
  }, [dispatch, userInfo, history]);

  const viewOrderHandler = (id) => {
    history.push(`/orders/${id}`);
  };

  return (
    <Container maxwidth="sm">
      <Grid container direction="row" justifyContent="space-between">
        <Grid item xs={12}>
          <div className={classes.orderCard}>
            <Typography variant="h3">ORDERS</Typography>
            {error && (
              <Message
                close={() => setOpen(false)}
                message={error}
                severity="error"
                open={open}
              />
            )}
            {loading && <Loader size={100} />}
            <Grid container>
              <DataTable
                tableHeadings={[
                  "ID",
                  "USER",
                  "DATE",
                  "TOTAL ($)",
                  "PAID",
                  "DELIVERED",
                  "",
                ]}
                tableContents={
                  orders &&
                  orders.map((order) => (
                    <TableRow key={order._id}>
                      <TableCell component="th" scope="row">
                        {order._id}
                      </TableCell>
                      <TableCell align="left">
                        {order.user && (
                          <Link
                            style={{ cursor: "pointer" }}
                            to={`/admin/users/${order.user._id}/edit`}
                          >
                            {order.user.name}
                          </Link>
                        )}
                      </TableCell>
                      <TableCell align="left">
                        {order.createdAt.substring(0, 10)}
                      </TableCell>
                      <TableCell align="left">${order.totalPrice}</TableCell>
                      <TableCell align="left">
                        {order.isPaid ? (
                          <p style={{ color: "green" }}>
                            {order.paidAt.substring(0, 10)}
                          </p>
                        ) : (
                          <HighlightOffIcon style={{ color: "red" }} />
                        )}
                      </TableCell>
                      <TableCell align="left">
                        {order.isDelivered ? (
                          <p style={{ color: "green" }}>
                            {order.deliveredAt.substring(0, 10)}
                          </p>
                        ) : (
                          <HighlightOffIcon style={{ color: "red" }} />
                        )}
                      </TableCell>
                      <TableCell align="left">
                        <IconButton onClick={() => viewOrderHandler(order._id)}>
                          <VisibilityIcon />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))
                }
              />
            </Grid>
          </div>
        </Grid>
      </Grid>
    </Container>
  );
};

export default OrderListScreen;
