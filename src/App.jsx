import Nav from './components/Nav'
import { ThemeProvider } from "./ThemeContext";
import './App.css'

export default function App() {

  return (
    <>
      <ThemeProvider>
        <Nav />
        
      </ThemeProvider>
    </>
  )
}