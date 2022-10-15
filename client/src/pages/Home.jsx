import styled from 'styled-components'
import React, { useEffect, useState } from 'react'
import axios from 'axios';


import Card from '../components/Card.jsx';

const Container = styled.div`
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;            
`

const Home = ({type}) => {

  const [videos, setVideos] = useState([])
  //console.log(videos);

  useEffect (() => {
    console.log('type', type);
    const fetchVideos = async () =>{
      const res = await axios.get(`/videos/${type}`);
      setVideos(res.data)
      console.log(res.data);
    }
    fetchVideos()
  }, [type])

  return (
    <Container>
      { videos.map((video) => (
        <Card key={video._id} video={video}/>
        ))}
    </Container>
  )
};

export default Home
