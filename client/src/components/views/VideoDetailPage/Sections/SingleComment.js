import React, { useState } from 'react'
import { Comment, Button, Avatar, Input } from 'antd';
import Axios from 'axios';
import LikeDislikes from './LikeDislikes';
import { useSelector } from 'react-redux';

const {TextArea} = Input;

function SingleComment(props) {
    const user = useSelector(state => state.user)

    const [OpenReply, setOpenReply] = useState(false)
    const [commentValue, setcommentValue] = useState('')

    const onClickReplyOpen = () => {
        setOpenReply(!OpenReply)
    }

    const handleClick = (event) => {
        setcommentValue(event.currentTarget.value)
    }

    const onSubmit = (event) => {
        event.preventDefault();

        const variables = {
            content: commentValue,
            writer: user.userData._id,
            postId: props.postId,
            responseTo: props.comment._id
        }

        Axios.post('/api/comment/saveComment', variables)
            .then(response => {
                if(response.data.success) {
                    console.log(response.data)
                    setcommentValue("")
                    setOpenReply(false)
                    props.refreshFunction(response.data.result)
                } else {
                    alert('댓글 저장 실패.')
                }
            })
            
    }

    const actions = [
        <LikeDislikes userId={localStorage.getItem('userId')} commentId={props.comment._id}/>
        ,<span onClick={onClickReplyOpen} key="comment-basic-reply-to"> 답글</span>
    ]

    return (
        <div>
            <Comment
                actions={actions}
                author={props.comment.writer.name}
                avatar={<Avatar src={props.comment.writer.image} />}
                content={ <p>{props.comment.content}</p>}
            />

            {OpenReply &&
            <form style={{ display: 'flex' }} onSubmit={onSubmit} >
                <textarea 
                    style = {{ width: '100%', borderRadius: '5px' }}
                    onChange={handleClick}
                    value={commentValue}
                    placeholder="공개 답글 추가..."
                />
                <br />
                <button style={{ width: '20%', height: '52px' }} onClick={onSubmit} >댓글</button>
            </form>
            }
        </div>
    )
}

export default SingleComment
