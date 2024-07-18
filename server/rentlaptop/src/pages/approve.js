import { Table } from 'react-bootstrap';
import React, { useEffect, useState } from "react";
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import Navbarpage from "./navpage.js";
import Pagination from "react-js-pagination";


function Approve() {

	//const location = useLocation()
	const navigate = useNavigate();

	const [rentedData, setRentedData] = useState([]) // 현재 대여중인 노트북 정보(관리자만 보기)
  const [slicedData, setSlicedData] = useState([]) 
	const [user, setUser] = useState([]) //현재 로그인 사용자 정보
	const [apply, setApply] = useState([]) //노트북 대여 신청 목록담기
	console.log(user)

  const [page, setPage] = useState(1) //페이지
	const limit = 10 //1페이지당 데이터 10개
	const lastData = page * limit
	const firstData = lastData - limit
  
  const handleNextPage = (page) => { //페이지 이동 onchange
		setPage(page)
		// console.log('page누름', page)
	}


	useEffect(() => {
		axios.all([axios.get('http://220.67.0.204:8081/userpage'), axios.get('http://220.67.0.204:8081/laptopdatabases'),
		axios.get('http://220.67.0.204:8081/rentapply')])
			.then(
				axios.spread((res1, res2, res3) => {
					setUser(res1.data)
					setRentedData(res2.data)
					setApply(res3.data)
				})
			).catch(() => {
				console.log("failed2")
			})
	}, [setApply, setRentedData]) //실시간 데이터 반영 : 재랜더링

  useEffect(() => {
		setSlicedData(rentedData.slice(firstData, lastData))
	}, [rentedData, page])

	// console.log('admin로그인할때 보이는 승인대기목록', apply)
	// console.log('로그인정보', user)
	// console.log('노트북', rentedData)

	const applyBtn = async ([user]) => {
		// console.log('승인버튼 누른 신청유저', user)

		try {
			await axios.all([axios.post('http://220.67.0.204:8081/applybtn', user, { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } }),
			axios.get('http://220.67.0.204:8081/laptoprentedbyuser')])
				.then(
					axios.spread((res5, res6) => {
						setApply(res5.data)
						setRentedData(res6.data)
					}))
		} catch (e) {
			console.log('approve failed', e)
		}
	}

	const returnBtn = async ([returnUser]) => {
		// console.log('반납처리된 유저', returnUser)

		try {
			await axios.post('http://220.67.0.204:8081/returnbtn', returnUser, {
				headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
			}).then((res) => {
				setRentedData(res.data) //post로 제거요청을하면 select문으로 데이터 다시 받아와서 데이터 갱신및 useffect 재렌더링 가능
			})
		} catch (e) {
			console.log(e)
		}
	}

	const reRenderBtn = async () => {
		try {
			await axios.get('http://localhost:8081/laptoprentedbyuser')
				.then((res6) => {
					setRentedData(res6.data)
				})
			console.log('rerendered')
		} catch (e) {
			console.log('rerender failed', e)
		}
	}

	return (

		<>
			<Navbarpage />
			<div className="mypage">
				<div className="approvetopcontainer">
					<div className="registersubtitle">
						신청 승인 대기 목록
					</div>
					{
            user.id === 'admin'
              ?<Table striped bordered hover>
              <thead>
                <tr>
                  <th class="col-md-1">순번</th>
                  <th class="col-md-2">상품명</th>
                  <th class="col-md-2">물품번호</th>
                  <th class="col-md-2">이름</th>
                  <th class="col-md-2">학번</th>
                  <th class="col-md-2">연락처</th>
                  <th class="col-md-2">승인</th>
                </tr>
              </thead>
              {
                apply.map((a, inx) => (
                  apply[inx].student_name !== null
                    ? <tbody key={inx} className='tbody1'>
                      <tr className='tr1'>
                        <td className='td1'>{inx + 1}</td>
                        <td className='td1'>{a.laptop_name}</td>
                        <td className='td1'>{a.laptop_num}</td>
                        <td className='td1'>{a.student_name}</td>
                        <td className='td1'>{a.student_num_id}</td>
                        <td className='td1'>{a.phone_num}</td>
                        <td className='td1'>
                          <button className="btnCss1" onClick={() => applyBtn([a])}>
                            승인하기
                          </button></td>
                      </tr>
                    </tbody>
                    : null
                ))
              }
            </Table>
            : null
          }
				</div>

				<hr className="divider" />
				<div className="approvebottomcontainer">
					<div className="registersubtitle">
						대여 목록 <button className="rerenderBtn" onClick={() => reRenderBtn()}>갱신하기</button>
					</div>

					{
            user.id === 'admin'
            ? <Table striped bordered hover>
						<thead>
							<tr>
								<th class="col-md-1">순번</th>
								<th class="col-md-2">상품명</th>
								<th class="col-md-3">물품번호</th>
								<th class="col-md-2">학번</th>
								<th class="col-md-2">이름</th>
								<th class="col-md-2">반납처리</th>
							</tr>
						</thead>
						{
							slicedData.map((a, inx) => (
								[inx].rent_student_id !== null
									? <tbody key={inx} className='tbody1'>
										<tr className='tr1'>
											<td className='td1'>{inx + 1}</td>
											<td className='td1'>{a.name}</td>
											<td className='td1'>{a.ync_num}</td>
											<td className='td1'>{a.rent_student_id}</td>
											<td className='td1'>{a.rent_name}</td>
											<td className='td1'>
												<button className="btnCss3" onClick={() => returnBtn([a])}>
													반납
												</button></td>
										</tr>
									</tbody>
									: null
							))
						}
					</Table>
          : null
          }
				</div>
        <Pagination
					itemClass="page-item"
          linkClass="page-link"
					activePage={page}
					itemsCountPerPage={limit} //limit
					totalItemsCount={rentedData.length}
					pageRangeDisplayed={10}
					prevPageText={"< prev"}
					nextPageText={"next >"}
					onChange={handleNextPage}
				/>
			</div>
		</>

	)
}

export default Approve;