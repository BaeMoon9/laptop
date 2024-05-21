import React, { useState, useEffect, useRef } from "react";
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { useNavigate, Outlet } from "react-router-dom";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import axios from 'axios'
import Navbarpage from "./navpage.js";


function Home() {
	const navigate = useNavigate();

	const [laptopData, setLaptopData] = useState([])

	const [mouseOver, setMouseOver] = useState(false)
	const handleMouseOver = () => {
		setMouseOver(true);
	}
	const handleMouseOut = () => {
		setMouseOver(false);
	}
	

	useEffect(() => {
		axios.get('http://localhost:8081/laptopspecs').then((result) => {
			setLaptopData(result.data)
			//console.log(laptopData)
		}).catch(() => {
			console.log('failed')
		})
	}, [])

	// console.log(laptopData)
	// console.log(laptopData[0])

	const scrollLists = useRef(null); //스크롤 이동 함수
	const handleRentLaptop = (a) => { //대여하기 버튼 누를떄 연도별 노트북 정보 전달
		navigate('/home/detail', { state: a })
		scrollLists.current.scrollIntoView({ behavior: 'smooth', block: 'start' }) //해당컴포넌트로 스크롤 이동시키기
		// console.log(a)
	}

	const scrollLaptops = useRef()
	const scrollBtn = (x) => {

		if (x === "left") {
			scrollLaptops.current.scrollLeft -= 450
		} else if (x === "right") {
			scrollLaptops.current.scrollLeft += 450
		}
	}



	//row className="g-5"
	return (
		<div>
			<Navbarpage />
			<div className="home" onMouseOver={() => {handleMouseOver()}} onMouseOut={() => {handleMouseOut()}}>
				<div className={mouseOver ? "lefttab" : "lefttabnone" } onMouseOver={() => {handleMouseOver()}} onClick={() => {scrollBtn("left")}}>
				</div>
				<div className="cardlist" ref={scrollLaptops}>
					{laptopData.map((a, inx) => (
						<Col key={inx} className="lists">
							<Card className="cardstyle" >
								<Card.Img variant="top" src="/laptop01.jpeg" width="250px" height="250px" />
								<Card.Body className="cardcontent">
									<Card.Title><div className="cardtitletext">{a.Name}</div></Card.Title>
									<Card.Text>
										<div className="cardtext">
											<li>CPU : {a.CPU}</li>
											<li>RAM : {a.RAM}</li>
											<li>SSD : {a.SSD}</li>
											<li>HDD : {a.HDD}</li>
										</div>
									</Card.Text>
									<button className="rentBtn" onClick={() => { handleRentLaptop({ a }) }}>대여하기</button>
								</Card.Body>
							</Card>
						</Col>
					))}
				</div>
				<div className={mouseOver ? "righttab" : "righttabnone" } onMouseOver={() => {handleMouseOver()}} onClick={() => {scrollBtn("right")}}>
				</div>
			</div>
			<div className="detailComponent" ref={scrollLists}>
					<Outlet></Outlet>
				</div>
		</div>
	)
}

export default Home;