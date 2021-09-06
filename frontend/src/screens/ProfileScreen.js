import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/Message/Message";
import Loader from "../components/Loader/Loader";
import { getUserDetails, updateUserProfile } from "../actions/userActions";
import {
  Typography,
  Container,
  Card,
  CardContent,
  makeStyles,
  Grid,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import Form from "../components/Form/Form";
import { useHistory } from "react-router-dom";
import { getOrders } from "../actions/orderActions";

const useStyles = makeStyles((theme) => ({
  card: {
    minWidth: 275,
    maxWidth: 500,
    margin: "50px auto 50px auto",
    alignSelf: "center",
  },
  reg: {
    marginBottom: "10px",
  },
  regInstead: {
    cursor: "pointer",
    color: "blue",
  },
  orderCard: {
    padding: "50px",
  },
  listItemContainer: {
    width: "100%",
  },
  listItem: {
    width: "100%",
    padding: "20px",
    marginBottom: "5px",
    // backgroundColor: "lightgrey",
  },
}));

const ProfileScreen = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const history = useHistory();
  const [open, setOpen] = useState(true);
  const [orderOpen, setOrderOpen] = useState(true);
  const [successOpen, setSuccessOpen] = useState(true);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const userDetails = useSelector((state) => state.userDetails);
  const { error, loading, user } = userDetails;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const userUpdateProfile = useSelector((state) => state.userUpdateProfile);
  const { success } = userUpdateProfile;

  const orderGet = useSelector((state) => state.orderGet);
  const { error: orderError, loading: orderLoading, orders } = orderGet;

  useEffect(() => {
    if (!userInfo) {
      history.push("/login");
    } else {
      if (!user || !user.name) {
        dispatch(getUserDetails("profile"));
        dispatch(getOrders());
      } else {
        setName(user.name);
        setEmail(user.email);
      }
    }
  }, [dispatch, history, userInfo, user]);

  const handleProfileUpdate = () => {
    if (confirmPassword !== password) {
      return alert("Passwords do not match");
    } else {
      dispatch(updateUserProfile({ id: user._id, name, email, password }));
    }
  };

  return (
    <Container maxwidth="sm">
      <Grid container direction="row" justifyContent="space-between">
        <Grid item xs={12} md={4}>
          <Card className={classes.card} raised>
            <CardContent>
              {error && (
                <Message
                  close={() => setOpen(false)}
                  message={error}
                  severity="error"
                  open={open}
                />
              )}
              {success && (
                <Message
                  close={() => setSuccessOpen(false)}
                  message="Successfully updated profile"
                  open={successOpen}
                />
              )}
              <Typography variant="h5" style={{ margin: "10px 0 20px 0" }}>
                USER PROFILE
              </Typography>
              {loading && <Loader size={100} />}
              <Form
                handleFormSubmit={handleProfileUpdate}
                isRegisterForm={true}
                name={name}
                setName={setName}
                email={email}
                setEmail={setEmail}
                password={password}
                setPassword={setPassword}
                confirmPassword={confirmPassword}
                setConfirmPassword={setConfirmPassword}
                submitBtnText="Update Profile"
              />
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={8}>
          <div className={classes.orderCard}>
            <Typography variant="h4">Order Details</Typography>
            {orderError && (
              <Message
                close={() => setOrderOpen(false)}
                message={orderError}
                severity="error"
                open={orderOpen}
              />
            )}
            {orderLoading && <Loader size={100} />}
            <Grid container>
              <List
                component="nav"
                aria-label="main mailbox folders"
                className={classes.listItemContainer}
              >
                {orders?.map((order) => (
                  <ListItem
                    onClick={() => history.push(`/orders/${order._id}`)}
                    className={classes.listItem}
                    key={order._id}
                    button
                  >
                    <ListItemText>
                      <Typography> ORDER_ID: {order._id}</Typography>
                    </ListItemText>
                    <ListItemIcon>
                      <DeleteIcon />
                    </ListItemIcon>
                  </ListItem>
                ))}
              </List>
            </Grid>
          </div>
        </Grid>
      </Grid>
    </Container>
  );
};

export default ProfileScreen;
