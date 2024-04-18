import { Table } from 'react-bootstrap';
import axios from 'axios'
import React, { useState, useEffect } from "react";
import Badge from 'react-bootstrap/Badge';

function ListTable() {

  const [laptopData, setLaptopData] = useState([])

  useEffect(() => {
    axios.get('http://localhost:8081/laptopdatabases').then((result) => {
      setLaptopData(result.data)
      console.log(laptopData)
    }).catch(() => {
      console.log('failed')
    })
  }, [])

  // console.log(laptopData)
  // console.log(laptopData[0])

    return(
        <div className="tables">
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th class="col-md-1">순번</th>
                  <th class="col-md-1">상품명</th>
                  <th class="col-md-2">물품번호</th>
                  <th class="col-md-1">학번</th>
                  <th class="col-md-1">이름</th>
									<th class="col-md-1">상태</th>
									<th class="col-md-1">비고</th>
                </tr>
              </thead>
              {
          laptopData.map((a, inx) => (
              <tbody key={inx} className='tbody1'>
                <tr className='tr1'>
                  <td className='td1'>{inx + 1}</td>
                  <td className='td1'>{a.name}</td>
                  <td className='td1'>{a.ync_num}</td>
									<td className='td1'>{a.rent_student_id}</td>
									<td className='td1'>{a.rent_name}</td>
                  <td className='td1'>
                    {
                      a.status === '대여가능'
                        ? <Badge bg="success" className="badgeCss">
                          대여가능
                        </Badge>
                        : <Badge bg="danger" className='badgeCss'>
													대여불가
                        </Badge>
                    }
                  </td>
									<td className='td1'>{a.status}</td>
                </tr>
              </tbody>
          ))}
            </Table>
          </div>
    )
}

export default ListTable;