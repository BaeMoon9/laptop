import React, { useState } from "react";
import axios from "axios";
import Navbarpage from "./navpage.js";

var idState = { //아이디 체크 상태
	0: <div className="needuseid">아이디를 입력해주세요.</div>,
	1: <div className="regexuseid">아이디를 영문자, 숫자포함 6자이상으로 작성해주세요.</div>,
	2: <div className="cantuseid">사용중인 아이디 입니다.</div>,
	3: <div className="canuseid">사용 가능한 아이디 입니다.</div>,
}

var pwState1 = {
	0: <div className="needuseid">패스워드를 입력해주세요.</div>,
	1: <div className="regexuseid">패스워드를 영문자 또는 숫자 8자이상으로 작성해주세요.</div>,
	2: <div className="regexuseid2">패스워드 조건 충족</div>,
}

var pwState2 = {
	0: null,
	1: <div className="cantuseid">패스워드와 패스워드 확인이 다릅니다.</div>,
	2: <div className="canuseid">패스워드 일치.</div>,
}

var phoneState = {
	0: null,
	1: <div className="cantuseid">전화번호 형식을 바르게 입력해주세요. ex&#41;010-1234-1234</div>,
	2: <div className="canuseid">사용가능</div>,
}

var stuNumState = {
	0: null,
	1: <div className="cantuseid">학번은 숫자만 입력할 수 있습니다.</div>,
	2: <div className="canuseid">사용가능</div>,
}

var nameState = {
	0: null,
	1: <div className="cantuseid">이름은 올바른 한글 형식으로 입력할 수 있습니다.</div>,
	2: <div className="canuseid">사용가능</div>,
}


function Register() {

	const [checkNewId, setCheckID] = useState()
	const [validId, setValidId] = useState(0)

	const [newPw1, setNewPw1] = useState()
	const [validPw1, setValidPw1] = useState(0)
	const [validPw2, setValidPw2] = useState(0)

	const [validPhone, setValidPhone] = useState(0)

	const [validStuNum, setValidStuNum] = useState(0)

	const [validName, setValidName] = useState(0)

	const idRegEx = /^[A-Za-z0-9]{6,20}$/; //영문자 + 숫자, 6자이상 20자이하
	const passwordRegEx = /^[A-Za-z0-9]{8,20}$/; //영문자 + 숫자, 8자이상 20자이하
	const phoneRegEx = /^\d{3}-\d{3,4}-\d{4}$/; //휴대폰번호 정규식
	const stuNumRegEx = /[0-9]/g;
	const nameRegEx = /^[가-힣]+$/;

	const checkID = async () => {
		// console.log('정규식 아이디 테스트', idRegEx.test(checkNewId))
		// console.log('id길이', checkNewId.length)
		// console.log()

		if (!checkNewId) {
			setValidId(0)
			console.log('아이디미입력') //중복확인 아이디 미입력시 validId null 반환
		} else if (idRegEx.test(checkNewId) === false) { //정규식 조건 미충족
			setValidId(1)
		} else if (idRegEx.test(checkNewId) === true) {
			await axios.get('http://192.168.75.229:8081/checkid', { params: { checkNewId } }).then((result) => {
				// console.log('result.data : ', result.data)

				if (result.data === checkNewId) {
					setValidId(2)
					// console.log('중복임', result.data, checkNewId, validId)
				}
				else {
					setValidId(3)
					// console.log('중복아님', result.data, checkNewId, validId)
				}
			}).catch(() => {
				console.log('failed')
				alert('관리 자에게 문의해주세요(db error)')
			})

		} else {
			console.log('관리자에게 문의해주세요(id error)')
			alert('관리자에게 문의해주세요(id error)')
		}
	}

	const checkPw = (checkPwTop) => {
		console.log('정규식 비번 테스트', passwordRegEx.test(checkPwTop))
		console.log(validPw1)
		if (!checkPwTop) {
			setValidPw1(0) //비번 미입력
		} else if (passwordRegEx.test(checkPwTop) === false) { //정규식 미충족
			setValidPw1(1)
		} else if (passwordRegEx.test(checkPwTop) === true) {
			setValidPw1(2)
		} else {
			console.log('관리자에게 문의해주세요(pw error)')
			alert('관리자에게 문의해주세요(pw error)')
		}
	}

	const checkPw2 = (checkPwBot) => {
		console.log(checkPwBot, newPw1)
		if (checkPwBot === newPw1) {
			setValidPw2(2)
		} else if (checkPwBot !== newPw1) {
			setValidPw2(1)
		}
	}

	const checkPhoneNum = (checkPhone) => {
		if (checkPhone === '') {
			setValidPhone(0)
		} else if (phoneRegEx.test(checkPhone) === true) {
			setValidPhone(2)
		} else if (phoneRegEx.test(checkPhone) === false) {
			setValidPhone(1)
		}
	}

	const checkStuNum = (stuNum) => {
		if (stuNum === '') {
			setValidStuNum(0)
		} else if (stuNumRegEx.test(stuNum) === true) {
			setValidStuNum(2)
		} else if (stuNumRegEx.test(stuNum) === false) {
			setValidStuNum(1)
		}
	}

	const checkName = (name) => {
		if (name === '') {
			setValidName(0)
		} else if (nameRegEx.test(name) === true) {
			setValidName(2)
		} else if (stuNumRegEx.test(name) === false) {
			setValidName(1)
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
					<form action="http://192.168.75.229:8081/newregister" method="POST">
						<div className="registersubtitle">
							아이디
						</div>
						<div className="registerid">
							<input name="userid" type="text" value={checkNewId}
								className="registerinput" placeholder="ID를 입력하세요."
								onChange={(e) => {
									setCheckID(e.target.value)
								}}
							/>
							<button type="button" className="btnCss2" onClick={checkID}>중복확인</button>
						</div>
						{
							idState[validId]
						}
						<div className="registerpw">
							<div className="registersubtitle">
								패스워드
							</div>
							<div className="registerpw1">
								<input name="newpassword" className="registerinput" placeholder="PW를 입력하세요." type="password"
									onChange={(e) => {
										setNewPw1(e.target.value)
										checkPw(e.target.value)
										// console.log('입력한 첫번째줄 password: ', checkNewPw)
									}}
								/>
							</div>
							{
								pwState1[validPw1]
							}
							<div className="registersubtitle">
								패스워드 확인
							</div>
							<div className="registerpw2">
								<input name="checknewpassword" className="registerinput" placeholder="한번더!" type="password"
									onChange={(e) => {
										checkPw2(e.target.value)
									}}
								/>
							</div>
							{
								pwState2[validPw2]
							}
							<hr className="divider" />
							<div className="registersubtitle">
								학번, 이름
							</div>
							<div className="registerpw2">
								<div>
									<input name="studentid" className="registerinput" placeholder="학번"
										onChange={(e) => {
											checkStuNum(e.target.value)
										}}
									/>
									{
										stuNumState[validStuNum]
									}
								</div>
								<div>
									<input name="studentname" className="registerinput" placeholder="이름"
										onChange={(e) => {
											checkName(e.target.value)
										}}
									/>
									{
										nameState[validName]
									}
								</div>


							</div>
							<div className="registersubtitle">
								전화번호
							</div>
							<div className="registerpw2">
								<input name="phonenum" className="registerinput" placeholder="ex) 010-1234-1234"
									onChange={(e) => {
										checkPhoneNum(e.target.value)
										// console.log('전화번호 : ', phonenum)
									}}
								/>
							</div>
							{
								phoneState[validPhone]
							}
						</div>
						<hr className="divider" />
						{	//정규식을 전부 통과했을때 버튼 활성화하기
							validId === 3 && validPw1 === 2 && validPw2 === 2 && validPhone === 2 && validStuNum === 2 && validName === 2
								? <button className="doneBtn" type="submit">가입하기</button>
								: <button className="doneBtndiabled" type="submit" disabled={true}>가입하기</button>
						}
					</form>
				</div>
			</div>
		</div>
	)
}

export default Register;