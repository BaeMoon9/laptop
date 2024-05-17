import React, { useEffect, useState } from "react";
import axios from 'axios'
import Button from 'react-bootstrap/Button';
import { Table } from 'react-bootstrap';
import { useNavigate } from "react-router-dom";

function MyPage() {
  const navigate = useNavigate();

  const [userData, setUserData] = useState([])
  const [userRented, setUserRented] = useState([])
  const logoutBtn = () => {
    axios.get('http://localhost:8081/logout')
    .catch(() => {
      console.log("failed")
    })
    navigate('/', {replace: true})
    window.location.reload(); //page reload 새로고침 안하니까 mainpage navbar에 아이디가 계속떠있네;;
  }

  useEffect(() => {
    axios.all([axios.get('http://localhost:8081/userpage'), axios.get('http://localhost:8081/userrented'),])
    .then(
      axios.spread((res1, res2) => {
        setUserData(res1.data)
        setUserRented(res2.data[0])
      })
    ).catch(() => {
      console.log('failed')
    })
  }, [])
  console.log('id : ', userData.id)
  console.log('userRented : ', userRented)

  return (
    <div className="mypage">
      <div className="userinfo">
        <div className="usr-account">
          <h3>Mypage</h3>
        </div>
        <div className="usr-id">
          <div className="usr-title">
            <h4>ID</h4>
          </div>
          <div className="usr-content">
            <div className="usr-content-data">{userData.id}</div>
          </div>
        </div>
        <div className="usr-pw">
          <div className="usr-title">
            <h4>PW</h4>
          </div>
          <div className="usr-content">
            <div className="usr-content-data">********</div>
            <Button variant="primary" className="btnCss1">
              변경하기
            </Button>
          </div>
        </div>
        <div className="usr-email">
          <div className="usr-title">
            <h4>Name</h4>
          </div>
          <div className="usr-content">
            <div className="usr-content-data">{userData.username}</div>
            <Button variant="primary" className="btnCss1">
              변경하기
            </Button>
          </div>
        </div>
				<div className="usr-email">
          <div className="usr-title">
            <h4>PhoneNum</h4>
          </div>
          <div className="usr-content">
					<div className="usr-content-data"></div>
          </div>
        </div>
        <div className="usr-email">
          <div className="usr-title">
            <h4>Logout</h4>
          </div>
          <div className="usr-content">
            <Button variant="danger" className="btnCss1" onClick={logoutBtn}>
              로그아웃
            </Button>
          </div>
        </div>
      </div>
      <hr className="divider" />
      <div className="rentlist">
        <h3>대여목록</h3>
      </div>
      <div>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th class="col-md-1">순번</th>
              <th class="col-md-1">상품명</th>
              <th class="col-md-3">물품번호</th>
              <th class="col-md-1">학번</th>
              <th class="col-md-1">이름</th>
            </tr>
          </thead>

          <tbody>
           {
            !userRented
            ? <tr></tr>
            :  <tr>
            <td>1</td>
            <td>{userRented.name}</td>
            <td>{userRented.ync_num}</td>
            <td>{userRented.rent_student_id}</td>
            <td>{userRented.rent_name}</td>
          </tr>
           }
          </tbody>

        </Table>
      </div>
    </div>
  )
}

export default MyPage;