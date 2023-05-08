import { Table } from 'react-bootstrap';
import moment from "moment-timezone";
import { Link } from 'react-router-dom';


function TableOrder({ orders }) { 
  return (
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>#</th>
          <th>Дата</th>
          <th>Начало в</th>
          <th>Событие</th>
          <th>Участник</th>
          <th>Статус</th>
          <th>Комментарий участника</th>
          <th>Комментарий организатора</th>
        </tr>
      </thead>
      <tbody>

      {orders.data?.results.map((order, index) => {
        const date = moment(order.event.event_data).format("DD.MM YYYY");
        const start = moment(order.event.event_data).format("hh:mm");

        return (
            <tr key={index}>
                <td>
                    <Link to={`/order/${order.token}/`}>
                        {index+1}
                    </Link>
                </td>
                <td>{date}</td>
                <td>{start}</td>
                <td>
                    <Link to={`/event/${order.event.id}/`}>
                        {order.event.body}
                    </Link>
                    
                </td>
                <td>{order.account.username}</td>
                <td>{order.status}</td>
                <td>{order.comment}</td>
                <td>---</td>
            </tr>
        );
        })}
        
      </tbody>


    </Table>
  );
}

export default TableOrder;
