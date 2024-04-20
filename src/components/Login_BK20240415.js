import React from 'react';
import { Button } from "@mui/material";
import firebase from "firebase/compat/app";
import {auth} from "../firebase";

const Login = () => {
  function loginWithMail() {
    const provider = new firebase.auth.EmailAuthProvider();
    auth.loginWithPopup(provider);
  }

  return (
    <div>
      <Button onClick={loginWithMail}>ログインする</Button>
    </div>
  );
}

export default Login;