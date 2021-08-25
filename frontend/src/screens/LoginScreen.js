import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/Message/Message";
import Loader from "../components/Loader/Loader";
import { login } from "../actions/userActions";
import {
  Typography,
  Container,
  Card,
  CardContent,
  CardActions,
  makeStyles,
} from "@material-ui/core";
import Form from "../components/Form/Form";

const useStyles = makeStyles((theme) => ({
  card: {
    minWidth: 275,
    maxWidth: 500,
    marginTop: "50px",
    marginRight: "auto",
    marginLeft: "auto",
    alignSelf: "center",
  },
  reg: {
    marginBottom: "10px",
  },
  regInstead: {
    cursor: "pointer",
    color: "blue",
  },
}));

const LoginScreen = (props) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [open, setOpen] = useState(true);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const userLogin = useSelector((state) => state.userLogin);
  const { error, loading, userInfo } = userLogin;

  const redirect = props.location.search
    ? props.location.search.split("=")[1]
    : "/";

  useEffect(() => {
    if (userInfo) {
      props.history.push(redirect);
    }
  }, [props.history, userInfo, redirect]);

  const handleLogin = () => {
    dispatch(login(email, password));
  };

  return (
    <Container maxwidth="sm">
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
          <Typography variant="h4">SIGN IN</Typography>
          {loading && <Loader size={100} />}
          <Form
            error={error && true}
            handleFormSubmit={handleLogin}
            email={email}
            setEmail={setEmail}
            password={password}
            setPassword={setPassword}
            submitBtnText="Login"
          />
        </CardContent>
        <CardActions>
          <Typography className={classes.reg}>
            Don't have an account?{" "}
            <span
              className={classes.regInstead}
              onClick={() =>
                props.history.push(
                  redirect ? `/register?redirect=${redirect}` : "/register"
                )
              }
            >
              {" "}
              Register Instead
            </span>
          </Typography>
        </CardActions>
      </Card>
    </Container>
  );
};

export default LoginScreen;
