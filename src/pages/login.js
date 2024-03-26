/*eslint-disable*/
import React from "react";
import Container from 'react-bootstrap/Container';


function LoginPage() {
  return (
    <div className="login">
      <Container>
        <div className="loginBox">
          <h3 className="loginTitle">Login</h3>
          <div className="loginTab2">
            <form className="">
              <input className="IdInput" type="text" placeholder="ID를 입력하세요."/>
              <input className="PwInput" type="password" placeholder="PW를 입력하세요." />
              <button className="loginBtn">로그인</button>
            </form>
            <ul className="findBtnTab">
              <p><a className="findBtn">ID찾기</a></p>
              <p><a className="findBtn">PW찾기</a></p>
              <p><a className="findBtn">회원가입</a></p>
            </ul>
          </div>
        </div>
      </Container>
    </div>
  )
}

export default LoginPage;