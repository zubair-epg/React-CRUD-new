import React, { useState, useEffect } from "react";
import { Button, Form, Dropdown } from "semantic-ui-react";
import axios from "axios";
import 'dotenv/config'
import { useHistory } from "react-router";

export default function Create() {
  let history = useHistory();
  const [nftIdVal, setNftIdVal] = useState();
  const [eventIdVal, setEventIdVal] = useState();
  const [eventText, setEventText] = useState("Create Event");

  const [nftId, setNftId] = useState([]);
  const [eventId, setEventId] = useState([]);

  useEffect(() => {
    nftIdApi();

    eventIdApi();
    console.log("useeffect rendered")
  }, []);

  const nftIdApi = () => {
    axios
      .get(process.env.REACT_APP_NFT_GET_API, {
        headers: {
          Authorization: process.env.REACT_APP_BEARER_TOKEN,
        },
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

 

  const nftOptions = nftId.map((d , ind) => ({key:ind, text: d.text, value: d.id }));
  const eventOptions = eventId.map((d , ind1) => ({key:ind1, text: d.name, value: d._id }));

  const EventOptionSelection = () => (
    <Dropdown
      placeholder={eventText}
      fluid
      search
      selection
      key={eventOptions.key}
      options={eventOptions}
      onChange={eventDropDownSelect}
    />
  );

  const NftOptionSelection = () => (
    <Dropdown
      selection
      fluid
      search
      
      placeholder="Select Nft Id"
      options={nftOptions}
      onChange={nftDropDownSelect}
    />
  );

  const nftDropDownSelect = (event, data) => {
    setNftIdVal(data.value);
  };
  const eventDropDownSelect = (event, data) => {
    console.log("data",data);
    setEventText(event.target.innerText)
    setEventIdVal(data.value);
   
  };

  const postData = () => {
    axios
      .post(process.env.REACT_APP_TICKET_API,
        { nftId: nftIdVal, eventId: eventIdVal },
        {
          headers: {
            Authorization: process.env.REACT_APP_BEARER_TOKEN,
          },
        }
      )
      .then(() => {
        alert("successfully created")  
        history.push("/");
      });
  };

  return (
    <div>
      <Form className="create-form">
        <Form.Field>
          {/* <label>NFT Id</label>
                    <input placeholder='NFT Id' onChange={(e) => setNftId(e.target.value)}/> */}
          <NftOptionSelection />
        </Form.Field>
        <Form.Field>
          {/* <label>Event Id</label>
                    <input placeholder='Event Id' onChange={(e) => setEventId(e.target.value)}/> */}
          <EventOptionSelection />
        </Form.Field>

        <Button onClick={postData} type="submit">
          Submit
        </Button>
      </Form>
    </div>
  );
}
