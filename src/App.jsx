import Nav from './components/Nav'
import { ThemeProvider } from "./ThemeContext";
import './App.css'

export default function App() {

  return (
    <>
      <ThemeProvider>
        <Nav />
        <main className="container mt-4">
          <h1>Welcome to My Themed App</h1>
          <p>This area also responds to theme changes.</p>
        </main>
      </ThemeProvider>
    </>
  )
}