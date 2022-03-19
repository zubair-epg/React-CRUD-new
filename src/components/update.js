import React, { useState, useEffect } from "react";
import { Button, Form , Dropdown} from "semantic-ui-react";
import axios from "axios";
import { useHistory } from "react-router";

export default function Update() {
  let history = useHistory();
  // const [id, setID] = useState(null);
  const [nftId, setNftId] = useState([]);
   const [eventId, setEventId] = useState([]);
   
   const nftIdApi = () => {
    axios
      .get(`http://10.194.2.113:2087/admin/nft/select`, {
        headers: {
          Authorization:
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwYXlsb2FkIjp7Il9pZCI6IjYyMDNkZWIyOGQ4NGE5NDBmNDgzMGMyMyIsImFkZHJlc3MiOiIweDlhZEMyZUFEZTAxZUFDODdkMDVhMTY1ODkwZDY0MjQ5NTRFMGZjMjIiLCJzdGF0dXMiOmZhbHNlfSwiaWF0IjoxNjQ2MjQyNDA5LCJleHAiOjE2NDY4NDcyMDl9.LmYnNvgMrw5YXMyuTNYNNH-7aMRIFBpbKuE7fr-vdbU",
        },
      })
      .then((response) => setNftId(response.data.data));
  };
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

  // const options = option
  // console.log(nftIdApi);
  const nftOptions = nftId.map(d => ({text:d.text , value:d.id}))
   console.log(nftOptions);
  const nftOptionId = nftId.map(d => ({value:d.id}))
  var nftIdVal = nftOptionId.filter(singleOptions => (singleOptions.nftOptions));
  const friendOptions = [
    {
      key: 'Jenny Hess',
      text: 'Jenny Hess',
      value: 'Jenny Hess',
      image: { avatar: true, src: '/images/avatar/small/jenny.jpg' },
    },
    {
      key: 'Elliot Fu',
      text: 'Elliot Fu',
      value: 'Elliot Fu',
      image: { avatar: true, src: '/images/avatar/small/elliot.jpg' },
    },
    {
      key: 'Stevie Feliciano',
      text: 'Stevie Feliciano',
      value: 'Stevie Feliciano',
      image: { avatar: true, src: '/images/avatar/small/stevie.jpg' },
    },
    {
      key: 'Christian',
      text: 'Christian',
      value: 'Christian',
      image: { avatar: true, src: '/images/avatar/small/christian.jpg' },
    },
    {
      key: 'Matt',
      text: 'Matt',
      value: 'Matt',
      image: { avatar: true, src: '/images/avatar/small/matt.jpg' },
    },
    {
      key: 'Justen Kitsune',
      text: 'Justen Kitsune',
      value: 'Justen Kitsune',
      image: { avatar: true, src: '/images/avatar/small/justen.jpg' },
    },
  ]
  function selectedNftId() {
    var nftIdNode = document.getElementById('subjectName');
    var value = nftIdNode.options[nftIdNode.selectedIndex].value;
    console.log("The selected value=" + value);
 }
  const NftOptionSelection = () => (
    <Dropdown
    id="subjectName"
      placeholder='Select Nft Id'
      fluid
      selection
      options={nftOptions}
      onChange={selectedNftId}
    />
  )
  const EventOptionSelection = () => (
    <Dropdown
      placeholder='Select Friend'
      fluid
      selection
      options={friendOptions}
      onAddItem={selectedNftId}
    />
  )



  console.log(nftOptions);
  console.log(nftOptionId);
  return (
    <div>
    
      <Form className="create-form">
        <Form.Field>
          {/* <Form.Select
            fluid
            label='NFT ID'
            options={nftOptions}
            //  value={nftOptions}
            placeholder='NFT ID'
            //  onChange={(e) => setNftId(e.target.value)}
          /> */}
        <NftOptionSelection />

        </Form.Field>
        <Form.Field>
        
        <EventOptionSelection />
        </Form.Field>
        <Button type="submit" onClick={updateAPIData('6228e89efdab1e1e30e5f22b')}>
          Update
        </Button>
      </Form>
    </div>
  );
}
