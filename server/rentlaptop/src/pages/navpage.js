import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import axios from "axios";


function Navbarpage() {

	const navigate = useNavigate()
	const [userData, setUserData] = useState([])

	useEffect(() => {
		axios.get('http://221.142.94.196:8081/userpage').then((result) => {
			setUserData(result.data)
		}).catch(() => {
			console.log('failed')
		})
	}, [])

	const logoutBtn = () => {
		axios.get('http://221.142.94.196:8081/logout')
			.catch(() => {
				console.log("failed")
			})
		navigate('/', { replace: true })
		window.location.reload(); //page reload 새로고침 안하니까 mainpage navbar에 아이디가 계속떠있네;;
	}

	const handleUserData = (a) => {
		navigate('/approveUser', { state: a })
	}

	return(
		<div className="main">
			<Navbar className="topnavbar" bg="light" data-bs-theme="light">
				<div className="navbars">
					<Navbar.Brand className="navtitlecontainer" onClick={() => { navigate('/') }}>
						<div className="navtitle">
							<img className="ynclogo2" src="./ynclogo1.ico" />
							소프트웨어융합과 노트북
						</div>
					</Navbar.Brand>
					<Nav className="navtabscontainer">
						<Nav.Link onClick={() => { navigate('/howtorent') }}>
							<div className="navtabs">대여방법</div>
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
					<Navbar.Collapse className="navlogintab">
						<Navbar.Text>
							{
								!userData.id
									? <p className="logintab">
										<div className="navlogin" onClick={() => { navigate('/login') }}>로그인 하러가기!</div>
										</p>
									: <p className="logintab">
										<div className="navlogin" onClick={() => { navigate('/mypage') }}>환영합니다 {userData.id}님!</div>
										<div className="navlogout" onClick={logoutBtn}>로그아웃</div>
										</p>
							}
						</Navbar.Text>
					</Navbar.Collapse>
				</div>
			</Navbar>
		</div>
	)

}

export default Navbarpage