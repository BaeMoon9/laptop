import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import Button from 'react-bootstrap/Button';
import { useLocation, useNavigate } from "react-router-dom";
import ScrollToTop from "./scrollToTop";
import Navbarpage from "./navpage.js";

function Rent2() {

	const navigate = useNavigate()
	const location = useLocation()

	console.log('노트북 정보3', location.state.name[0])
	const today = new Date();
	const nowdate = `${today.getFullYear()}년 ${today.getMonth() + 1}월 ${today.getDate()}일`;

	const [userData, setUserData] = useState([])
	const [laptopData, setLaptopData] = useState([])

	const [radiobtn, setRadiobtn] = useState("diagree")

	const handleRadioChange = (e) => {
		setRadiobtn(e.target.value)
	}

	const applyBtn = async (userdb, devicedb) => {
		let db1 = [...userdb, ...devicedb]

		axios.post('http://192.168.75.229:8081/userdevicerent', db1, {
			headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
			//header에 Content-Type 디폴트값이 'application/json'인데 이게 안되고 왜 위에게 되는지 잘 모르겠다
			//좀더 찾아보는걸로 하자 일단은 약 14시간만에 해결되긴했다.
			//responseType: 'json'
		})
			.then((res) => {
				//console.log('res 보기 :', res.data.sqlMessage)
				if (res.data.sqlMessage) { //sql 에러처리
					window.alert("요청 실패! 관리자에게 문의바랍니다.") //sql에러처리
					navigate('/home')
				} else {
					window.alert("신청이 완료되었습니다.")
					navigate('/home')
				}
			}).catch((e) => {
				console.log(e)
			})
	}

	useEffect(() => {
		setLaptopData(location.state.name[0])
		axios.get('http://192.168.75.229:8081/userpage').then((res) => {
			 setUserData(res.data)
		}).catch(() => {
			console.log('failed')
		})
	}, [])
	console.log('rent2 laptopdata', laptopData)
	console.log('rent2 userData', userData)



	return (
		<div>
			<Navbarpage />
			<div className="rentpage">
				<ScrollToTop />
				<div className="registertitle">
					노트북 대여 신청서
				</div>
				<div className="rentpledgecontainer">
					<div className="rentsubtitle">[개인정보 수집 및 이용 동의]</div>
					<div className="rentcontent">
						1. 개인정보 수집 및 이용 목적 : 본인 확인 및 대여 기록 관리
					</div>
					<div className="rentcontent">
						2. 수집하는 개인정보의 항목 : 소속, 학번, 이름, 휴대폰번호
					</div>
					<div className="rentcontent">
						3. 개인정보의 보유 및 이용기간 : 1년
					</div>
					<div className="rentcontent">
						4. 동의 거부 권리 안내 : 귀하는 본 개인정보 수집 및 이용 동의에 거부할 권리가 있습니다. 단, 동의를 거부할 경우에는
						대여가 어려울 수 있습니다.
					</div>
					<div>개인정보의 수집 및 이용에 동의하십니까?</div>
					<div>
						<input type="radio" value="agree" onChange={handleRadioChange} checked={radiobtn === "agree"} className="agreeradiobtn" />동의
						<input type="radio" value="disagree" onChange={handleRadioChange} checked={radiobtn === "disagree"} className="disagreeradiobtn" />비동의
					</div>
					<hr className="divider" />
					<div className="userrentinfo">
						<div className="guestrentinfo">
							<div className="guestinfo">학번</div>
							<div className="renterinfo">{userData.studentid}</div>
						</div>
						<div className="guestrentinfo">
							<div className="guestinfo">이름</div>
							<div className="renterinfo">{userData.username}</div>
						</div>
						<div className="guestrentinfo">
							<div className="guestinfo">전화번호</div>
							<div className="renterinfo">{userData.phone}</div>
						</div>
						<div className="guestrentinfo">
							<div className="guestinfo">이메일</div>
							<div className="renterinfo">asdf1234@naver.com</div>
						</div>
						<div className="guestrentinfo">
							<div className="guestinfo">주소</div>
							<div className="renterinfo">대구 남구 현충로 170, 영남이공대학교</div>
						</div>
					</div>
					<hr className="divider" />
					<div className="rentsubtitle2">대여 노트북 정보</div>
					<div className="rentcontain2">
						<div className="registersubtitle">일련번호</div>
						<div className="renterinfo">{laptopData.ync_num}</div>
					</div>
					<div className="rentcontain2">
						<div className="registersubtitle">노트북명</div>
						<div className="renterinfo">{laptopData.name}</div>
					</div>
					<hr className="divider" />
					<div className="signcontent">
						본인은 노트북 대여 제도 시행 지침을 충분히 이해하였고, 특히 대여 후에 발생하는 분실 및 파손에 대한 제 6 조의 내용을 충분히
						확인하였으며 모든 노트북 대여 시행 지침을 성실히 준수할 것을 서약합니다.
					</div>
					<div className="applicationdate">
						{nowdate}
					</div>
					<div className="registername">신청자 : {userData.username}</div>
				</div>
				{
						radiobtn === "agree" ?
							<button className="btnCss1"
								onClick={() => applyBtn([userData], [laptopData])}
							>신청하기</button>
							: <div>
								<button className="btnCss1"
								onClick={() => alert('개인정보 수집 및 이용에 동의하셔아힙니다.')}
							>신청하기</button>
							<ScrollToTop />
							</div>
					}
			</div>
		</div>
	)
}

export default Rent2;