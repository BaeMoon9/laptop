import React from "react";
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { useNavigate, Outlet } from "react-router-dom";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Image from 'react-bootstrap/Image';

function Home() {

  const navigate = useNavigate();

  return (
    <div>
      <Container>
        <Row xs={1} md={3} className="g-5">
          {Array.from({ length: 5 }).map((_, idx) => (
            <Col key={idx}>
              <Card>
                <Card.Img variant="top" src="/logo192.png" />
                <Card.Body>
                  <Card.Title>LG Ultra PC</Card.Title>
                  <Card.Text>
                    Intel Core I5 8th Gen
                    8GB LPDDR4
                    256GB SSD
                    500GB HDD
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