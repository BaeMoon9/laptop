/*eslint-disable*/
import React, {useState, useEffect} from "react";
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import { Routes, Route, Link, useNavigate, Outlet, useLocation } from 'react-router-dom';
import LoginPage from './login.js';
import Home from "./home.js";
import ListTable from "./list.js";
import LaptopList from "./laptopList.js";
import MyPage from "./mypage.js";
import Register from "./register.js";
import Rent from "./rent.js";
import Rent2 from "./rent2.js";
import Approve from "./approve.js";
import axios from "axios";


function MainPage() {

  const navigate = useNavigate()
  //const { info } = useLocation()
  const [userData, setUserData] = useState([])
  
  //setUserData(info)
  //console.log('userLogout : ', info)

  useEffect(() => {
    axios.get('http://localhost:8081/userpage').then((result) => {
      setUserData(result.data)
    }).catch(() => {
      console.log('failed')
    })
  }, [])
  
  return (
    <div>
      <Navbar bg="dark" data-bs-theme="dark">
        <Container>
          <Navbar.Brand onClick={()=> { navigate('/')}}>노트북 관리 대장</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link onClick={()=> { navigate('/home')}}>Home</Nav.Link>
            <Nav.Link onClick={()=> { navigate('/list')}}>Labtop List</Nav.Link>
            {
              userData.id === 'admin'
              ? <Nav.Link onClick={()=> { navigate('/approve')}}>신청자 목록</Nav.Link>
              : <Nav.Link onClick={()=> { navigate('/approve')}}>신청 현황</Nav.Link>
            }
          </Nav>
          <Navbar.Toggle />
          <Navbar.Collapse className="justify-content-end">
            <Navbar.Text>
             {
              !userData.id
              ?  <p className="logintab"><a onClick={() => { navigate('/login')}}>로그인 하러가기</a>!</p>
              :  <p className="logintab">환영합니다 <a onClick={() => { navigate('/mypage')}}>{userData.id}</a> 님!</p>
             }
            </Navbar.Text>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <div className="Components">
        <Routes>
          <Route path="/" element={<ListTable />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/approve" element={<Approve />} />
          <Route path="/register" element={<Register />} />
          <Route path="/mypage" element={<MyPage />} />
          <Route path="/rent" element={<Rent />} />
          <Route path="/rent2" element={<Rent2 />} />
          <Route path="/home" element={<Home />}>
            <Route path="detail" element={<LaptopList/>} />
          </Route>
          <Route path="/list" element={<ListTable />} />
         
        </Routes>
      </div>

    </div>
  )
}

export default MainPage;