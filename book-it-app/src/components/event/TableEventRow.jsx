import React from "react";
import moment from "moment-timezone";

function TableEventRow(props) {
  const { event, key } = props;
  const date = moment(event.event_data).format("DD.MM YYYY")
  const start = moment(event.event_data).format("hh:mm")
  return (
    <tr key={key}>
      <td>{key}</td>
      <td>{date}</td>
      <td>{start}</td>
      <td>{event.body}</td>
      <td>{event.subscribes_count}</td>
      <td>{event.boards_count}</td>
      <td>{Math.max(event.event_limit-event.subscribes_count,0)}</td>
    </tr>
  );
}

export default TableEventRow;
