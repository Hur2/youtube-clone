import React, { useEffect, useState } from 'react'
import SingleComment from './SingleComment'

function ReplyComment(props) {

    const [ChildCommentNumber, setChildCommentNumber] = useState(0)
    const [OpenReplyComments, setOpenReplyComments] = useState(false)

    useEffect(() => {
        let commentNumber = 0;

        props.commentLists.map((comment) => {
            if(comment.responseTo === props.parentCommentId){
                commentNumber++
            }
        })
        setChildCommentNumber(commentNumber)
    },[props.commentLists])

    const renderReplyComment = (parentCommentId) =>
        props.commentLists.map((comment, index) => (
            <React.Fragment>
                {
                    comment.responseTo === parentCommentId &&
                    <div  style={{  width: '80%', marginLeft: '40px' }}>
                        <SingleComment refreshFunction={props.refreshFunction} comment={comment} postId={props.videoId}/>
                        <ReplyComment refreshFunction={props.refreshFunction} parentCommentId={comment._id} commentLists={props.commentLists} postId={props.videoId}/>
                    </div>
                }
            </React.Fragment>
        ))
    
    const onHandleChange = () => {
        setOpenReplyComments(!OpenReplyComments)
    }

    return (
        <div>
            {ChildCommentNumber > 0 &&
            <p style={{ fontSize: '14px', margin: 0, color: 'gray' }} onClick={onHandleChange}>
                답글 {ChildCommentNumber}개
            </p>
            }
            {OpenReplyComments &&
            renderReplyComment(props.parentCommentId)
            }
        </div>
    )
}

export default ReplyComment
