import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function FindID() {

	const navigate = useNavigate();
	const [userData, setUserData] = useState([])


	return (
		<div className="registerpage">
			<div className="registertitle">
				아이디 찾기
			</div>
			<hr className="divider" />
			<div className="registercontent">
				<form method="POST">
					<div className="registersubtitle">
						학번
					</div>
					<div className="registerid">
						<input name="userstudentnum" type="text" className="registerinput"
							placeholder="학번을 입력해주세요." value={userData}
							onChange={(e) => {
								setUserData(e.target.value)
								console.log(userData)
							}}
						/>
					</div>
					<div className="registersubtitle">
						이름
					</div>
					<div className="registerid">
						<input name="userstudentnum" type="text" className="registerinput"
							placeholder="이름을 입력해주세요." value={userData}
							onChange={(e) => {
								setUserData(e.target.value)
								console.log(userData)
							}}
						/>
						<button className="findidBtn" type="submit">확인하기</button>
					</div>
				</form>
				<hr className="divider" />
				<button className="findidBtn" type="button" onClick={() => navigate('/login')}>로그인하기</button>
			</div>


		</div>
	)
}

export default FindID