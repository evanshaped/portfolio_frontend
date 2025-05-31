import { Box, Container, Typography, Link, Grid, Divider, IconButton } from '@mui/material';
// import GitHubIcon from '@mui/icons-material/GitHub';
// import LinkedInIcon from '@mui/icons-material/LinkedIn';
// import TwitterIcon from '@mui/icons-material/Twitter';
import { Link as RouterLink} from 'react-router';

function Footer() {
  const currentYear = new Date().getFullYear();
  
  return (
    <Box 
      component="footer" 
      sx={{ 
        py: 6, 
        mt: 'auto',
        backgroundColor: 'background.paper',
        borderTop: 1,
        borderColor: 'divider'
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          <Grid item xs={12} md={4}>
            <Typography variant="h6" color="primary" gutterBottom fontWeight="medium">
              My Portfolio
            </Typography>
            <Typography variant="body2" color="text.secondary">
              A showcase of projects, data visualizations, and professional information.
            </Typography>
          </Grid>
          
          <Grid item xs={12} md={4}>
            <Typography variant="h6" color="primary" gutterBottom fontWeight="medium">
              Quick Links
            </Typography>
            <Typography 
              component={RouterLink} 
              to="/"
              color="text.secondary" 
              display="block" 
              sx={{ mb: 1, textDecoration: 'none', '&:hover': { color: 'primary.main' } }}
            >
              Home
            </Typography>
            <Typography 
              component={RouterLink} 
              to="/items"
              color="text.secondary" 
              display="block" 
              sx={{ mb: 1, textDecoration: 'none', '&:hover': { color: 'primary.main' } }}
            >
              Item Index
            </Typography>
            <Typography 
              component={RouterLink} 
              to="/about"
              color="text.secondary" 
              display="block" 
              sx={{ mb: 1, textDecoration: 'none', '&:hover': { color: 'primary.main' } }}
            >
              About
            </Typography>
            <Typography 
              component={RouterLink} 
              to="/contact"
              color="text.secondary" 
              display="block" 
              sx={{ textDecoration: 'none', '&:hover': { color: 'primary.main' } }}
            >
              Contact
            </Typography>
          </Grid>
          
          <Grid item xs={12} md={4}>
            <Typography variant="h6" color="primary" gutterBottom fontWeight="medium">
              Connect
            </Typography>
            <Box sx={{ mt: 2 }}>
              <IconButton 
                aria-label="GitHub" 
                sx={{ 
                  mr: 1, 
                  color: 'text.secondary',
                  '&:hover': { color: 'primary.main' }
                }}
              >
                {/* <GitHubIcon /> */}
              </IconButton>
              <IconButton 
                aria-label="LinkedIn" 
                sx={{ 
                  mr: 1, 
                  color: 'text.secondary',
                  '&:hover': { color: 'primary.main' }
                }}
              >
                {/* <LinkedInIcon /> */}
              </IconButton>
              <IconButton 
                aria-label="Twitter" 
                sx={{ 
                  color: 'text.secondary',
                  '&:hover': { color: 'primary.main' }
                }}
              >
                {/* <TwitterIcon /> */}
              </IconButton>
            </Box>
          </Grid>
        </Grid>
        
        <Divider sx={{ my: 4 }} />
        
        <Typography variant="body2" color="text.secondary" align="center">
          © {currentYear} My Portfolio. All rights reserved.
        </Typography>
        <Typography variant="body2" color="text.secondary" align="center" sx={{ mt: 1 }}>
          Built with 
          <Link href="https://mui.com/" target="_blank" rel="noopener" color="primary" sx={{ mx: 0.5 }}>
            MUI
          </Link>
          and
          <Link href="https://reactjs.org/" target="_blank" rel="noopener" color="primary" sx={{ mx: 0.5 }}>
            React
          </Link>
        </Typography>
      </Container>
    </Box>
  );
}

export default Footer;