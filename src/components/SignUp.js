import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Button, Input } from "@mui/material";
import { useAuth } from '../contexts/AuthContext.js';
import { validationSchema } from '../utils/validationSchema.ts';
import { zodResolver } from '@hookform/resolvers/zod';
import { Link, useNavigate } from "react-router-dom";

const SignUp = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isDirty, isValid }
  } = useForm({
    mode: 'onChange',
    resolver: zodResolver(validationSchema),
  });

  const [error, setError] = useState("");

  const navigation = useNavigate();

  const { signUp } = useAuth();

  const onSubmit = async (data) => {
    try {
      await signUp(data.email, data.password);
      navigation("/main");
    } catch (error) {
      if (error.code === "auth/email-already-in-use") {
        setError("すでに登録されているメールアドレスです");
      } else {
        console.log(error.message);
      }
    }
  };

  return (
    <div className="form_container">
      <h1 className="title">アカウントを作成</h1>
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
          <p className="error_txt">{errors.email?.message}</p>
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
          <p className="error_txt">{errors.password?.message}</p>
        </div>
        <div className="form_item">
          <Input
            style={{
              width: "100%",
              fontSize: "16px",
              fontWeight: "500",
            }}
            type="password"
            id="passwordConfirm"
            name="passwordConfirm"
            placeholder="パスワード（確認用）"
            {...register('passwordConfirm')}
          />
          <p className="error_txt">{errors.passwordConfirm?.message}</p>
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
          サインイン
        </Button>
      </form>
      <div className="login_under">
        <p className="back_txt"><Link to ="/login">ログイン</Link></p>
        <p className="back_txt"><Link to ="/">Homeに戻る</Link></p>
      </div>
    </div>
  );
}

export default SignUp;
