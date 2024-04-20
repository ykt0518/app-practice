import React, { useEffect, useReducer, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Button } from "@mui/material";
import { Input } from "@mui/material";
import { useAuth } from '../contexts/AuthContext';

const initialState = {
  email: "",
  password: "",
  passwordConfirm: "",
  isButtonDisabled: true,
  helpertext: "",
  iserror: false
};

const reducer = (state, action) => {
  switch (action.type) {
    case "setEmail":
      return {
        ...state,
        email: action.payload
      };
    case "setPassword":
      return {
        ...state,
        password: action.payload
      };
    case "setPasswordConfirm":
      return {
        ...state,
        passwordConfirm: action.payload
      };
    case "setIsButtonDisabled":
      return {
        ...state,
        isButtonDisabled: action.payload
      };
    case "signUpSuccess":
      return {
        ...state,
        helpertext: action.payload,
        isError: false
      };
    case "signUpFailed":
      return {
        ...state,
        helpertext: action.payload,
        isError: true
      };
    case "setIserror":
      return {
        ...state,
        isError: action.payload
      };
    default:
      return state;
  }
};

const SignUp = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { signUp } = useAuth();
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const { register, handleSubmit, formState: { errors }, trigger } = useForm();

  useEffect(() => {
    if (state.password.trim() !== state.passwordConfirm.trim()) {
      dispatch({
        type: "setIsButtonDisabled",
        payload: true
      });
    } else if (state.email.trim() && state.password.trim()) {
      dispatch({
        type: "setIsButtonDisabled",
        payload: false
      });
    } else {
      dispatch({
        type: "setIsButtonDisabled",
        payload: true
      });
    }
  }, [state.email, state.password, state.passwordConfirm]);

  // const handleSignUp = () => {
  //   if(state.email === "abc@email.com" && state.password === "password") {
  //     dispatch({
  //       type: "signUpSuccess",
  //       payload: "SignUp Successfully"
  //     });
  //   } else {
  //     dispatch({
  //       type: "signUpFailed",
  //       payload: "Incorrect email or password"
  //     });
  //   }
  // };

  async function handleSignUp(data) {
    // event.preventDefault();
    try {
      setError("");
      setSuccessMessage("");
      dispatch({
        type: "setIsButtonDisabled",
        payload: true
      });
      await signUp(state.email, state.passwordConfirm);
      dispatch({
        type: "signUpSuccess",
        payload: "SignUp Successfully"
      });
      dispatch({
        type: "setIsButtonDisabled",
        payload: false
      });
      setSuccessMessage("アカウントの作成に成功しました");
    } catch (e) {
      console.log(e);
      switch (e.code) {
        case "auth/network-request-failed":
          setError("通信がえらーになったか、またはタイムアウトになりました。通信環境が良い所で再度やり直してください。");
          break;
        case "auth/weak-password":
          setError("パスワードが短すぎます。6文字以上を入力してください。");
          break;
        case "auth/invalid-email":
          setError("メールアドレスが正しくありません。");
          break;
        case "auth/email-already-in-use":
          setError("メールアドレスがすでに使用されています。ログインするか別のメールアドレスで作成してください。");
          break;
        case "auth/user-disabled":
          setError("入力されたメールアドレスは無効（BAN）になっています。");
          break;
        default:
          setError("アカウントの作成に失敗しました。通信環境が良い所で再度やり直してください。");
      }
      dispatch({
        type: "setIsButtonDisabled",
        payload: false
      });
    }
  }

  const handleKeyPress = (event: React.KeyboardEvent) => {
    if (event.keyCode === 13 || event.which === 13) {
      // state.isButtonDisabled || handleSignUp();
      if (!state.isButtonDisabled) {
        handleKeyPressTrigger();
        if (errors) {
          // エラーメッセージを表示する
        } else {
          handleSignUp();
        }
      }
    }
  };

  async function handleKeyPressTrigger() {
    const result = await trigger();
    return result;
  }

  const handleEmailChange: React.ChangeEventHandler<HTMLInputElement> = (
    event
  ) => {
    dispatch({
      type: "setEmail",
      payload: event.target.value
    });
  };

  const handlePasswordChange: React.ChangeEventHandler<HTMLInputElement> = (
    event
  ) => {
    dispatch({
      type: "setPassword",
      payload: event.target.value
    });
  };

  const handlePasswordConfirmChange: React.ChangeEventHandler<HTMLInputElement> = (
    event
  ) => {
    dispatch({
      type: "setPasswordConfirm",
      payload: event.target.value
    });
  };

  return (
    <div>
      <h1>サインイン</h1>
      <form>
        {error && <div>{error}</div>}
        {successMessage && <div>{successMessage}</div>}
        <div>
          <Input
            error={state.isError}
            id="email"
            name="email"
            type="email"
            placeholder="abc@sample.com"
            onChange={handleEmailChange}
            onKeyPress={handleKeyPress}
          // inputRef={register({
          //   pattern: /^[A-Za-z0-9]{1}[A-Za-z0-9_.-]*@{1}[A-Za-z0-9_.-]{1,}\.[A-Za-z0-9]{1,}$/
          // })}
          />
          {/* {errors.email?.type === "pattern" && (
            <div style={{ color: "red" }}>
              メールアドレスの形式で入力されていません
            </div>
          )} */}
        </div>
        <div>
          <Input
            error={state.isError}
            type="text"
            id="password"
            name="password"
            placeholder="password"
            helpertext={state.helpertext}
            onChange={handlePasswordChange}
            onKeyPress={handleKeyPress}
          // inputRef={register({ required: true, minLength: 6 })}
          />
          {/* {errors.password?.type === "minLength" && (
            <div style={{ color: "red" }}>
              パスワードは6文字以上で入力してください
            </div>
          )} */}
        </div>
        <div>
          <Input
            error={state.isError}
            type="text"
            placeholder="password again"
            helpertext={state.helpertext}
            onChange={handlePasswordConfirmChange}
            onKeyPress={handleKeyPress}
          />
        </div>
        <p>アカウントがある場合はログイン</p>
        <Button
          onClick={handleSubmit(handleSignUp)}
          disabled={state.isButtonDisabled}
        >
          サインイン
        </Button>
      </form>
    </div>
  );
}

export default SignUp;