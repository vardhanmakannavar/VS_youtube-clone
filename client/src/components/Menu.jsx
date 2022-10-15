import React from 'react'
import styled  from 'styled-components'
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';



import HomeIcon from '@mui/icons-material/Home';
import ExploreIcon from '@mui/icons-material/ExploreOutlined';
import SubscriptionIcon from '@mui/icons-material/SubscriptionsOutlined';
import LibraryIcon from '@mui/icons-material/VideoLibraryOutlined';
import HistoryIcon from '@mui/icons-material/HistoryOutlined';
import MusicIcon from '@mui/icons-material/LibraryMusicOutlined';
import SportIcon from '@mui/icons-material/SportsBasketballOutlined';
import GameIcon from '@mui/icons-material/SportsEsportsOutlined';
import MovieIcon from '@mui/icons-material/MovieCreationOutlined';
import NewsIcon from '@mui/icons-material/NewspaperOutlined';
import LiveIcon from '@mui/icons-material/LiveTvOutlined';
import SettingIcon from '@mui/icons-material/SettingsSuggestOutlined';
import ReportIcon from '@mui/icons-material/OutlinedFlag';
import HelpIcon from '@mui/icons-material/HelpOutlineOutlined';
import LightIcon from '@mui/icons-material/SettingsBrightnessOutlined';
import SignInIcon from '@mui/icons-material/LoginOutlined';

import VStube from '../Images/logo.png';


const Container = styled.div`
   flex:1;
   background-color: ${({theme}) => theme.bgLighter};
   height: 100vh;
   color: ${({theme}) => theme.text};
   font-size: 14px;
   position: sticky;
   top: 0;
`;

const Wrapper = styled.div`
     padding: 18px 26px;   //top-bottom  left-right
`;

const Logo = styled.div`
   display:flex;
   align-items: center;
   gap: 5px;
   font-weight: bold;
   margin-bottom: 25px;
`;

const Img = styled.img`
   height:25px; 
`;

const Item = styled.div`
   display:flex;
   align-items: center;
   gap: 20px;
   cursor: pointer;
   padding: 5px 0px;

   &:hover{
      background-color: ${({ theme }) => theme.soft};
   }
`;

const Hr = styled.hr`
   margin: 15px 0px;
   border: 0.5px solid ${({theme}) => theme.soft};;
`;

const Login = styled.div`
   text-align: left;
   font-size: 12px;
`;

const Button = styled.button`
   padding: 5px 15px;
   background-color: transparent;
   border: 1px solid #3ea6ff;
   color: #3ea6ff;
   border-radius: 3px;
   font-weight: 500;
   margin-top: 10px;
   cursor: pointer;
   display: flex;
   align-items: center;
   gap: 5px;
`;

const Title = styled.h2`
   font-size: 14px;
   font-weight: 500;
   color: #aaaaaa;
   margin-bottom: 20px;
`

const Menu = ({darkMode, setDarkMode}) => {



 const { currentUser }  = useSelector((state)=>state.user);

   return (
      <Container>
         <Wrapper>
            <Link to="/" style={{ textDecoration: "none", color:"inherit" }}>  
            <Logo>
              <Img src={ VStube } />
              VS_tube    
            </Logo>
            </Link>
         <Item>
            <HomeIcon />    
            Home    
         </Item>  
         <Link to="trends" style={{ textDecoration:"none", color:'inherit' }}>
            <Item>
               <ExploreIcon />    
               Explore    
            </Item> 
         </Link> 
         <Link to="subcriptions" style={{ textDecoration:"none", color:'inherit' }}>
            <Item>
               <SubscriptionIcon />    
               Subscriptions    
            </Item> 
         </Link>
         <Hr /> 
         <Item>
            <LibraryIcon />    
            Library    
         </Item>  
         <Item>
            <HistoryIcon />    
            History    
         </Item>  
         <Hr />
         { !currentUser &&
            <> <Login>
               Sign in to like vedios comment and subscribe.
                  <Link to="signin" style={{ textDecoration:"none" }}>
                     <Button><SignInIcon />SIGN IN</Button>  
                   </Link>   
               </Login>
         <Hr /> </> } 
         <Title> BEST OF VS_TUBE</Title>
         <Item>
            <MusicIcon />    
            Music   
         </Item>  
         <Item>
            <SportIcon />    
            Sports   
         </Item>  
         <Item>
            <GameIcon />    
            Gaming  
         </Item>  
         <Item>
            <MovieIcon />    
            Movies   
         </Item>  
         <Item>
            <NewsIcon />    
            News   
         </Item>  
         <Item>
            <LiveIcon />    
            Live   
         </Item>
         <Hr />   
         <Item>
            <SettingIcon />    
            Settings   
         </Item>  
         <Item>
            <ReportIcon />    
            Report  
         </Item>  
         <Item>
            <HelpIcon />    
            Help   
         </Item>  
         <Item onClick={() => setDarkMode(!darkMode)}>
            <LightIcon />    
            { darkMode ? "Light" : "Dark" } Mode   
         </Item>  
      </Wrapper>
    </Container>
  )
}

export default Menu
