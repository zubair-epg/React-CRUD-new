import React, { useState } from 'react';
import { Button, Checkbox, Form } from 'semantic-ui-react'
import axios from 'axios';
import { useHistory } from 'react-router';

export default function Create() {
    let history = useHistory();
    const [nftId, setNftId] = useState();
   const [eventId, setEventId] = useState();
 
    const postData = () => {
        axios.post(`http://10.194.2.118:2087/api/v1/metaverse/ticket`, {
            body :{"nftId":
                nftId,
                "eventId":
                eventId
               },
            headers : {
                Authorization : 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwYXlsb2FkIjp7Il9pZCI6IjYyMDNkZWIyOGQ4NGE5NDBmNDgzMGMyMyIsImFkZHJlc3MiOiIweDlhZEMyZUFEZTAxZUFDODdkMDVhMTY1ODkwZDY0MjQ5NTRFMGZjMjIiLCJzdGF0dXMiOmZhbHNlfSwiaWF0IjoxNjQ2MjQyNDA5LCJleHAiOjE2NDY4NDcyMDl9.LmYnNvgMrw5YXMyuTNYNNH-7aMRIFBpbKuE7fr-vdbU',
                Accept: 'application/json, text/plain, */*',
                'Content-Length': '43',
                'Content-Type': 'application/json;charset=utf-8',
                Host: 'httpbin.org',
                'User-Agent': 'axios/0.21.1',
            },
           
        }).then(() => {
            history.push('/')
        })
    }
    return (
        <div>
            <Form className="create-form">
                <Form.Field>
                    <label>NFT Id</label>
                    <input placeholder='NFT Id' onChange={(e) => setNftId(e.target.value)}/>
                </Form.Field>
                <Form.Field>
                    <label>Event Id</label>
                    <input placeholder='Event Id' onChange={(e) => setEventId(e.target.value)}/>
                </Form.Field>
            
                <Button onClick={postData} type='submit'>Submit</Button>
            </Form>
        </div>
    )
}
