import './App.css'
import { CssBaseline, ThemeProvider, Box, Container, Typography, Grid, AppBar, Toolbar, Button, Stack } from '@mui/material'
import { Route, Routes } from 'react-router'
import Header from './components/Header'
import Footer from './components/Footer'
import Home from './pages/Home'
import About from './pages/About'
import IndexPage from './pages/IndexPage'
import Account from './pages/Account'
import TestFetchPage from './pages/TestFetchPage'

function App() {
  return (
    <Box className="app" sx={{
      backgroundColor: '#b293cf',
      width: "100vw",
      height: "100vh",
    }}>
      <Stack 
        direction='column'
        className='app-layout-stack'
        sx={{
          height: "100%",
        }}
      >
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
        <Box 
          className='body-content-box'
          flex='auto'
        >
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/index" element={<IndexPage />} />
            <Route path="/about" element={<About />} />
            <Route path="/account" element={<Account />} />
            <Route path="/test-fetch" element={<TestFetchPage />} />
          </Routes>
        </Box>
      </Stack>
    </Box>
  )
}

export default App
