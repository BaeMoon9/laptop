/*eslint-disable*/
import React, { useEffect } from "react";
import Container from 'react-bootstrap/Container';
import { useNavigate } from "react-router-dom";


function LoginPage() {

	const navigate = useNavigate();

	return (
		<div className="loginbg">
		<div className="login">
			<Container>
				<div className="loginBox">
					<h3 className="loginTitle">Login</h3>
					<div className="loginTab2">
						<form action="http://220.67.0.204:8081/login1" method="POST">
							<input name="username" className="IdInput" placeholder="ID를 입력하세요." />
							<input name="password" className="PwInput" type="password" placeholder="PW를 입력하세요." />
							<button className="loginBtn" type="submit">로그인</button>
						</form>
						<ul className="findBtnTab">
							<p><a className="findBtn" onClick={() => {
								navigate('/findid')
							}}>ID찾기</a></p>
							<p><a className="findBtn">PW찾기</a></p>
							<p><a className="findBtn" onClick={() => {
								navigate('/register')
							}}>회원가입</a></p>
						</ul>
						<form action="http://220.67.0.204:8081/login1" method="POST">
							<input type="hidden" name="username" className="IdInput" value={"guest"}/>
							<input type="hidden" name="password" className="PwInput" value={"1234"}/>
							<button className="loginBtn" type="submit">비회원 대여하기</button>
						</form>
					</div>
				</div>
			</Container>
		</div>
		</div>
	)
}

export default LoginPage;