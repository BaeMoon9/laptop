import { Table } from 'react-bootstrap';
import React, { useEffect, useState } from "react";
import axios from 'axios';
import { useNavigate, useLocation } from "react-router-dom";


function ApproveUser() {

	const location = useLocation()
	const navigate = useNavigate();

	console.log(location.state)
	const user = location.state.userData //현재 로그인 사용자 정보
	const [userwanted, setUserWanted] = useState([]) //신청자 신청현황 db 저장

	

	useEffect(() => {
		
		axios.get('http://localhost:8081/userwantedapply', {
			params : {studentnum : user.studentid}
		})
		.then((res4) => {
			setUserWanted(res4.data)
		})
	}, [])
	console.log('userwanted', userwanted)
	console.log('user', user)

	return (

		<>
			<div className="mypage">
				<div className="approvetopcontainer">
					<div className="registersubtitle">
						노트북 신청자 : {user.username}
					</div>
					<Table striped bordered hover>
						<thead>
							<tr>
								<th class="col-md-1">순번</th>
								<th class="col-md-2">상품명</th>
								<th class="col-md-3">물품번호</th>
								<th class="col-md-2">학번</th>
								<th class="col-md-2">이름</th>
								<th class="col-md-2">승인</th>
							</tr>
						</thead>
						<tbody>

							<tr>
								<td>1</td>
								<td>{userwanted[0].laptop_name}</td>
								<td></td>
								<td></td>
								<td></td>
								<td>진행중...</td>
							</tr>
						</tbody>
					</Table>
				</div>
				<hr className="divider" />

			</div>
		</>

	)
}

export default ApproveUser;