import React from 'react';

const  BigPic = (props) => {
    return (
        <div className="bigPic" style={{backgroundImage: 'url('+props.imgUrl+')', backgroundSize: 'cover', backgroundPosition: 'center'}}>
            <div className="photoDetails">
                <div className="photoTitle textShadow">{props.imgTitle}</div>
                <div className="photoDate textShadow">{props.imgDate}</div>
            </div>
            
            <div className="photoCopy textShadow">{props.imgCopy}</div>
        </div>
    )
}

export default BigPic;