import React from "react";

const PostHeader = (props) => {
    return (
        <div className="row align-items-center">
            <div className="col-sm-3 col-md-2">
                <img className="profile-img my-4 me-4" src={props.userPic} alt={props.userName} />
            </div>
            <div className="col-sm-9 col-md-10">
                <h5 style={{fontWeight:800}}>{props.userName}</h5>
                 <div>
                     {props.userDetails.map(detail => <span className="badge rounded-pill bg-primary me-2 my-1">{detail}</span>)}
                 </div>
                 <div>
                     {props.postDetails.map(detail => <span className="badge rounded-pill bg-light text-dark me-2 my-1">{detail}</span>)}
                 </div>
            </div>
        </div>
    )
}

export default PostHeader;