import styled from 'styled-components'
import React from 'react'
import { Link } from 'react-router-dom';
import { format } from 'timeago.js'
import { useState, useEffect } from 'react';
import axios from 'axios';


const Container = styled.div`
  width: ${(props) => props.type !== "sm" && "360px"};
  margin-bottom: ${(props) => props.type === "sm" ? "10px" : "45px"};
  cursor: pointer;
  display: ${(props) => props.type === "sm" && "flex"};
  gap:10px;
`;

const Image = styled.img`
  width: 100%;
  height: ${(props) => props.type === "sm" ? "120px" : "202px"};
  background-color: #999;
  flex: 1;
`;


const Details = styled.div`
  display: flex;
  margin-top: ${(props) => props.type === "sm" && "16px"};
  gap: 12px;
  flex: 1;
`;

const ChannelImage = styled.img`
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background-color: #999;
  display: ${(props) => props.type === "sm" && "none"};
`;

const Texts = styled.div`
`;
const Title = styled.h1`
  font-size: 16px;
  font-weight: 500;
  color: ${({ theme }) => theme.text};
`;
const ChannelName = styled.h2`
  font-size: 14px;
  color: ${({ theme }) => theme.textSoft};
  margin: 8px 0px;
`;
const Information = styled.div`
  font-size: 14px;
  color: ${({ theme }) => theme.textSoft};
`;

const Card = ({ type, video }) => {
  const [channel, setChannel] = useState({
    name: '',
    image: ''
  });
  useEffect (() => {
    const fetchChannel = async () =>{
      const res = await axios.get(`/users/find/${video._id}`);
      if(res.data) {
        setChannel(res.data);
      }
      //console.log(res);
    }
    fetchChannel(); 
  }, [video._id]);
  return (
    <Link to={`/video/${video._id}`} style={{ textDecoration: "none" }}>
      <Container type={type}>
        <Image type={type} src={video.imgUrl} />     {/*vedio page */}
        <Details type={type}>
          <ChannelImage type={type} src={video.img}/>    {/*profile page */}
          <Texts>
             <Title> {video.title} </Title>
             <ChannelName>{channel.name}</ChannelName> 
             <Information>{video.views} views &bull; {format(video.createdAt)}</Information>
          </Texts>
        </Details>
      </Container>
    </Link>
  ) 
  //console.log({channel.name})
}

export default Card
