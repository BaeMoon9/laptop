import { Table } from 'react-bootstrap';
import React, { useEffect, useState } from "react";
import axios from 'axios';
import { useLocation } from "react-router-dom";

function Approve() {

  const location = useLocation()

  const [rentedData, setRentedData] = useState([])
  const [user, setUser] = useState([])

  useEffect(() => {
    axios.all([axios.get('http://localhost:8081/userpage'), axios.get('http://localhost:8081/laptopdatabases')])
      .then(
        axios.spread((res1, res2) => {
          setUser(res1.data)
          setRentedData(res2.data)
        })
      ).catch(() => {
        console.log("failed")
      })
    //window.location.reload();
  }, [])

  console.log(user)
  console.log('대여 목록 : ', rentedData)
  console.log('location', location)

  return (

    <>
      {
        user.id === 'admin'
          ? <div className="mypage">
            <div className="approvetopcontainer">
              <div className="registersubtitle">
                신청 승인 대기 목록
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
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                  </tr>
                </tbody>
              </Table>
            </div>
            <hr className="divider" />
            <div className="approvebottomcontainer">
              <div className="registersubtitle">
                대여 목록
              </div>
              <Table striped bordered hover>
                <thead>
                  <tr>
                    <th class="col-md-1">순번</th>
                    <th class="col-md-2">상품명</th>
                    <th class="col-md-3">물품번호</th>
                    <th class="col-md-2">학번</th>
                    <th class="col-md-2">이름</th>
                    <th class="col-md-2">상태</th>
                  </tr>
                </thead>
                {
                  rentedData.map((a, inx) => (
                    rentedData[inx].rent_student_id !== null
                      ? <tbody key={inx} className='tbody1'>
                        <tr className='tr1'>
                          <td className='td1'>{inx + 1}</td>
                          <td className='td1'>{a.name}</td>
                          <td className='td1'>{a.ync_num}</td>
                          <td className='td1'>{a.rent_student_id}</td>
                          <td className='td1'>{a.rent_name}</td>
                          <td className='td1'>대여중</td>
                        </tr>
                      </tbody>
                      : null
                  ))
                }
              </Table>
            </div>
          </div>
          : <div className="mypage">
            <div className="approvetopcontainer">
              <div className="registersubtitle">
                {user.username} 신청현황
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
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                  </tr>
                </tbody>
              </Table>
            </div>
            <hr className="divider" />

          </div>
      }
    </>

  )
}

export default Approve;