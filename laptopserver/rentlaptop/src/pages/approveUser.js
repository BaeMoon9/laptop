import { Table } from 'react-bootstrap';
import React, { useEffect, useState } from "react";
import axios from 'axios';
import { useNavigate, useLocation } from "react-router-dom";


function ApproveUser() {

	const location = useLocation()
	const navigate = useNavigate();

	console.log('location state userdata', location.state.userData)
	const [user, setUser] = useState([]) //현재 로그인 사용자 정보
	const [userwanted, setUserWanted] = useState([]) //신청자 신청현황 db 저장


	useEffect(() => {
		axios.all([axios.get('http://localhost:8081/userpage'), axios.get('http://localhost:8081/userwantedapply'),])
			.then(
				axios.spread((res1, res4) => {
					setUser(res1.data)
					setUserWanted(res4.data)
				})
			).catch(() => {
				console.log("failed2")
			})
	}, [])

	console.log('userwanted', userwanted)

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
						{
							userwanted.map((a, inx) => (
								userwanted[inx].student_name !== null
									? <tbody key={inx}>
										<tr>
											<td>{inx + 1}</td>
											<td>{a.laptop_name}</td>
											<td>{a.laptop_num}</td>
											<td>{a.student_num_id}</td>
											<td>{a.student_name}</td>
											<td>진행중...</td>
										</tr>
									</tbody>
									: <div className="needuseid">현재 신청대기중인 노트북이 없습니다.</div>
							))
						}
					</Table>
				</div>
				<hr className="divider" />

			</div>
		</>

	)

}

export default ApproveUser;