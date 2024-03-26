import { Table } from 'react-bootstrap'; 

function ListTable() {

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
              <tbody>
                <tr>
                  <td>1</td>
                  <td>18LG</td>
                  <td>2018</td>
                  <td>2366607</td>
                  <td>배문규</td>
                </tr>
              </tbody>
            </Table>
          </div>
    )
}

export default ListTable;