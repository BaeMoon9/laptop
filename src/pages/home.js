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
      console.log(result)
      console.log(result.data)
      setLaptopData(result.data)
      console.log(laptopData.length)
      console.log(laptopData)
    }).catch(() => {
      console.log('failed')
    })
  }, [])

  return (
          <div>
            <Container>
              <Row xs={1} md={3} className="g-5">
                {laptopData.map((a, idx) => (
                  <Col key={idx}>
                    <Card>
                      <Card.Img variant="top" src="/logo192.png" />
                      <Card.Body>
                        <Card.Title>LG Ultra PC</Card.Title>
                        <Card.Text>
                          <div className="cardstyle">
                            <li>CPU : {a[0]}</li>
                            <li>RAM : {a[0]}</li>
                            <li>SSD : {a[0]}</li>
                            <li>HDD : {a[0]}</li>
                          </div>
                        </Card.Text>
                        <Button variant="primary" onClick={() => { navigate('/home/detail') }}>상세정보</Button>
                        <Button variant="primary" onClick={() => {
                          //console.log(laptopData)
                        }}>데이터받아오기</Button>
                      </Card.Body>
                    </Card>
                  </Col>
                ))}
              </Row>
            </Container>
            <div className="detailComponent">
              <Outlet></Outlet>
            </div>
          </div>
  )
}

export default Home;