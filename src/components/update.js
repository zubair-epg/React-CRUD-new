import React, { useState, useEffect } from "react";
import { Button, Form } from "semantic-ui-react";
import axios from "axios";
import { useHistory } from "react-router";


export default function Update() {
  let history = useHistory();
  const [id, setID] = useState(null);
  const [nftId, setNftId] = useState();
//   const [eventId, setEventId] = useState([]);




  useEffect(() => {
    setID(localStorage.getItem("ID"));
    setNftId(localStorage.getItem("Full Name"));
    // setEventId(localStorage.getItem("Age"));

    nftIdApi();
  }, []);

  const updateAPIData = () => {
    axios
      .patch(`http://10.194.2.118:2087/api/v1/metaverse/ticket${id}`, {
        nftId,
      })
      .then(() => {
        history.push("/");
      });
  };

  const nftIdApi = () => {
    axios
      .get(`http://10.194.2.118:2087/admin/nft/select`, {
        headers: {
          Authorization:
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwYXlsb2FkIjp7Il9pZCI6IjYyMDNkZWIyOGQ4NGE5NDBmNDgzMGMyMyIsImFkZHJlc3MiOiIweDlhZEMyZUFEZTAxZUFDODdkMDVhMTY1ODkwZDY0MjQ5NTRFMGZjMjIiLCJzdGF0dXMiOmZhbHNlfSwiaWF0IjoxNjQ2MjQyNDA5LCJleHAiOjE2NDY4NDcyMDl9.LmYnNvgMrw5YXMyuTNYNNH-7aMRIFBpbKuE7fr-vdbU",
        },
      })
      .then((response) => setNftId(response.data.data));
  };
  console.log(nftId);

//   const option = nftId.map(function (d){
//      return  `${d.id}`
//     })
// console.log(option)

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
            options={options}
            placeholder='Gender'
             onChange={(e) => setNftId(e.target.value)}
          />
    

          {/* <label></label>
                    <input placeholder='Full Name' value={name} onChange={(e) => setFullName(e.target.value)}/> */}
        </Form.Field>
        <Form.Field>
          {/* <Form.Select
            fluid
            label="EVENT ID"
            options={options}
            placeholder="Gender"
            onChange={(e) => e.target.value}
          /> */}
          {/* <label>Age</label>
                    <input placeholder='Age' value={age} onChange={(e) => setAge(e.target.value)}/> */}
        </Form.Field>
        <Button type="submit" onClick={updateAPIData}>
          Update
        </Button>
      </Form>
    </div>
  );
}
