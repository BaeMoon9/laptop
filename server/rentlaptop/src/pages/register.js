import React, { useState } from "react";
import axios from "axios";
import Button from 'react-bootstrap/Button';
import Navbarpage from "./navpage.js";

function Register() {

	const [checkNewId, setCheckID] = useState()
	const [validId, setValidId] = useState(null)

	const [checkNewPw, setCheckPw] = useState()
	const [checkNewPw2, setCheckPw2] = useState()

	const [studentId, setStudentId] = useState()
	const [studentName, setStudentName] = useState()
	const [phonenum, setPhonenum] = useState()

	const checkID = async () => {
		// console.log('중복검색할 아이디 : ', checkNewId)
		if (!checkNewId) {
			setValidId(null)
			console.log('아이디미입력') //중복확인 아이디 미입력시 validId null 반환
		} else {
			await axios.get('http://221.142.94.196:8081/checkid', { params: { checkNewId } }).then((result) => {
				// console.log('result.data : ', result.data)

				if (result.data === checkNewId) {
					setValidId(false)
					// console.log('중복임', result.data, checkNewId, validId)
				}
				else {
					setValidId(true)
					// console.log('중복아님', result.data, checkNewId, validId)
				}
			}).catch(() => {
				console.log('failed')
			})
		}
	}




	return (
		<div>
			<Navbarpage />
			<div className="registerpage">
				<div className="registertitle">
					회원가입
				</div>
				<hr className="divider" />
				<div className="registercontent">
					<form action="http://221.142.94.196:8081/newregister" method="POST">
						<div className="registersubtitle">
							아이디
						</div>
						<div className="registerid">
							<input name="userid" type="text" value={checkNewId}
								className="registerinput" placeholder="ID를 입력하세요."
								onChange={(e) => {
									setCheckID(e.target.value)
									// console.log(checkNewId)
								}}
							/>
							<button type="button" className="btnCss2" onClick={checkID}>중복확인</button>
						</div>
						{
							validId === null
								? <div className="needuseid">아이디를 입력해주세요</div>
								: (validId === false ?
									<div className="cantuseid">사용중인 아이디 입니다.</div>
									: <div className="canuseid">사용 가능한 아이디 입니다.</div>
								)
						}
						<div className="registerpw">
							<div className="registersubtitle">
								패스워드
							</div>
							<div className="registerpw1">
								<input name="newpassword" className="registerinput" placeholder="PW를 입력하세요." type="password"
									onChange={(e) => {
										setCheckPw(e.target.value)
										// console.log('입력한 첫번째줄 password: ', checkNewPw)
									}}
								/>
							</div>
							<div className="registerpw2">
								<input name="checknewpassword" className="registerinput" placeholder="한번더!" type="password"
									onChange={(e) => {
										setCheckPw2(e.target.value)
										// console.log('입력한 첫번째줄 password: ', checkNewPw2)
									}}
								/>
							</div>
							{
								!checkNewPw2
									? <div className="needuseid">비밀번호를 입력해주세요</div>
									: (checkNewPw === checkNewPw2 ?
										<div className="canuseid">비밀번호 일치.</div>
										: <div className="cantuseid">비밀번호가 다릅니다.</div>
									)
							}
							<hr className="divider" />
							<div className="registersubtitle">
								학번, 이름
							</div>
							<div className="registerpw2">
								<input name="studentid" className="registerinput" placeholder="학번"
									onChange={(e) => {
										setStudentId(e.target.value)
										// console.log('학번 : ', studentId)
									}}
								/>
								<input name="studentname" className="registerinput" placeholder="이름"
									onChange={(e) => {
										setStudentName(e.target.value)
										// console.log('이름 : ', studentName)
									}}
								/>
							</div>
							<div className="registersubtitle">
								전화번호
							</div>
							<div className="registerpw2">
								<input name="phonenum" className="registerinput" placeholder="ex) 010-1234-1234"
									onChange={(e) => {
										setPhonenum(e.target.value)
										// console.log('전화번호 : ', phonenum)
									}}
								/>
							</div>
						</div>
						<hr className="divider" />
						{
							!checkNewId || !checkNewPw || validId === false || !studentId || !studentName
								? <Button className="registerBtn" type="submit" disabled>가입하기</Button>
								: <Button className="registerBtn" type="submit">가입하기</Button>
						}
					</form>
				</div>
			</div>
		</div>
	)
}

export default Register;