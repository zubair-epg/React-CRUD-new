import React, { useState, useEffect } from "react";
import { Button, Form, Dropdown } from "semantic-ui-react";
import 'dotenv/config'
import axios from "axios";
import { useHistory } from "react-router";

export default function Update() {
  let history = useHistory();

  const [nftIdVal, setNftIdVal] = useState();
  const [eventIdVal, setEventIdVal] = useState();
  const [nftId, setNftId] = useState([]);
  const [eventId, setEventId] = useState([]);
  const ticketId = localStorage.getItem("ID");
  useEffect(() => {
    nftIdApi();
    eventIdApi();
    console.log("useeffect rendered");
  }, []);

 
  const nftIdApi = () => {
    axios
      .get(process.env.REACT_APP_NFT_GET_API, {
        headers: {
          Authorization: process.env.REACT_APP_BEARER_TOKEN,
        }
      })
      .then((response) => setNftId(response.data.data));
  };

  const eventIdApi = () => {
    axios
      .get(process.env.REACT_APP_EVENT_GET_API, {
        headers: {
          Authorization: process.env.REACT_APP_BEARER_TOKEN,
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


  const updateAPIData = () => {

    axios
      .put(
        `${process.env.REACT_APP_TICKET_API}/${ticketId}`,
        { nftId: nftIdVal, eventId: eventIdVal },
        {
          headers: {
            Authorization: process.env.REACT_APP_BEARER_TOKEN,
          },
        }
      )
      .then((response) => {
  
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
