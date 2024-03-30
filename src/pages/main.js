/*eslint-disable*/
import React from "react";
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import { Routes, Route, Link, useNavigate, Outlet } from 'react-router-dom';
import LoginPage from './login.js';
import Home from "./home.js";
import ListTable from "./list.js";
import LaptopList from "./laptopList.js";


function MainPage() {

  const navigate = useNavigate();

  return (
    <div>
      <Navbar bg="dark" data-bs-theme="dark">
        <Container>
          <Navbar.Brand onClick={()=> { navigate('/')}}>노트북 관리 대장</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link onClick={()=> { navigate('/home')}}>Home</Nav.Link>
            <Nav.Link onClick={()=> { navigate('/list')}}>Labtop List</Nav.Link>
            <Nav.Link href="#pricing">Pricing</Nav.Link>
          </Nav>
          <Navbar.Toggle />
          <Navbar.Collapse className="justify-content-end">
            <Navbar.Text>
              Signed in as: <a href="#login">아이디</a>
            </Navbar.Text>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <div className="Components">
        <Routes>
          <Route path="/" element={<ListTable />} />
          <Route path="/login" element={<LoginPage />} />
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