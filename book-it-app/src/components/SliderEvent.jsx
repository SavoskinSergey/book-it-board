import React, { Component, useContext } from 'react'
import { Carousel, CarouselItem } from "react-bootstrap";
import { format } from "timeago.js";
import { LikeFilled, CommentOutlined, LikeOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import moment from "moment-timezone";
import axiosService from "../helpers/axios";
import { getUser } from "../hooks/user.actions";
import UpdateEvent from "./event/UpdateEvent";
import { Context } from "./Layout";
import ocean from "../ocean.jpg"

// export default function SliderEvent(){
// function SliderEvent(props) {
const SliderEvent = React.forwardRef((props, ref)=>{
    const { event, refresh, isSingleEvent } = props;
    const { setToaster } = useContext(Context);

    const user = getUser();
    // const date = moment(event.event_data);
    // const date = moment("2014-06-01T12:00:00Z").format("MM YYYY");
    const date = moment(event.event_data).format("DD.MM YYYY старт в hh:mm");
    
    const handleLikeClick = (action) => {
    axiosService
    .post(`/event/${event.id}/${action}/`)
    .then(() => {
        refresh();
    })
    .catch((err) => console.error(err));
    };

    const handleDelete = () => {
        axiosService
            .delete(`/event/${event.id}/`)
            .then(() => {
                setToaster({
                type: "warning",
                message: "Event deleted 🚀",
                show: true,
                title: "Event Deleted",
            });
            refresh();
            })
            .catch(() => {
                setToaster({
                type: "danger",
                message: "An error occurred.",
                show: true,
                title: "Event Error",
            });
        });
    };

    return(
        <CarouselItem style={{'height':'400px'}}>
            <img
                className="d-block w-100"
                src= {event.image}
                alt="First slide"
                />
            <Carousel.Caption>
                    <h3> Закат  </h3>
                    <p> вечерний романтик</p>
            </Carousel.Caption>
        </CarouselItem>


        
/* <CarouselItem style={{'height':'400px'}}>
<img
    className="d-block w-100"
    src={ocean}
    alt="First slide"
    />
<Carousel.Caption>
    <h3> Закат  </h3>
    <p> вечерний романтик</p>
</Carousel.Caption>
</CarouselItem> */
        
    // )
// }
    )
}
)

export default SliderEvent;
