import React from 'react';
import { Col } from 'reactstrap';

const PreviousThumbs = (props) => {
    return (
        <Col style={{position: 'relative', backgroundImage: 'url('+props.imgUrl+')', backgroundSize: 'cover', backgroundPosition: 'center'}} onClick={() => props.setBigPic(props.imgIndex)}>
            <p className="photoDate textShadow">{props.imgDate}</p>
        </Col>   
    )
}

export default PreviousThumbs;