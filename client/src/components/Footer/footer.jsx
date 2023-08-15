import { Box, Toolbar } from '@mui/material';
import { LinkedIn, Twitter, YouTube } from '@mui/icons-material';
import React from 'react';
import { BottomBar } from '../Header/customAppBar';

const Footer = () => (
  <BottomBar>
    <Toolbar>
      <Box sx={{ my: 1 }}>
        <a href="https://www.technia.com">
          <img
            src="https://www.technia.com/wp-content/themes/techniatheme/library/img/logo.svg"
            alt="Logo"
          />
        </a>
      </Box>
      <Box sx={{ flexGrow: 1 }} />
      <Box
        sx={{ flexGrow: 1 }}
        display={{ xs: 'none', sm: 'none', md: 'block' }}
      >
        <div className="footerCopyright">
          © TECHNIA {new Date().getFullYear()} (Part of the Addnode Group)
          TECHNIA is certified according to ISO standards 9001:2015 and
          14001:2015 – Quality & Environment
        </div>
      </Box>
      <Box sx={{ flexGrow: 1 }} />
      <Box
        sx={{ display: 'flex' }}
        alignItems="center"
        justifyContent="space-around"
      >
        <a
          href="https://www.linkedin.com/company/technia/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <LinkedIn style={{ color: 'white' }} />
        </a>
        <a
          href="https://twitter.com/TECHNIA"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Twitter style={{ color: 'white' }} />
        </a>
        <a
          href="https://www.youtube.com/user/TechniaPLM"
          target="_blank"
          rel="noopener noreferrer"
        >
          <YouTube style={{ color: 'white' }} />
        </a>
      </Box>
    </Toolbar>
  </BottomBar>
);

export default Footer;
