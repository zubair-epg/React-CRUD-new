import React, { useState, useEffect } from "react";
import { Button, Form, Dropdown } from "semantic-ui-react";
import axios from "axios";
import { useHistory } from "react-router";

export default function Update() {
  let history = useHistory();

  const [nftIdVal, setNftIdVal] = useState();
  const [eventIdVal, setEventIdVal] = useState();
  const [nftId, setNftId] = useState([]);
  const [eventId, setEventId] = useState([]);
  const ticketId = localStorage.getItem("ID");
  console.log(ticketId);
  useEffect(() => {
    nftIdApi();
    eventIdApi();
    console.log("useeffect rendered");
  }, []);

  const token =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwYXlsb2FkIjp7Il9pZCI6IjYyMDNkZWIyOGQ4NGE5NDBmNDgzMGMyMyIsImFkZHJlc3MiOiIweDlhZGMyZWFkZTAxZWFjODdkMDVhMTY1ODkwZDY0MjQ5NTRlMGZjMjIiLCJzdGF0dXMiOmZhbHNlfSwiaWF0IjoxNjQ3NjI2NDAyLCJleHAiOjE2NDgyMzEyMDJ9.VM72QD2nEPmJ-LiFSfEaIIveOyP2aOoG5zpUULSc19k";
  const nftIdApi = () => {
    axios
      .get(`http://10.194.2.113:2087/admin/nft/select`, {
        headers: {
          Authorization: `${token}`,
        },
      })
      .then((response) => setNftId(response.data.data));
  };

  const eventIdApi = () => {
    axios
      .get(`http://10.194.2.113:2087/api/v1/metaverse/event`, {
        headers: {
          Authorization: `${token}`,
        },
      })
      .then((response) => setEventId(response.data.data));
  };

  const nftOptions = nftId.map((d) => ({ text: d.text, value: d.id }));
  const eventOptions = eventId.map((d) => ({ text: d.name, value: d._id }));

  const nftDropDownSelect = (event, data) => {
    setNftIdVal(data.value);
  };
  const eventDropDownSelect = (event, data) => {
    setEventIdVal(data.value);
  };

  const NftOptionSelection = () => (
    <Dropdown
      placeholder="Select Nft Id"
      options={nftOptions}
      onChange={nftDropDownSelect}
      fluid
      selection
    />
  );
  const EventOptionSelection = () => (
    <Dropdown
      placeholder="Select Event"
      fluid
      selection
      options={eventOptions}
      onChange={eventDropDownSelect}
    />
  );
  console.log(nftIdVal);
  console.log(eventIdVal);
  const updateAPIData = () => {
    console.log("hitted");
    axios
      .put(
        `http://10.194.2.113:2087/api/v1/metaverse/ticket/${ticketId}`,
        { nftId: nftIdVal, eventId: eventIdVal },
        {
          headers: {
            Authorization: `${token}`,
          },
        }
      )
      .then((response) => {
        console.log(response);
        alert("updated successfully")
        setTimeout(()=>{
          history.replace('/')
        },1000)
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div>
      <Form className="create-form">
        <Form.Field>
          <NftOptionSelection />
        </Form.Field>
        <Form.Field>
          <EventOptionSelection />
        </Form.Field>
        <Button type="submit" onClick={() => updateAPIData(nftIdVal)}>
          Update
        </Button>
      </Form>
    </div>
  );
}
