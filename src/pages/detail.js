import React from "react";
import Carousel from 'react-bootstrap/Carousel';
import Image from 'react-bootstrap/Image';
import Row from 'react-bootstrap/Row';
import Container from 'react-bootstrap/Container';

function Detail(props) {



  return (
    <div>
      detail
      <Carousel data-bs-theme="dark">
        <Carousel.Item>
          <Image
            style={{ width: "30%" }}
            src="/logo192.png"
          />
        </Carousel.Item>
        <Carousel.Item>
          <Image
            style={{ width: "30%" }}
            src="/logo192.png"
          />
        </Carousel.Item>
        <Carousel.Item>
          <Image
            style={{ width: "30%" }}
            src="/logo192.png"
          />
        </Carousel.Item>
      </Carousel>
      <div>
        <h2>노트북</h2>
        <Container>
          <div></div>
          <Row className="cardstyle">
            <li><h4>CPU : Intel Core I5 8th Gen</h4></li>
            <li><h4>RAM : LPDDR4 8GB</h4></li>
            <li><h4>SSD : 256GB NVME</h4></li>  
            <li><h4>SSD : 256GB NVME</h4></li>      
          </Row>
        </Container>
      </div>
    </div>
  )
}

export default Detail;