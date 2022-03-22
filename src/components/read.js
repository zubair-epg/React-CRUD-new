import axios from "axios";
import React, { useEffect, useState } from "react";
import { Table, Button } from "semantic-ui-react";
import { Link } from "react-router-dom";

export default function Read() {
  const [APIData, setAPIData] = useState([]);
  useEffect(() => {
    axios
      .get(`http://10.194.2.113:2087/api/v1/metaverse/ticket`)
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
      .get(`http://10.194.2.113:2087/api/v1/metaverse/ticket`)
      .then((getData) => {
        setAPIData(getData.data.data);
      });
  };

  const onDelete = (id) => {
    axios
      .delete(`http://10.194.2.113:2087/api/v1/metaverse/ticket/${id}`, {
        headers: {
          Authorization:
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwYXlsb2FkIjp7Il9pZCI6IjYyMDNkZWIyOGQ4NGE5NDBmNDgzMGMyMyIsImFkZHJlc3MiOiIweDlhZEMyZUFEZTAxZUFDODdkMDVhMTY1ODkwZDY0MjQ5NTRFMGZjMjIiLCJzdGF0dXMiOmZhbHNlfSwiaWF0IjoxNjQ2MjQyNDA5LCJleHAiOjE2NDY4NDcyMDl9.LmYnNvgMrw5YXMyuTNYNNH-7aMRIFBpbKuE7fr-vdbU",
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
