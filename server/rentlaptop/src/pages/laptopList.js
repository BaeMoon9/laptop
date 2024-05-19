import { Table } from 'react-bootstrap';
import axios from 'axios'
import React, { useState, useEffect } from "react";
import Button from 'react-bootstrap/Button';
import Badge from 'react-bootstrap/Badge';
import { useLocation, useNavigate } from 'react-router-dom';


function LaptopList() {
	const navigate = useNavigate();

	const [laptopData, setLaptopData] = useState([])
	const [userData, setUserData] = useState([])
	const location = useLocation()
	const modelYear = { ...location.state.a }
	// console.log(modelYear)

	useEffect(() => {
		axios.all([axios.get('http://localhost:8081/laptopdatabases'), axios.get('http://localhost:8081/userpage')])
			.then(
				axios.spread((res1, res2) => {
					setLaptopData(res1.data)
					setUserData(res2.data)
				})
			).catch(() => {
				console.log('failed')
			})
	}, [])

	const rentBtn = ([laptop]) => {
		try {
			if (!userData) {
				window.alert("로그인 후 이용가능합니다.")
				navigate('/login')
			}
			else if (userData.id === "guest") { //게스트로그인시 신청화면에서 개인정보 입력하는 다른페이지로 이동하기
				console.log('guset logined')
				navigate('/guestrent', { state: { laptop } })
			}
			else {
				navigate('/rent', { state: { laptop } })
			}
		} catch (e) {
			console.log('err', e)
		}
	}

	console.log('userdata', userData)

	return (
		<div>
			<div className="tables">
				<Table striped bordered hover>
					<thead>
						<tr>
							<th class="col-md-1">순번</th>
							<th class="col-md-1">상품명</th>
							<th class="col-md-3">물품번호</th>
							<th class="col-md-1">대여가능여부</th>
							<th class="col-md-1">대여하기</th>
						</tr>
					</thead>
					{
						laptopData.map((a, inx) => (
							modelYear.Model_Year === a.Year
								?
								<tbody key={inx} className='tbody1'>
									<tr className='tr1'>
										<td className='td1'>{inx + 1}</td>
										<td className='td1'>{a.name}</td>
										<td className='td1'>{a.ync_num}</td>
										<td className='td1'>
											{
												a.status === '대여가능'
													? <Badge bg="success" className="badgeCss">
														대여가능
													</Badge>
													: <Badge bg="danger" className='badgeCss'>
														대여불가
													</Badge>
											}
										</td>
										<td className='td1'>
											{
												a.status === '대여가능'
													? <Button variant="primary" className="btnCss1" onClick={() => rentBtn([a])}>
														대여하기
													</Button>
													: <Button variant="primary" className="btnCss1" disabled>
														대여하기
													</Button>
											}
										</td>
									</tr>
								</tbody>
								: null
						))}
				</Table>
			</div>
		</div>
	)
}

export default LaptopList;