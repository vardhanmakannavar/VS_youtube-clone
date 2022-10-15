import styled, { ThemeProvider } from "styled-components"
import { useState } from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom";


//Components
import Menu from "./components/Menu.jsx";
import Navbar from "./components/Navbar.jsx";
import { darkTheme, lightTheme } from "./utils/Theme.js";
import Home from './pages/Home.jsx';
import Video from './pages/Video.jsx';
import SignIn from './pages/SignIn.jsx';


const Container = styled.div`
  display: flex;

`


const Main = styled.div`
  flex: 7;
  background-color: ${({ theme }) => theme.bg };
`


const Wrapper = styled.div`
  padding: 12px 45px;

`

function App() {

  const [darkMode, setDarkMode] = useState(true)
  return (
    <ThemeProvider theme={ darkMode ? darkTheme : lightTheme }>

       <Container>
          <BrowserRouter>
            <Menu darkMode={darkMode} setDarkMode={setDarkMode} />             {/* menu */}
            <Main>               {/* main */}
               <Navbar /> 
               <Wrapper>
                 <Routes>
                   <Route path="/">
                     <Route index element = { <Home type="random"/> } />
                     <Route path="trends" element = { <Home type="trend"/> } />
                     <Route path="subcriptions" element = { <Home type="sub"/> } />
                     <Route path="signin" element = { <SignIn/> } />
                     <Route path="Video">
                        <Route path=":id" element={ <Video/> } />
                     </Route>
                   </Route>
                 </Routes>
               </Wrapper>          
            </Main> 
          </BrowserRouter>                
       </Container>
    </ThemeProvider>
  );
}

export default App;
