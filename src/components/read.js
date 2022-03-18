import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Table, Button } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

export default function Read() {
    const [APIData, setAPIData] = useState([]);
    useEffect(() => {
        axios.get(`http://10.194.2.142:2087/api/v1/metaverse/ticket`)
            .then((response) => {
                console.log(response.data)
                 setAPIData(response.data);
            })
    }, []);
console.log(APIData)
    const setData = (data) => {
        let { id, eventId, nftId, createdAt } = data;
        localStorage.setItem('ID', id);
        localStorage.setItem('Event Id', eventId);
        localStorage.setItem('NFT ID', nftId.id);
        localStorage.setItem('Created At', createdAt)
    }

    const getData = () => {
        axios.get(`https://623241cd6f4ffe00fb85929b.mockapi.io/posts`)
            .then((getData) => {
                setAPIData(getData.data);
            })
    }
    console.log(APIData)

    const onDelete = (id) => {
        axios.delete(`https://623241cd6f4ffe00fb85929b.mockapi.io/posts/${id}` 
        // ,{
        //     headers: {
        //         Authorization : 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwYXlsb2FkIjp7Il9pZCI6IjYyMDNkZWIyOGQ4NGE5NDBmNDgzMGMyMyIsImFkZHJlc3MiOiIweDlhZEMyZUFEZTAxZUFDODdkMDVhMTY1ODkwZDY0MjQ5NTRFMGZjMjIiLCJzdGF0dXMiOmZhbHNlfSwiaWF0IjoxNjQ2MjQyNDA5LCJleHAiOjE2NDY4NDcyMDl9.LmYnNvgMrw5YXMyuTNYNNH-7aMRIFBpbKuE7fr-vdbU'
        //     }
        // }
        )
        .then(() => {
            getData();
        })
    }

    return (
        <div>
            <Table singleLine>
                <Table.Header>
                <Link to='/create'>
                <Button>Create</Button>
                </Link>
                    <Table.Row>
                       
                        <Table.HeaderCell>ID</Table.HeaderCell>
                        <Table.HeaderCell>EVENT ID</Table.HeaderCell>
                        <Table.HeaderCell>NFT Id</Table.HeaderCell>
                        <Table.HeaderCell>Created AT</Table.HeaderCell>
                        <Table.HeaderCell>Update</Table.HeaderCell>
                        <Table.HeaderCell>Delete</Table.HeaderCell>
                    </Table.Row>
                </Table.Header>

                <Table.Body>
                    {APIData.map((d , ind) => {
                        return (
                            <Table.Row key={ind}>
                                
                                <Table.Cell>{d.id}</Table.Cell>
                                <Table.Cell>{d.eventId}</Table.Cell>
                                <Table.Cell>{d.nftId}</Table.Cell>
                                <Table.Cell>{d.createdAt}</Table.Cell>
                                <Link to='/update'>
                                    <Table.Cell> 
                                        <Button onClick={() => setData(d)} >Update</Button>
                                    </Table.Cell>
                                </Link>
                                <Table.Cell>
                                    <Button onClick={() => onDelete(d.id)} >Delete</Button>
                                </Table.Cell>
                            </Table.Row>
                        )
                    })}
                </Table.Body>
            </Table>
        </div>
    )
}
