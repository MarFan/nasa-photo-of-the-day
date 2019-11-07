import React from 'react'

const NewThumb = props => {
    return (
        <div className="boxShadow" style={{position: 'relative', backgroundImage: 'url('+props.imgUrl+')', backgroundSize: 'cover', backgroundPosition: 'center'}} onClick={() => props.setBigPic(props.imgIndex)}>
            {/* <p className="photoDate textShadow">{props.imgDate}</p> */}
        </div>
    )
}

export default NewThumb;