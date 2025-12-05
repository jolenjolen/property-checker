import Nav from './components/Nav'
import { ThemeProvider } from "./ThemeContext";
import './App.css'
import SearchBar from './components/SearchBar';
import Cards from "./components/cards"
export default function App() {

  return (
    <>
      <ThemeProvider>

        <Nav />
        <SearchBar />
        <Cards />
      </ThemeProvider>
    </>
  )
}