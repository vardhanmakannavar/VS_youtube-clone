import React, { useEffect, useState } from "react";
import styled from 'styled-components';
import axios from 'axios';
import { format } from "timeago.js";
import { useSelector, useDispatch } from "react-redux";

import LikeIcon from '@mui/icons-material/ThumbUpOffAlt';
import DislikeIcon from '@mui/icons-material/ThumbDownOffAlt';
import ShareIcon from '@mui/icons-material/ReplyAllOutlined';
import SaveIcon from '@mui/icons-material/LibraryAddOutlined';

import Comments from '../components/Comments.jsx';
//import Card from '../components/Card.jsx';
import { useLocation } from 'react-router-dom';
import { fetchSuccess } from "../redux/videoSlice.js";


const Container = styled.div`
  display: flex;
  gap: 24pcx;
`;

const Content = styled.div`
  flex: 5;
`;

const VideoWrapper = styled.div`
  
`;

const Title = styled.h1`
  font-size: 18px;
  font-weight: 400;
  margin-top: 20px;
  margin-bottom: 10px;
  color: ${({ theme }) => theme.text};
`;

const Details = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const Info = styled.span`
  color: ${({ theme }) => theme.textSoft};
`;

const Buttons = styled.div`
  display: flex;
  gap: 20px;
  color: ${({ theme }) => theme.text};

`;

const Button = styled.span`
  display: flex;
  align-items: center;
  gap: 5px;
  cursor: pointer; 
`;

const Hr = styled.hr`
  margin: 15px 0px;
  border: 0.5px solid ${({ theme }) => theme.soft};
`

const Recommendation = styled.div`
  flex: 2;
  margin: 0px 15px;
`;

const Channel = styled.div`
  display: flex;
  justify-content: space-between;
`;

const ChannelInfo = styled.div`
  display: flex;
  gap: 20px;
`;

const Image = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 50%;
`;

const ChannelDetail = styled.div`
  display: flex;
  flex-direction: column;
  color: ${({ theme }) => theme.text};
`;

const ChannelName = styled.span`
  font-weight: 500;
`;

const ChannelCounter = styled.span`
  margin-top: 5px;
  margin-bottom: 20px;
  color: ${({ theme }) => theme.textSoft};
  font-size: 12px;
`;

const Description = styled.p`
  font-size: 14px;
`;

const Subscribe = styled.button`
  background-color: #cc1a00;
  font-weight: 500;
  color: white;
  border: none;
  border-radius: 3px;
  height: max-content;
  padding: 10px 20px;
  cursor: pointer;
`;

const Video = () => {

  console.log('video')
  const { currentUser } = useSelector((state) => state.user);
  const { currentVideo } = useSelector((state) => state.video);
  console.log(currentUser, currentVideo);
  const dispatch = useDispatch();

  const path = useLocation().pathname.split("/")[2]

  const [channel, setChannel] = useState({})

  useEffect(() => {
    const featchData = async () => {
      try {
        const videoRes = await axios.get(`/videos/find/${path}`)
        // const channelRes = await axios.get(`/users/find/${videoRes.data._Id}`)
        // setChannel(channelRes.data);
        console.log('videoRes', videoRes)
        dispatch(fetchSuccess(videoRes.data))
      } catch (error) {

      }
    }
    featchData()
  }, [path, dispatch])




  return (
    <Container>
      <Content>
        <VideoWrapper>
          <iframe
            width="100%"
            height="550"
            src="https://www.youtube.com/embed/k3Vfj-e1Ma4"
            title='VS_TUBE Video player'
            frameBorder="0"
            allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
            allowFullScreen>
          </iframe>
        </VideoWrapper>
        <Title>{currentVideo.title}</Title>
        <Details>
          <Info>{currentVideo.views} views &bull;  {format(currentVideo.createdAt)} </Info>
          <Buttons>
            <Button><LikeIcon />{currentVideo.likes?.length}</Button>
            <Button><DislikeIcon />Dislike</Button>
            <Button><ShareIcon />Share</Button>
            <Button><SaveIcon />Save</Button>
          </Buttons>
        </Details>
        <Hr />
        <Channel>
          <ChannelInfo>
            <Image src={channel.image} />
            <ChannelDetail>
              <ChannelName>{channel.Subscribers}</ChannelName>
              <ChannelCounter>{channel.Subscribers}</ChannelCounter>
              <Description> {channel.Description} </Description>
            </ChannelDetail>
          </ChannelInfo>
          <Subscribe>SUBSCRIBE</Subscribe>
        </Channel>
        <Hr />
        <Comments videoId={currentVideo._id} /> 
      </Content>
      <Recommendation>
        {/* <Card type="sm" />
        <Card type="sm" />
        <Card type="sm" />
        <Card type="sm" />
        <Card type="sm" />
        <Card type="sm" />
        <Card type="sm" />
        <Card type="sm" />
        <Card type="sm" />
        <Card type="sm" />
        <Card type="sm" />
        <Card type="sm" /> */}
      </Recommendation>
    </Container>
  )
};

export default Video
