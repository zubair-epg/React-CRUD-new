import React, { useState, useEffect } from "react";
import { Button, Form, Dropdown } from "semantic-ui-react";
import axios from "axios";
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

 

  const nftOptions = nftId.map((d , ind) => ({ text: d.text, value: d.id }));
  const eventOptions = eventId.map((d , ind) => ({ text: d.name, value: d._id }));

  const EventOptionSelection = () => (
    <Dropdown
      placeholder={eventText}
      fluid
      search
      selection
      
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
//   console.log(nftId);
//   console.log(eventId);
//   console.log(nftIdVal);
//   console.log(eventIdVal);
  const postData = () => {
    axios
      .post(
        `http://10.194.2.113:2087/api/v1/metaverse/ticket`,
        { nftId: nftIdVal, eventId: eventIdVal },
        {
          headers: {
            Authorization: `Bearer ${token}`,
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
