import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Button, Input } from "@mui/material";
import { useAuth } from '../contexts/AuthContext';
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { isDirty, isValid }
  } = useForm();

  const [error, setError] = useState("");
  // const [login, setLogin] = useState(false);

  const navigation = useNavigate();

  const { login } = useAuth();

  const onSubmit = async (data) => {
    try {
      await login(data.email, data.password);
      navigation("/main");
    } catch (error) {
      if (error.code === "auth/invalid-email") {
        setError("メールアドレスまたはパスワードが正しくありません");
      } else if (error.code === "auth/wrong-password") {
        setError("メールアドレスまたはパスワードが正しくありません");
      } else {
        console.log(error.message);
      }
    }
  };

  return (
    <div className="form_container">
      <h1 className="title">ログイン</h1>
      <form className="mgb30" onSubmit={handleSubmit(onSubmit)}>
        <div className="form_item">
          <Input
            style={{
              width: "100%",
              fontSize: "16px",
              fontWeight: "500",
            }}
            type="email"
            id="email"
            name="email"
            placeholder="abc@sample.com"
            {...register('email')}
          />
          <p className="error_txt">{error}</p>
        </div>
        <div className="form_item">
          <Input
            style={{
              width: "100%",
              fontSize: "16px",
              fontWeight: "500",
            }}
            type="password"
            id="password"
            name="password"
            placeholder="パスワード"
            {...register('password')}
          />
          <p className="error_txt">{error}</p>
        </div>
        <Button
          style={{
            marginTop: "20px",
          }}
          type="submit"
          disabled={!isDirty || !isValid}
          variant="contained"
          onClick={onSubmit}
        >
          ログイン
        </Button>
      </form>
      <div className="login_under">
        <p className="back_txt"><Link to ="/signup">サインアップ</Link></p>
        <p className="back_txt"><Link to ="/">Homeに戻る</Link></p>
      </div>
    </div>
  );
}

export default Login;
