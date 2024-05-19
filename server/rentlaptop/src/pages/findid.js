import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Navbarpage from "./navpage.js";

function FindID() {

	const navigate = useNavigate();


	return (
		<div>
			<Navbarpage />
			<div className="registerpage">
				<div className="registertitle">
					아이디 찾기
				</div>
				<hr className="divider" />
				<div className="registercontent">
					<form action="http://localhost:8081/findyourid" method="POST" >
						<div className="registersubtitle">
							학번
						</div>
						<div className="registerid">
							<input name="userstudentnum" type="text" className="registerinput"
								placeholder="학번을 입력해주세요." />
						</div>
						<div className="registersubtitle">
							이름
						</div>
						<div className="registerid">
							<input name="userstudentnum" type="text" className="registerinput"
								placeholder="이름을 입력해주세요." />
							<button className="findidBtn" type="submit">확인하기</button>
						</div>
					</form>
					<hr className="divider" />
					<button className="findidBtn" type="button" onClick={() => navigate('/login')}>로그인하기</button>
				</div>
			</div>
		</div>
	)
}

export default FindID