import './App.css'
import { CssBaseline, ThemeProvider, Box, Container, Typography, Grid, AppBar, Toolbar, Button } from '@mui/material'
import { Route, Routes } from 'react-router'
import Header from './components/Header'
import Footer from './components/Footer'
import Home from './pages/Home'
import About from './pages/About'
import IndexPage from './pages/IndexPage'
import Account from './pages/Account'
import SearchPage from './pages/search_page/SearchPage'
import ChartPage from './pages/search_page/ChartPage'

function App() {
  return (
    <Box className="app" sx={{
      backgroundColor: '#b293cf',
      width: "100vw",
      height: "100vh",
    }}>
      <Box 
        className='top-nav-box'
        sx={{
          px: 1,
          pt: 2,
          pb: 1,
        }}
      >
        <Header />
      </Box>
      <Routes>
        <Route path="/" element={<ChartPage />} />
        <Route path="/search" element={<SearchPage />} />
        <Route path="/about" element={<About />} />
        <Route path="/account" element={<Account />} />
      </Routes>
    </Box>
  )
}

export default App
