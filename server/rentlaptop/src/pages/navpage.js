import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Container from 'react-bootstrap/Container';
import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import axios from "axios";


function Navbarpage() {

	const navigate = useNavigate()
	const [userData, setUserData] = useState([])

	useEffect(() => {
		axios.get('http://localhost:8081/userpage').then((result) => {
			setUserData(result.data)
		}).catch(() => {
			console.log('failed')
		})
	}, [])

	const handleUserData = (a) => {
		navigate('/approveUser', { state: a })
	}

	return(
		<div>
			<Navbar bg="light" data-bs-theme="light">
				<Container>
					<Navbar.Brand onClick={() => { navigate('/') }}>
						<div className="navtitle">
							<img className="ynclogo2" src="./ynclogo1.ico" />
							소프트웨어융합과 노트북
						</div>
					</Navbar.Brand>
					<Nav className="me-auto">
						<Nav.Link onClick={() => { navigate('/home') }}>
							<div className="navtabs">Home</div>
						</Nav.Link>
						{
							!userData.id
								? null
								: (userData.id === 'admin'
									? <Nav.Link onClick={() => { navigate('/list') }}>
										<div className="navtabs">노트북 목록</div>
									</Nav.Link>
									: null)
						}
						{
							!userData.id
								? null
								: (userData.id === 'admin'
									? <Nav.Link onClick={() => { navigate('/approve') }}>
										<div className="navtabs">신청자 목록</div>
									</Nav.Link>
									: <Nav.Link onClick={() => { handleUserData({ userData }) }}>
										<div className="navtabs">신청 현황</div>
									</Nav.Link>)
						}
					</Nav>
					<Navbar.Toggle />
					<Navbar.Collapse className="justify-content-end">
						<Navbar.Text>
							{
								!userData.id
									? <p className="logintab"><a className="navlogin" onClick={() => { navigate('/login') }}>로그인 하러가기</a>!</p>
									: <p className="logintab"><a className="navlogin" onClick={() => { navigate('/mypage') }}>환영합니다 {userData.id}님!</a></p>
							}
						</Navbar.Text>
					</Navbar.Collapse>
				</Container>
			</Navbar>
		</div>
	)

}

export default Navbarpage