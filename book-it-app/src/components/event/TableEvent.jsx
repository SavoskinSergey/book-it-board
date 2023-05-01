import { Table } from 'react-bootstrap';
import TableEventRow from './TableEventRow';       


function TableEvent({ events }) { 
  return (
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>#</th>
          <th>Дата</th>
          <th>Начало в</th>
          <th>Описание</th>
          <th>Количество участников</th>
          <th>Количество операторов</th>
          <th>Свободные места</th>
        </tr>
      </thead>
      <tbody>

      {events.data?.results.map((event, index) => (
        <TableEventRow key={index} event={event} />
       ))}
      </tbody>
    </Table>
  );
}

export default TableEvent;
