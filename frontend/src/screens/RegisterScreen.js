import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/Message/Message";
import Loader from "../components/Loader/Loader";
import { register } from "../actions/userActions";
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
}));

const RegisterScreen = (props) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [open, setOpen] = useState(true);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const userRegister = useSelector((state) => state.userRegister);
  const { error, loading, userInfo } = userRegister;

  const redirect = props.location.search
    ? props.location.search.split("=")[1]
    : "/";

  useEffect(() => {
    if (userInfo) {
      props.history.push("/");
    }
  }, [props.history, userInfo, redirect]);

  const handleRegister = () => {
    if (confirmPassword !== password) {
      return alert("Passwords do not match");
    } else {
      dispatch(register(name, email, password));
    }
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
          <Typography variant="h4">SIGN UP</Typography>
          {loading && <Loader size={100} />}
          <Form
            error={error && true}
            handleFormSubmit={handleRegister}
            isRegisterForm={true}
            name={name}
            setName={setName}
            email={email}
            setEmail={setEmail}
            password={password}
            setPassword={setPassword}
            confirmPassword={confirmPassword}
            setConfirmPassword={setConfirmPassword}
            submitBtnText="Register"
          />
        </CardContent>
        <CardActions>
          <Typography className={classes.reg}>
            Already have an account?{" "}
            <span
              className={classes.regInstead}
              onClick={() =>
                props.history.push(
                  redirect ? `/login?redirect=${redirect}` : "/login"
                )
              }
            >
              {" "}
              Login Instead
            </span>
          </Typography>
        </CardActions>
      </Card>
    </Container>
  );
};

export default RegisterScreen;
