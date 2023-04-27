import * as React from "react";
import PropTypes from "prop-types";
import Typography from "@mui/material/Typography";
import { Button } from "@mui/material";
import { useDispatch } from "react-redux";
import { logout } from "../Redux/loginSlice";

function Title(props) {
  const dispatch = useDispatch();
  const handleLogout = () => {
    localStorage.removeItem("token");
    dispatch(logout());
  };
  return (
    <Typography component="h2" variant="h6" color="primary" gutterBottom>
      {props.children}
      <Button onClick={handleLogout} variant="contained" size="small">
        {" "}
        Cerrar sesión
      </Button>
    </Typography>
  );
}

Title.propTypes = {
  children: PropTypes.node,
};

export default Title;
