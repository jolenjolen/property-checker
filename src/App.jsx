import Nav from './components/Nav'
import { ThemeProvider } from "./ThemeContext";
import './App.css'
import SearchBar from './components/SearchBar';
export default function App() {

  return (
    <>
      <ThemeProvider>

        <Nav />
        <SearchBar />
        
      </ThemeProvider>
    </>
  )
}