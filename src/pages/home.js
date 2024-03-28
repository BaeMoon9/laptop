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

  console.log(laptopData)
  console.log(laptopData[0])

  return (
          <div>
            <Container>
              <Row xs={1} md={2} className="g-5">
                {laptopData.map((a, inx) => (
                  <Col key={inx}>
                    <Card>
                      <Card.Img variant="top" src="/laptop01.jpeg" />
                      <Card.Body>
                        <Card.Title>{a.Name}</Card.Title>
                        <Card.Text>
                          <div className="cardstyle">
                            <li>CPU : {a.CPU}</li>
                            <li>RAM : {a.RAM}</li>
                            <li>SSD : {a.SSD}</li>
                            <li>HDD : {a.HDD}</li>
                          </div>
                        </Card.Text>
                        <Button variant="primary" onClick={() => { navigate('/home/detail') }}>상세정보</Button>
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