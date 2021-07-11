import Axios from 'axios'
import React, { useEffect, useState } from 'react'

function Subscribe(props) {

    const [SubscribeNumber, setSubscribeNumber] = useState(0)
    const [Subscribed, setSubscribed] = useState(false)

    useEffect(() => {
        let variable = { userTo: props.userTo, userFrom: localStorage.getItem('userId') }

        Axios.post('/api/subscriber/subscriberNumber', variable)
            .then( response => {
                if(response.data.success) {
                    setSubscribeNumber(response.data.subscribeNumber)
                } else {
                    alert("구독자 수 불러오기 실패.")
                }
            })
            
        Axios.post('/api/subscriber/subscribed', variable)
            .then( response => {
                if(response.data.success) {
                    setSubscribed(response.data.subscribed)
                } else {
                    alert("구독 여부 확인 실패.")
                }
            })
    })

    const onSubscribe = () => {

        let subscribeVariable = {
            userTo: props.userTo,
            userFrom: props.userFrom
        }

        if(Subscribed) {
            Axios.post('/api/subscriber/unSubscribe', subscribeVariable)
            .then( response => {
                if(response.data.success) {
                    setSubscribeNumber(SubscribeNumber - 1)
                    setSubscribed(!Subscribed)
                } else {
                    alert("구독 취소 실패.")
                }
            })
        } else {
            Axios.post('/api/subscriber/subscribe', subscribeVariable)
            .then( response => {
                if(response.data.success) {
                    setSubscribeNumber(SubscribeNumber + 1)
                    setSubscribed(!Subscribed)
                } else {
                    alert("구독 실패.")
                }
            })
        }
    }

    return (
        <div>
            <button 
                style={{
                    backgroundColor: `${Subscribed ? '#AAAAAA':'#CC0000'}`, borderRadius: '4px', color: 'white', padding: '10px 16px',
                    fontWeight: '500', fontSize: '1rem', textTransform: 'uppercase'
                }}
                onClick={onSubscribe}
            >
                {SubscribeNumber} {Subscribed ? 'Subscribed':"Subscribe"}
            </button>
        </div>
    )
    
}

export default Subscribe
