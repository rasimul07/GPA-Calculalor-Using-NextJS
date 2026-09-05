'use client';
import React from 'react';
import {
  Box,
  Container,
  Grid,
  Typography,
  Link,
  Divider,
  Stack,
  IconButton,
} from '@mui/material';
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import EmailIcon from '@mui/icons-material/Email';
import LanguageIcon from '@mui/icons-material/Language';
import NextLink from 'next/link';
import { siteConfig } from '../constants/siteConfig';
import { Cafe_Royale, Corn } from '../Colors';

const FooterLink = ({ href, children }) => (
  <Link
    component={NextLink}
    href={href}
    underline="hover"
    sx={{
      color: 'rgba(255,255,255,0.85)',
      fontSize: '0.9rem',
      display: 'block',
      py: 0.4,
      '&:hover': { color: Corn },
    }}
  >
    {children}
  </Link>
);

const Footer = () => {
  const { developer, footerLinks, tagline, copyright, contact } = siteConfig;
  const hasDeveloperInfo =
    developer.name || developer.email || developer.github || developer.linkedin || developer.portfolio;

  return (
    <Box
      component="footer"
      sx={{
        backgroundColor: Cafe_Royale,
        color: 'white',
        mt: 'auto',
      }}
    >
      <Container maxWidth="lg" sx={{ py: { xs: 4, md: 5 } }}>
        <Grid container spacing={4}>
          <Grid item xs={12} sm={6} md={3}>
            <Typography
              variant="h6"
              fontWeight={700}
              sx={{ color: Corn, mb: 1.5 }}
            >
              GPA Calc-ulator
            </Typography>
            <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.8)', lineHeight: 1.7 }}>
              {tagline}
            </Typography>
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="subtitle1" fontWeight={600} sx={{ mb: 1.5 }}>
              Quick Links
            </Typography>
            {footerLinks.tools.map((link) => (
              <FooterLink key={link.href} href={link.href}>
                {link.label}
              </FooterLink>
            ))}
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="subtitle1" fontWeight={600} sx={{ mb: 1.5 }}>
              Account
            </Typography>
            {footerLinks.account.map((link) => (
              <FooterLink key={link.href} href={link.href}>
                {link.label}
              </FooterLink>
            ))}

            {hasDeveloperInfo && (
              <Box sx={{ mt: 3 }}>
                <Typography variant="subtitle1" fontWeight={600} sx={{ mb: 1 }}>
                  Developer
                </Typography>
                {developer.name && (
                  <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.85)', mb: 0.5 }}>
                    {developer.name}
                  </Typography>
                )}
                <Stack direction="row" spacing={0.5} sx={{ mt: 0.5 }}>
                  {developer.email && (
                    <IconButton
                      component="a"
                      href={`mailto:${developer.email}`}
                      size="small"
                      sx={{ color: 'rgba(255,255,255,0.85)', '&:hover': { color: Corn } }}
                      aria-label="Email developer"
                    >
                      <EmailIcon fontSize="small" />
                    </IconButton>
                  )}
                  {developer.github && (
                    <IconButton
                      component="a"
                      href={developer.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      size="small"
                      sx={{ color: 'rgba(255,255,255,0.85)', '&:hover': { color: Corn } }}
                      aria-label="GitHub profile"
                    >
                      <GitHubIcon fontSize="small" />
                    </IconButton>
                  )}
                  {developer.linkedin && (
                    <IconButton
                      component="a"
                      href={developer.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      size="small"
                      sx={{ color: 'rgba(255,255,255,0.85)', '&:hover': { color: Corn } }}
                      aria-label="LinkedIn profile"
                    >
                      <LinkedInIcon fontSize="small" />
                    </IconButton>
                  )}
                  {developer.portfolio && (
                    <IconButton
                      component="a"
                      href={developer.portfolio}
                      target="_blank"
                      rel="noopener noreferrer"
                      size="small"
                      sx={{ color: 'rgba(255,255,255,0.85)', '&:hover': { color: Corn } }}
                      aria-label="Portfolio"
                    >
                      <LanguageIcon fontSize="small" />
                    </IconButton>
                  )}
                </Stack>
              </Box>
            )}
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="subtitle1" fontWeight={600} sx={{ mb: 1.5 }}>
              Support
            </Typography>
            {footerLinks.support?.map((link) => (
              <FooterLink key={link.href} href={link.href}>
                {link.label}
              </FooterLink>
            ))}
            {contact?.email && (
              <Link
                href={`mailto:${contact.email}`}
                underline="hover"
                sx={{
                  color: 'rgba(255,255,255,0.85)',
                  fontSize: '0.9rem',
                  display: 'block',
                  py: 0.4,
                  '&:hover': { color: Corn },
                }}
              >
                {contact.email}
              </Link>
            )}
          </Grid>
        </Grid>

        <Divider sx={{ borderColor: 'rgba(255,255,255,0.2)', my: 3 }} />

        <Typography
          variant="body2"
          align="center"
          sx={{ color: 'rgba(255,255,255,0.65)' }}
        >
          {copyright} · Made for MAKAUT students
        </Typography>
      </Container>
    </Box>
  );
};

export default Footer;
