import React from "react";
import { Carousel, CarouselItem } from "react-bootstrap";
import { Link } from "react-router-dom";

import moment from "moment-timezone";

const Slider = ({events, title})=>{
    return(
        <Carousel>
              {events.data?.results.map((event, index) => (
                <CarouselItem key={index}>
                  <img width={900} height={500} alt="900x500" src={event.image} />
                  <Carousel.Caption>
                    <h3>{event.body}</h3>
                    <p>Ближайшая дата {moment(event.event_data).format("DD.MM YYYY старт в hh:mm")}</p>
                    <b>связаться с администратором </b>
                    <Link to={`/profile/${event.admin.id}/`}> {event.admin.username}</Link>
                    <p>{Math.max(event.event_limit-event.subscribes_count,0)} количество свободных мест.</p>
                      <Link to={`/event/${event.id}/`}>
                        Подробнее..
                      </Link>
                  </Carousel.Caption>
                </CarouselItem>
              ))}
            </Carousel>
    )
}

export default Slider