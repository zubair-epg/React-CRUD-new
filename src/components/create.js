import React, { useState } from 'react';
import { Button, Checkbox, Form } from 'semantic-ui-react'
import axios from 'axios';
import { useHistory } from 'react-router';

export default function Create() {
    let history = useHistory();
    const [nftId, setNftId] = useState();
   const [eventId, setEventId] = useState();
   const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwYXlsb2FkIjp7Il9pZCI6IjYyMDNkZWIyOGQ4NGE5NDBmNDgzMGMyMyIsImFkZHJlc3MiOiIweDlhZGMyZWFkZTAxZWFjODdkMDVhMTY1ODkwZDY0MjQ5NTRlMGZjMjIiLCJzdGF0dXMiOmZhbHNlfSwiaWF0IjoxNjQ3NjI2NDAyLCJleHAiOjE2NDgyMzEyMDJ9.VM72QD2nEPmJ-LiFSfEaIIveOyP2aOoG5zpUULSc19k'
 
    const postData = () => {
        axios.post(`http://10.194.2.113:2087/api/v1/metaverse/ticket`,{"nftId":
        nftId,
        "eventId":
        eventId
       },
           { headers : {
                Authorization:`Bearer ${token}`
            }
        }
            
           
        ).then(() => {
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
