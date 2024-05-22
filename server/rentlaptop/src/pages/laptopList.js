import { Table } from 'react-bootstrap';
import axios from 'axios'
import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from 'react-router-dom';


function LaptopList() {
	const navigate = useNavigate();

	const [laptopData, setLaptopData] = useState([])
	const [userData, setUserData] = useState([])
	const location = useLocation()
	const modelYear = { ...location.state.a }
	//  console.log('laptopdata', laptopData)
	//  console.log('modelyear', modelYear)

	useEffect(() => {
		axios.all([axios.get('http://221.142.94.196:8081/laptopdatabases'), axios.get('http://221.142.94.196:8081/userpage')])
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
		// console.log('버튼누른순간 데이터', laptop)
		try {
			if (!userData) {
				window.alert("로그인 후 이용가능합니다.")
				navigate('/login')
			}
			else if (userData.id === "guest") { //게스트로그인시 신청화면에서 개인정보 입력하는 다른페이지로 이동하기
				console.log('guset 계정 대여')
				navigate('/guestrent', { state: { laptop } })
			}
			else {
				navigate('/rent', { state: { laptop } })
			}
		} catch (e) {
			console.log('err', e)
		}
	}

	// console.log('userdata', userData)
	// console.log(' modelYear.Model_Year',  modelYear.Model_Year)
	// console.log('연도별 필터링', laptopData.filter((a) => a.Year === modelYear.Model_Year))
	// console.log('modelyear === laptopyear', modelYear.Model_Year === laptopData.Year)
	// console.log('위에 두개 값', modelYear.Model_Year, laptopData.Year)

	return (
		<div>
			{
				laptopData.filter((a) => a.Year === modelYear.Model_Year).length !== 0
				? 
				<div className="tables">
				<Table striped bordered hover>
					<thead>
						<tr>
							<th class="col-md-1">순번</th>
							<th class="col-md-1">상품명</th>
							<th class="col-md-2">물품번호</th>
							<th class="col-md-1">대여가능여부</th>
							<th class="col-md-1">대여하기</th>
						</tr>
					</thead>
					{
						laptopData
						.filter((a) => a.Year === modelYear.Model_Year)
						.map((a, inx) => (
								<tbody key={inx} className='tbody1'>
									<tr className='tr1'>
										<td className='td1'>{inx + 1}</td>
										<td className='td1'>{a.name}</td>
										<td className='td1'>{a.ync_num}</td>
										<td className='td1'>
											{
												a.status === '대여가능'
													? <button  className="badgeCss1" disabled={true}>
														대여가능
													</button>
													: <button className='badgeCss2' disabled={true}>
														대여불가
													</button>
											}
										</td>
										<td className='td1'>
											{
												a.status === '대여가능'
													? <button  className="btnCss1" onClick={() => rentBtn([a])}>
														대여하기
													</button>
													: <button  className="btnCss1disabled" disabled={true}>
														대여하기
													</button>
											}
										</td>
									</tr>
								</tbody>
						))}
				</Table>
			</div>
				:
				<div className="notprepared">
					<div>{modelYear.Name}</div>
					<div>자세한 사항은 관리자에게 문의바랍니다.</div>
				</div>
			}
		</div>
	)
}

export default LaptopList;