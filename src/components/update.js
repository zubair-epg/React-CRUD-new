import React, { useState, useEffect } from "react";
import { Button, Form } from "semantic-ui-react";
import axios from "axios";
import { useHistory } from "react-router";


export default function Update() {
  let history = useHistory();
  // const [id, setID] = useState(null);
  const [nftId, setNftId] = useState(null);
   const [eventId, setEventId] = useState([]);

  useEffect(() => {
    // setID(localStorage.getItem("ID"));
    // setNftId(localStorage.getItem("Full Name"));
    // setEventId(localStorage.getItem("Age"));

     nftIdApi();
  }, []);
  const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwYXlsb2FkIjp7Il9pZCI6IjYyMDNkZWIyOGQ4NGE5NDBmNDgzMGMyMyIsImFkZHJlc3MiOiIweDlhZGMyZWFkZTAxZWFjODdkMDVhMTY1ODkwZDY0MjQ5NTRlMGZjMjIiLCJzdGF0dXMiOmZhbHNlfSwiaWF0IjoxNjQ3NjI2NDAyLCJleHAiOjE2NDgyMzEyMDJ9.VM72QD2nEPmJ-LiFSfEaIIveOyP2aOoG5zpUULSc19k'

  const updateAPIData = (id) => {
    axios
      .put(`http://10.194.2.113:2087/api/v1/metaverse/ticket/${id}`, {
        nftId,
        eventId
      },
      { headers : {
        Authorization:`Bearer ${token}`
    }
}
      )
      .then(() => {
        history.push("/");
      });
  };

  const nftIdApi = () => {
    axios
      .get(`http://10.194.2.113:2087/admin/nft/select`, {
        headers: {
          Authorization:
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwYXlsb2FkIjp7Il9pZCI6IjYyMDNkZWIyOGQ4NGE5NDBmNDgzMGMyMyIsImFkZHJlc3MiOiIweDlhZEMyZUFEZTAxZUFDODdkMDVhMTY1ODkwZDY0MjQ5NTRFMGZjMjIiLCJzdGF0dXMiOmZhbHNlfSwiaWF0IjoxNjQ2MjQyNDA5LCJleHAiOjE2NDY4NDcyMDl9.LmYnNvgMrw5YXMyuTNYNNH-7aMRIFBpbKuE7fr-vdbU",
        },
      })
      .then((response) => setNftId(response.data));
  };
  console.log(typeof nftId);
  console.log(nftIdApi);
// const options = option
  const options = [
    { text: "Male", value: "male" },
    { text: "Female", value: "female" },
    { text: "Other", value: "other" },
  ];
  return (
    <div>
      
      <Form className="create-form">
        <Form.Field>
          <Form.Select
            fluid
            label='NFT ID'
            options={Object.keys(nftId).map((d) => d.nftId)}
            placeholder='Gender'
             onChange={(e) => setNftId(e.target.value)}
          />
    

          {/* <label>nft id</label>
                    <input placeholder='nft id' onChange={(e) => setNftId(e.target.value)}/> */}
        </Form.Field>
        <Form.Field>
          <Form.Select
            fluid
            label="EVENT ID"
            options={options}
            placeholder="Gender"
            onChange={(e) => e.target.value}
          />
          {/* <label>eventId</label>
                    <input placeholder='event id'  onChange={(e) => setEventId(e.target.value)}/> */}
        </Form.Field>
        <Button type="submit" onClick={updateAPIData('6228e89efdab1e1e30e5f22b')}>
          Update
        </Button>
      </Form>
    </div>
  );
}
