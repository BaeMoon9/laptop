import { Table } from 'react-bootstrap';
import axios from 'axios'
import React, { useState, useEffect, useRef } from "react";
import Badge from 'react-bootstrap/Badge';
import { utils, writeFile } from "xlsx";
import Pagination from "react-js-pagination";

function ListTable() {

	const [laptopData, setLaptopData] = useState([])
	const [slicedData, setSlicedData] = useState([]) //laptopData 10개씩
	const [excelExport, setExcelExport] = useState([])
	const [deleteState, setDeleteState] = useState(false); //노트북목록 삭제 체크박스 state

	const [page, setPage] = useState(1) //페이지
	const limit = 10 //1페이지당 데이터 10개
	const lastData = page * limit
	const firstData = lastData - limit

	const [deleteChecked, setDeleteChecked] = useState([])
	const [deleteNum, setDeleteNum] = useState([]) //체크된 물품번호 추출

	const onSelect = (checked, val, yncnum) => {
		console.log('e.target.checked', checked, yncnum)
		if (checked) { //배열에 id 추가
			console.log('체크', val)
			setDeleteChecked([...deleteChecked, val])
			setDeleteNum([...deleteNum, yncnum])
		} else if (!checked) { //배열에 id 제거
			console.log('체크해제', val)
			let newDeleteChecked = deleteChecked.filter((e) => e !== val)
			let newDeleteNum = deleteChecked.filter((e) => e !== yncnum)
			setDeleteChecked(newDeleteChecked)
			setDeleteNum(newDeleteNum)

		}
		console.log('체크된리스트', deleteNum)
	}

	const handleDeleteState = () => {
		if (deleteState === false) {
			setDeleteState(true)
		} else {
			setDeleteState(false)
			setDeleteChecked([])
		}
	}

	const handleDeleteLaptop = async () => {
		// console.log(deleteChecked)
		try {
			await axios.post('http://localhost:8081/deletelaptoplists', deleteNum, //체크한 번호들 삭제 요청하기
				{ headers: { 'Content-Type': 'application/x-www-form-urlencoded' } })
				.then(() => {
					setDeleteState(false)
				})
		} catch (e) {
			console.log(e)
		}
		setDeleteChecked([])
	}


	const handleNextPage = (page) => { //페이지 이동 onchange
		setPage(page)
		setDeleteState(false) //삭제탭 취소
		setDeleteChecked([])
		console.log('page누름', page)
	}

	useEffect(() => {
		axios.get('http://localhost:8081/laptopdatabases').then((result) => {
			setLaptopData(result.data)
			console.log(laptopData)
		}).catch(() => {
			console.log('failed')
		})
	}, [])

	useEffect(() => {
		setSlicedData(laptopData.slice(firstData, lastData))
	}, [laptopData, page])
	// console.log(laptopData)
	// console.log(laptopData[0])

	function excelExportHandler() {
		const excelTableHeader = [["상품명", "물품번호", "학번", "이름", "상태"]]
		const wb = utils.book_new() //엑셀 문서 만들기
		const ws = utils.json_to_sheet([]) //열 순서 시트화
		utils.sheet_add_aoa(ws, excelTableHeader)

		ws["!cols"] = [ //엑셀 칼럼 넓이 A, B, C, D, E열
			{ wpx: 120, alignment: { font: { name: "Courier", sz: 24 } } },
			{ wpx: 180, alignment: { font: { name: "Courier", sz: 24 } } },
			{ wpx: 120, alignment: { font: { name: "Courier", sz: 24 } } },
			{ wpx: 120, alignment: { font: { name: "Courier", sz: 24 } } },
			{ wpx: 120, alignment: { font: { name: "Courier", sz: 24 } } },
		]

		if (laptopData.length > 1) {
			for (let i in laptopData) {
				const datas = {
					laptopName: laptopData[i].name,
					laptopNum: laptopData[i].ync_num,
					stuNum: laptopData[i].rent_student_id,
					stuName: laptopData[i].rent_name,
					status: laptopData[i].status
				}
				excelExport.push(datas)
			}
		}
		utils.sheet_add_json(ws, excelExport, { origin: "A2", skipHeader: true })
		utils.book_append_sheet(wb, ws, "laptoplist")
		writeFile(wb, `laptoplist_.xlsx`);
		setExcelExport([]) //엑셀 데이터 담은 배열 초기화
	}

	// const refresh = () => {
	// 	window.location.reload()
	// }

	return (
		<div>
			<div className="listtable">
				<div className="listtop">
					<div className="registertitle">
						노트북 목록
					</div>
					<button className="excelBtn" onClick={excelExportHandler}>내보내기</button>
					{
						deleteState === false
							? <button className="delBtn" onClick={handleDeleteState}>삭제하기</button>
							: <div>
								<button className="delBtn" onClick={() => handleDeleteLaptop()}>선택제거</button> 
								<button className="delBtn2" onClick={handleDeleteState}>취소하기</button>
							</div>
					}
				</div>
				<div className="tables">
					<Table striped bordered hover>
						<thead>
							<tr>
								{
									deleteState === true
										? <th class="col-md-1">삭제</th>
										: null
								}
								<th class="col-md-1">순번</th>
								<th class="col-md-1">상품명</th>
								<th class="col-md-1">물품번호</th>
								<th class="col-md-1">학번</th>
								<th class="col-md-1">이름</th>
								<th class="col-md-1">연락처</th>
								<th class="col-md-1">상태</th>
								<th class="col-md-1">비고</th>
							</tr>
						</thead>
						{
							slicedData.map((a, inx) => (
								<tbody key={inx} className='tbody1'>
									<tr className='tr1'>
										{
											deleteState === true
												? <td className="checkboxcontain">
													<input type="checkbox" value={inx} onChange={(e) => { onSelect(e.target.checked, e.target.value, a.ync_num) }}
													//체크표시 치크해제 로직
													/>
												</td>
												: null
										}
										<td className='td1'>{inx + 1}</td>
										<td className='td1'>{a.name}</td>
										<td className='td1'>{a.ync_num}</td>
										<td className='td1'>{a.rent_student_id}</td>
										<td className='td1'>{a.rent_name}</td>
										<td className='td1'>{a.student_phone_num}</td>
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
										<td className='td1'>{a.status}</td>
									</tr>
								</tbody>
							))}
					</Table>
				</div>
				<Pagination
					className='pagination'
					activePage={page}
					itemsCountPerPage={limit}
					totalItemsCount={laptopData.length}
					pageRangeDisplayed={10}
					prevPageText={"<"}
					nextPageText={">"}
					onChange={handleNextPage}
				/>
			</div>
			<form action="http://localhost:8081/addlist" method="POST">
				<div className='addlisttop'>
					<div className="registertitle">
						노트북 등록하기
					</div>
					<button className="excelBtn" type='submit'>등록하기</button>
				</div>
				<div className='addlist'>
					<div className='addlistcontent'>
						<div className="addlistsubtitle">
							노트북명
						</div>
						<input name="name" className="addinput" placeholder="ex) LG Ultra PC()" type="text" />
					</div>
					<div className='addlistcontent'>
						<div className="addlistsubtitle">
							물품번호
						</div>
						<input name="yncnum" className="addinput" placeholder="ex) 20180918-0001" type="text" />
					</div>
					<div className='addlistcontent'>
						<div className="addlistsubtitle">
							연식
						</div>
						<input name="year" className="addinput" placeholder="ex) 2018" type="text" />
					</div>
					<div className='addlistcontent'>
						<div className="addlistsubtitle">
							대여 여부
						</div>
						<input name="status" className="addinput" placeholder="ex) 대여가능, 대여불가(사유)" type="text" />
					</div>
				</div>
			</form>
			<form action="http://localhost:8081/updatelist" method="POST">
			<div className='addlisttop'>
					<div className="registertitle">
						노트북 정보 갱신
					</div>
					<button className="excelBtn" type='submit'>업데이트</button>
				</div>
				<div className='addlist'>
					<div className='addlistcontent'>
						<div className="addlistsubtitle">
							업데이트 대상 물품번호
						</div>
						<input name="yncnum" className="addinput" placeholder="ex) 20180918-0001" type="text" />
					</div>
					<div className='addlistcontent'>
						<div className="addlistsubtitle">
							학번
						</div>
						<input name="studentnum" className="addinput" placeholder="ex) 1805013" type="text" />
					</div>
					<div className='addlistcontent'>
						<div className="addlistsubtitle">
							이름
						</div>
						<input name="studentname" className="addinput" placeholder="ex) 홍길동" type="text" />
					</div>
					<div className='addlistcontent'>
						<div className="addlistsubtitle">
							연락처
						</div>
						<input name="phone" className="addinput" placeholder="ex) 010-1234-1234" type="text" />
					</div>
					<div className='addlistcontent'>
						<div className="addlistsubtitle">
							대여 상태
						</div>
						<input name="status" className="addinput" placeholder="ex) 대여가능, 대여불가(사유)" type="text" />
					</div>
				</div>
			</form>
		</div>
	)
}

export default ListTable;