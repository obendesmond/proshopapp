import React, { useState } from "react";
import {
  FormControl,
  InputLabel,
  Grid,
  Input,
  InputAdornment,
  IconButton,
  makeStyles,
  Button,
} from "@material-ui/core";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import EmailIcon from "@material-ui/icons/Email";
import PersonIcon from "@material-ui/icons/Person";

const useStyles = makeStyles((theme) => ({
  formControl: {
    width: "100%",
    marginBottom: "40px",
  },
}));

const Form = ({
  error,
  handleFormSubmit,
  name,
  setName,
  email,
  setEmail,
  password,
  setPassword,
  confirmPassword,
  setConfirmPassword,
  isRegisterForm,
  submitBtnText,
  children,
  isUserEditForm,
  isProductEditForm,
}) => {
  const classes = useStyles();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };
  const handleShowConfirmPassword = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  return (
    <Grid container justifyContent="space-between">
      {isRegisterForm ||
        ((isUserEditForm || isProductEditForm) && (
          <FormControl className={classes.formControl}>
            <InputLabel htmlFor="name-input">Name</InputLabel>
            <Input
              erro={error && true}
              id="name-input"
              value={name}
              onChange={(e) => setName(e.target.value)}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="show name icon"
                    onMouseDown={(e) => e.preventDefault()}
                  >
                    <PersonIcon />
                  </IconButton>
                </InputAdornment>
              }
            />
          </FormControl>
        ))}

      {!isProductEditForm && (
        <FormControl className={classes.formControl}>
          <InputLabel htmlFor="email-input">Email</InputLabel>
          <Input
            erro={error && true}
            id="email-input"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="show email icon"
                  onMouseDown={(e) => e.preventDefault()}
                >
                  <EmailIcon />
                </IconButton>
              </InputAdornment>
            }
          />
        </FormControl>
      )}

      {password || setPassword ? (
        <FormControl className={classes.formControl}>
          <InputLabel htmlFor="password-input">Password</InputLabel>
          <Input
            error={error && true}
            id="password-input"
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleShowPassword}
                  onMouseDown={(e) => e.preventDefault()}
                >
                  {showPassword ? <Visibility /> : <VisibilityOff />}
                </IconButton>
              </InputAdornment>
            }
          />
        </FormControl>
      ) : null}

      {isRegisterForm && (
        <FormControl className={classes.formControl}>
          <InputLabel htmlFor="confirm-password-input">
            Confirm Password
          </InputLabel>
          <Input
            error={error && true}
            id="confirm-password-input"
            type={showConfirmPassword ? "text" : "password"}
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleShowConfirmPassword}
                  onMouseDown={(e) => e.preventDefault()}
                >
                  {showConfirmPassword ? <Visibility /> : <VisibilityOff />}
                </IconButton>
              </InputAdornment>
            }
          />
        </FormControl>
      )}
      {/* include other fields as children */}
      {children}
      <FormControl className={classes.formControl}>
        <Button onClick={handleFormSubmit} variant="outlined" color="primary">
          {submitBtnText}
        </Button>
      </FormControl>
    </Grid>
  );
};

Form.defaultProps = {
  isRegisterForm: false,
  isUserEditForm: false,
  isProductEditForm: false,
};

export default Form;
