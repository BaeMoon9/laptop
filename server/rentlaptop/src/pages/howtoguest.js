import React, { useState } from "react";
import howtorent1 from "../images/howtorent1.png"
import howtorent2 from "../images/howtorent2.png"
import howtorent3 from "../images/howtorent3.png"
import howtorent4 from "../images/howtorent4.png"
import howtoguest1 from "../images/howtoguest1.png"


function HowtoGuest() {


	return (
		<div className="clientcontainer">
			<div className="clienttitle">
				1. 우측상단 '로그인 하러가기!' 클릭
			</div>
			<div className="clientimgcontain">
				<img src={howtorent1} width="700" height="400" />
			</div>
			<div className="clienttitle">
				2. 로그인 화면 아래 '비회원 대여하기' 클릭
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
				5. 학번, 이름, 전화번호 작성 및 노트북 정보 확인 후 신청하기
			</div>
			<div className="clientimgcontain">
				<img src={howtoguest1} width="700" height="400" />
			</div>
			<div className="clienttitle">
				6. 실습준비실4로 방문하여 조교한테 신청 노트북 승인 후 수령받기
			</div>
		</div>
	)
}

export default HowtoGuest