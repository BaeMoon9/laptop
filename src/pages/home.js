import React, { useState, useEffect } from "react";
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { useNavigate, Outlet } from "react-router-dom";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import axios from 'axios'


function Home() {
  const navigate = useNavigate();

  const [laptopData, setLaptopData] = useState([])

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

  const handleRentLaptop = (a) => { //대여하기 버튼 누를떄 연도별 노트북 정보 전달
    navigate('/home/detail', {state : a})
    // console.log(a)
  }

  return (
          <div>
            <Container>
              <Row xs={1} md={3} className="g-5">
                {laptopData.map((a, inx) => (
                  <Col key={inx}>
                    <Card className="cardstyle">
                      <Card.Img variant="top" src="/laptop01.jpeg" width="250px" height="250px"/>
                      <Card.Body className="cardcontent">
                        <Card.Title>{a.Name}</Card.Title>
                        <Card.Text>
                          <div className="cardtext">
                            <li>CPU : {a.CPU}</li>
                            <li>RAM : {a.RAM}</li>
                            <li>SSD : {a.SSD}</li>
                            <li>HDD : {a.HDD}</li>
                          </div>
                        </Card.Text>
                        <Button variant="primary" onClick={() => {handleRentLaptop({a})}}>대여하기</Button>
                      </Card.Body>
                    </Card>
                  </Col>
                 ))}
              </Row>
            </Container>
            <div className="detailComponent">
              <Outlet><laptopList /></Outlet>
            </div>
          </div>
  )
}

export default Home;