import React, { useState } from "react";
import howtorent1 from "../images/howtorent1.png"
import howtorent2 from "../images/howtorent2.png"
import howtorent3 from "../images/howtorent3.png"

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
		</div>

	)
}

export default HowtoClient