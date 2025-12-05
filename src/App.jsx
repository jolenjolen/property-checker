import { BrowserRouter, Routes, Route } from "react-router-dom";
import Nav from './components/Nav'
import { ThemeProvider } from "./ThemeContext";
import './App.css'
import SearchBar from './components/SearchBar';
import Cards from "./components/Cards"
export default function App() {

  return (
    <>
      <ThemeProvider>
        <BrowserRouter>
          <Nav />

          <Routes>
            <Route path="/" element={<Cards />} />
            <Route path="/search" element={<SearchBar />} />
            {/* Add more pages: */}
            <Route path="/buy" element={<h1>Buy Page</h1>} />
            <Route path="/rent" element={<h1>Rent Page</h1>} />
            <Route path="/agent" element={<h1>Agent Page</h1>} />
            <Route path="/contact" element={<h1>Contact Page</h1>} />
          </Routes>

        </BrowserRouter>
        <Nav />
        <SearchBar />
        <Cards />
      </ThemeProvider>
    </>
  )
}