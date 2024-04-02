import React, { useEffect, useState } from "react";
import axios from 'axios'
import Button from 'react-bootstrap/Button';

function MyPage() {

  const [userData, setUserData] = useState([])

  useEffect(() => {
    axios.get('http://localhost:8081/userpage').then((result) => {
      setUserData(result.data)
    }).catch(() => {
      console.log('failed')
    })
  }, [])

  console.log('id : ', userData.id)

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
            <div className="usr-content-data">123123123</div>
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
          <h4>Logout</h4>
          </div>
          <div className="usr-content">
          <Button variant="danger" className="btnCss1">
              로그아웃
            </Button>
          </div>
        </div>
      </div>
      <hr className="divider" />
      <div className="rentlist">
        <h3>대여목록</h3>
      </div>
    </div>
  )
}

export default MyPage;