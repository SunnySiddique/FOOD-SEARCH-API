import { GiKnifeFork } from 'react-icons/gi'
import { BrowserRouter, Link } from "react-router-dom"
import styled from "styled-components"
import './App.css'
import Catagory from "./Components/Catagory"
import Search from "./Components/Search"
import Pages from "./pages/Pages"

function App() {
  return (
    <BrowserRouter>
    <Nav>
      <GiKnifeFork />
      <Logo to={"/"}>deliciouss</Logo>
    </Nav>
      <Search />
      <Catagory />
      <Pages />
    </BrowserRouter>
  )
}

const Logo = styled(Link) `
  text-decoration: none;
  font-size: 1.5rem;
  font-weight: 400;
  font-family: "Lobster Two", cursive;
`;

const Nav = styled.div `
  padding: 4rem 0rem;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  svg{
    font-size: 2rem;
  }
`;

export default App
