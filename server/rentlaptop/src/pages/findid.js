import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Navbarpage from "./navpage.js";

function FindID() {

	const navigate = useNavigate();

	const [findStuNum, setFindStuNum] = useState();
	const [findStuName, setFindStuName] = useState();

	const findID = async (stunum, stuname) => {
		let db1 = [...stunum, ...stuname]

		await axios.post('http://localhost:8081/findyourid', db1, {
			headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
		})
			.then((res) => {
				// console.log('0: 데이터없음, 1: 데이터있음', res.data.length)
				if (res.data.length === 1) { //res 반환받은 데이터 길이로 데이터 유무 판단
					alert('찾으시는 아이디는 ' + res.data[0].user_id + ' 입니다.')
				} else if (res.data.length === 0) {
					alert('아이디가 없습니다.')
				} else {
					alert('관리자에게 문의바랍니다.')
				}
			}).catch((e) => {
				console.log(e)
			})
		

	}
	return (
		<div>
			<Navbarpage />
			<div className="registerpage">
				<div className="registertitle">
					아이디 찾기
				</div>
				<hr className="divider" />
				<div className="registercontent">
						<div className="registersubtitle">
							학번
						</div>
						<div className="registerid">
							<input name="userstudentnum" type="text" className="registerinput"
								placeholder="학번을 입력해주세요." 
								onChange={(e) => {
									setFindStuNum(e.target.value)
								}}
								/>
						</div>
						<div className="registersubtitle">
							이름
						</div>
						<div className="registerid">
							<input name="userstudentname" type="text" className="registerinput"
								placeholder="이름을 입력해주세요." 
								onChange={(e) => {
									setFindStuName(e.target.value)
								}}
								/>							
							<button className="findidBtn" type="button" onClick={() => findID([findStuNum], [findStuName])}>확인하기</button>
						</div>
					<hr className="divider" />
					<button className="doneBtn" type="button" onClick={() => navigate('/login')}>로그인하기</button>
				</div>
			</div>
		</div>
	)
}

export default FindID