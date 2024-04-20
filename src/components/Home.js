import React from 'react';
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="home_container">
      <div className="home_item">
        <h2 className="title">ログイン</h2>
        <p>アカウントを<br />持っている方は<br /><span className="link_txt"><Link to="/login">こちら</Link></span>から</p>
      </div>
      <div className="home_item">
        <h2 className="title">サインイン</h2>
        <p>アカウントを<br />持っていない方は<br /><span className="link_txt"><Link to="/signup">こちら</Link></span>から</p>
      </div>
    </div>
  );
}

export default Home;