import Axios from 'axios';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import SingleComment from './SingleComment';
import ReplyComment from './ReplyComment';

function Comment(props) {
    const videoId = props.postId
    const user = useSelector(state => state.user)
    const [commentValue, setcommentValue] = useState('')

    const handleClick = (event) => {
        setcommentValue(event.currentTarget.value)
    }

    const onSubmit = (event) => {
        event.preventDefault();

        const variables = {
            content: commentValue,
            writer: user.userData._id,
            postId: videoId
        }

        Axios.post('/api/comment/saveComment', variables)
            .then(response => {
                if(response.data.success) {
                    console.log(response.data)
                    setcommentValue("")
                    props.refreshFunction(response.data.result)
                } else {
                    alert('댓글 저장 실패.')
                }
            })
    }

    return (
        <div>
            <br />
            <p>댓글</p>
            <hr />

            {props.commentLists && props.commentLists.map((comment, index) => (
                (!comment.responseTo &&
                    <React.Fragment key={index}>
                        <SingleComment refreshFunction={props.refreshFunction} comment={comment} postId={videoId}/>
                        <ReplyComment refreshFunction={props.refreshFunction} parentCommentId={comment._id} commentLists={props.commentLists} postId={videoId}/>
                    </React.Fragment>
                )
            ))}

            <form style={{ display: 'flex' }} onSubmit={onSubmit} >
                <textarea 
                    style = {{ width: '100%', borderRadius: '5px' }}
                    onChange={handleClick}
                    value={commentValue}
                    placeholder="공개 댓글 추가..."
                />
                <br />
                <button style={{ width: '20%', height: '52px' }} onClick={onSubmit} >댓글</button>
            </form>
        </div>
    )
}

export default Comment
