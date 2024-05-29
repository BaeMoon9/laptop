import React, { useState } from "react";
import howtorent1 from "../images/howtorent1.png"
import howtorent2 from "../images/howtorent2.png"
import howtorent3 from "../images/howtorent3.png"
import howtorent4 from "../images/howtorent4.png"
import howtoclient1 from "../images/howtoclient1.png"
import howtoclient2 from "../images/howtoclient2.png"

function HowtoClient() {
	//	1. 회원대여&#40;회원가입 필수&#41;


	return (
		<div className="clientcontainer">
			<div className="clienttitle">
				1. 우측상단 '로그인 하러가기!' 클릭
			</div>
			<div className="clientimgcontain">
				<img src={howtorent1} width="700" height="400" />
			</div>
			<div className="clienttitle">
				2. 회원가입 후 로그인하기
			</div>
			<div className="clientimgcontain">
				<img src={howtorent2} width="700" height="400" />
			</div>
			<div className="clienttitle">
				3. 대여 원하는 노트북 고르기
			</div>
			<div className="clientimgcontain">
				<img src={howtorent3} width="700" height="400" />
			</div>
			<div className="clienttitle">
				4. 노트북 대여 서약서를 읽은후 다음으로 넘기기
			</div>
			<div className="clientimgcontain">
				<img src={howtorent4} width="700" height="400" />
			</div>
			<div className="clienttitle">
				5. 개인정보 수집 동의 및 노트북 정보 확인 후 하단의 신청하기 버튼 클릭
			</div>
			<div className="clientimgcontain">
				<img src={howtoclient1} width="700" height="400" />
			</div>
			<div className="clienttitle">
				6. 홈 상단의 신청현황 탭을 누른 후 신청이 되어있는지 확인하기
			</div>
			<div className="clientimgcontain">
				<img src={howtoclient2} width="700" height="400" />
			</div>
			<div className="clienttitle">
				7. 실습준비실4로 방문하여 조교한테 신청 노트북 승인 후 수령받기
			</div>
		</div>

	)
}

export default HowtoClient