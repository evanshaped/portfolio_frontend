import './App.css'
import { CssBaseline, ThemeProvider, Box, Container, Typography, Grid, AppBar, Toolbar, Button } from '@mui/material'
import { Route, Routes } from 'react-router'
import Header from './components/Header'
import Footer from './components/Footer'
import Home from './pages/Home'
import About from './pages/About'
import IndexPage from './pages/IndexPage'
import Account from './pages/Account'

function App() {
  return (
    <Box classname="app" sx={{
      backgroundColor: '#b293cf',
      width: "100vw",
      height: "100vh",
    }}>
      <Box 
        classname='top-nav-box'
        sx={{
          px: 1,
          pt: 2,
          pb: 1,
        }}
      >
        <Header />
      </Box>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/index" element={<IndexPage />} />
        <Route path="/about" element={<About />} />
        <Route path="/account" element={<Account />} />
      </Routes>
      <Box>
        <Typography variant="h1">my text</Typography>
        <Button>button text</Button>
      </Box>
      <Box>
        <Typography variant="h2">Text here</Typography>
        <Typography vairant="h3">More text here</Typography>
      </Box>
    </Box>
  )
}

export default App
