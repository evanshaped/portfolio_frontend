import { AppBar, Toolbar, Button, Box, Container } from '@mui/material';
import { Link } from 'react-router';

import HomeIcon from '@mui/icons-material/Home';
import ListIcon from '@mui/icons-material/List';
import InfoIcon from '@mui/icons-material/Info';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import DeveloperBoardIcon from '@mui/icons-material/DeveloperBoard';

export default function Header() {
    
  
    return (
        <AppBar 
            className="top-nav-appbar"
            position="static"
            sx={{
                width: '100%',
                backgroundColor: 'background.paper',
                borderRadius: '16px 16px 16px 16px',
                pt: 1,
                pb: 1,
                boxShadow: '0 4px 20px rgba(0,0,0,0.1)'
            }}
        >
            <Toolbar 
                className="top-nav-toolbar"
                disableGutters 
                sx={{ 
                    display: 'flex', 
                    justifyContent: 'space-between', 
                    width: '100%', 
                }}
            >
                {/* Left-aligned links */}
                <Box>
                    <Button
                    component={Link}
                    to="/"
                    startIcon={<HomeIcon />}
                    sx={{
                        color: 'text.primary',
                        fontWeight: 400,
                    }}
                    >
                    Home
                    </Button>
                    
                    <Button
                    component={Link}
                    to="/index"
                    startIcon={<ListIcon />}
                    sx={{
                        color: 'text.primary',
                        fontWeight: 400,
                    }}
                    >
                    Index
                    </Button>
                </Box>
                
                {/* Right-aligned links */}
                <Box>
                    <Button
                    component={Link}
                    to="/about"
                    startIcon={<InfoIcon />}
                    sx={{
                        color: 'text.primary',
                        fontWeight: 400,
                    }}
                    >
                    About
                    </Button>
                    
                    <Button
                    component={Link}
                    to="/account"
                    startIcon={<AccountCircleIcon />}
                    sx={{
                        color: 'text.primary',
                        fontWeight: 400,
                    }}
                    >
                    Account
                    </Button>

                    <Button
                    component="a"
                    href="/admin/"
                    startIcon={<DeveloperBoardIcon />}
                    sx={{
                        color: 'text.primary',
                        fontWeight: 400,
                    }}
                    >
                    Admin
                    </Button>
                </Box>
            </Toolbar>
        </AppBar>
  );

//   return (
//         <AppBar 
//             position="static"
//             sx={{
//                 width: '100%',
//                 backgroundColor: 'background.paper',
//                 borderRadius: '16px 16px 16px 16px',
//                 pt: 1,
//                 pb: 1,
//                 boxShadow: '0 4px 20px rgba(0,0,0,0.1)'
//             }}
//         >
//             <Toolbar disableGutters sx={{ display: 'flex', justifyContent: 'space-between', width: '100%', }}>
//                 {/* Left-aligned links */}
//                 <Box>
//                     <Button
//                     component={Link}
//                     to="/"
//                     startIcon={<HomeIcon />}
//                     sx={{
//                         mr: 2,
//                         color: isActive('/') ? 'primary.main' : 'text.primary',
//                         fontWeight: isActive('/') ? 700 : 400,
//                         '&:hover': {
//                         backgroundColor: 'rgba(77, 182, 172, 0.08)',
//                         }
//                     }}
//                     >
//                     Home
//                     </Button>
                    
//                     <Button
//                     component={Link}
//                     to="/index"
//                     startIcon={<ListIcon />}
//                     sx={{
//                         color: 'text.primary',
//                         fontWeight: 400,
//                     }}
//                     >
//                     Index
//                     </Button>
//                 </Box>
                
//                 {/* Right-aligned links */}
//                 <Box>
//                     <Button
//                     component={Link}
//                     to="/about"
//                     startIcon={<InfoIcon />}
//                     sx={{
//                         mr: 2,
//                         color: isActive('/about') ? 'primary.main' : 'text.primary',
//                         fontWeight: isActive('/about') ? 700 : 400,
//                         '&:hover': {
//                         backgroundColor: 'rgba(77, 182, 172, 0.08)',
//                         }
//                     }}
//                     >
//                     About
//                     </Button>
                    
//                     <Button
//                     component={Link}
//                     to="/account"
//                     startIcon={<AccountCircleIcon />}
//                     sx={{
//                         color: isActive('/account') ? 'primary.main' : 'text.primary',
//                         fontWeight: isActive('/account') ? 700 : 400,
//                         '&:hover': {
//                         backgroundColor: 'rgba(77, 182, 172, 0.08)',
//                         }
//                     }}
//                     >
//                     Account
//                     </Button>
//                 </Box>
//             </Toolbar>
//         </AppBar>
//   );
}