import React from 'react';
import { Col } from 'reactstrap';

const  BigPic = (props) => {
    return (
        <Col className="shadow" style={{width: '100%', height: '100%', backgroundImage: 'url('+props.imgUrl+')', backgroundSize: 'cover', backgroundPosition: 'center'}}>
            <div className="photoDetails">
                <div className="photoTitle textShadow">{props.imgTitle}</div>
                <div className="photoDate textShadow">{props.imgDate}</div>
            </div>
            
            <div className="photoCopy textShadow">{props.imgCopy}</div>
        </Col>
    )
}

export default BigPic;