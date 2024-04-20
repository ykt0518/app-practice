import React from 'react';
import { useForm } from 'react-hook-form';
import { Button, Input } from "@mui/material";
import { useAuth } from '../contexts/AuthContext';
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

  const navigation = useNavigate();

  const { signUp } = useAuth();

  const onSubmit = async (data) => {
    try {
      await signUp(data.email, data.password);
      navigation("/main");
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div className="form_container">
      <h1 className="title">アカウントを作成</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
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
      <p className="back_txt"><Link to="/">Homeに戻る</Link></p>
    </div>
  );
}

export default SignUp;
