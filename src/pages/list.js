import { Table } from 'react-bootstrap';
import axios from 'axios'
import React, { useState, useEffect } from "react";

function ListTable() {

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

    return(
        <div>
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th class="col-md-1">순번</th>
                  <th class="col-md-1">상품명</th>
                  <th class="col-md-3">물품번호</th>
                  <th class="col-md-1">학번</th>
                  <th class="col-md-1">이름</th>
                </tr>
              </thead>
              {laptopData.map((a, inx) => (
                <tbody key={inx}>
                <tr>
                  <td>{}</td>
                  <td>{a.Name}</td>
                  <td>{a.Model_Year}</td>
                  <td>2366607</td>
                  <td>배문규</td>
                </tr>
              </tbody>
              ))}
            </Table>
          </div>
    )
}

export default ListTable;