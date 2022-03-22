import axios from "axios";
import React, { useEffect, useState } from "react";
import { Table, Button } from "semantic-ui-react";
import { Link } from "react-router-dom";
import 'dotenv/config'

export default function Read() {
  const [APIData, setAPIData] = useState([]);
  useEffect(() => {
    axios
      .get(process.env.REACT_APP_TICKET_API)
      .then((response) => {
        setAPIData(response.data.data);
      });
  }, []);
  const setData = (data) => {
    let { id, eventId, nftId, createdAt } = data;
    localStorage.setItem("ID", id);
    localStorage.setItem("Event Id", eventId);
    localStorage.setItem("NFT ID", nftId.id);
    localStorage.setItem("Created At", createdAt);
  };

  const getData = () => {
    axios
      .get(process.env.REACT_APP_TICKET_API)
      .then((getData) => {
        setAPIData(getData.data.data);
      });
  };

  const onDelete = (id) => {
    axios
      .delete(`${process.env.REACT_APP_TICKET_API}/${id}`, {
        headers: {
          Authorization:process.env.REACT_APP_BEARER_TOKEN
        },
      })
      .then(() => {
        getData();
      });
  };

  return (
    <div>
          <Link to="/create">
            <Button>Create</Button>
          </Link>
      <Table singleLine>
    
        <Table.Header>
        
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
                <Table.Cell>{d.nftId.id}</Table.Cell>
                <Table.Cell>{d.createdAt}</Table.Cell>
                <Table.Cell>
                  <Link to="/update">
                    <Button onClick={() => setData(d)}>Update</Button>
                  </Link>
                </Table.Cell>
                <Table.Cell>
                  <Button onClick={() => onDelete(d.id)}>Delete</Button>
                </Table.Cell>
              </Table.Row>
            );
          })}
        </Table.Body>
      </Table>
    </div>
  );
}
