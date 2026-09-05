'use client';
import React, { useState } from 'react';
import {
  Box,
  Container,
  Typography,
  Button,
  Card,
  CardContent,
  Stack,
  Alert,
  Snackbar,
  CircularProgress,
  Grid,
} from '@mui/material';
import EmailIcon from '@mui/icons-material/Email';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import { Formik } from 'formik';
import { siteConfig } from '../constants/siteConfig';
import { AppTextField } from './common';
import { contactSchema } from '../validation/contactSchema';
import { BASE_URL } from '../services/helper';
import { Birch, Cafe_Royale } from '../Colors';
import { accentButtonSx } from '../styles/buttonStyles';

const ContactPage = () => {
  const { contact } = siteConfig;
  const [toast, setToast] = useState({ open: false, message: '', severity: 'success' });

  const showToast = (message, severity = 'success') => {
    setToast({ open: true, message, severity });
  };

  return (
    <Box sx={{ bgcolor: '#FDFBF7', minHeight: '100vh', pb: 6 }}>
      <Box sx={{ bgcolor: Cafe_Royale, color: 'white', py: { xs: 4, md: 5 }, mb: 4 }}>
        <Container maxWidth="md">
          <Typography variant="h4" fontWeight={800} gutterBottom>
            Contact Us
          </Typography>
          <Typography variant="body1" sx={{ opacity: 0.9, maxWidth: 560, lineHeight: 1.8 }}>
            {contact.description}
          </Typography>
        </Container>
      </Box>

      <Container maxWidth="md">
        <Grid container spacing={4}>
          <Grid item xs={12} md={5}>
            <Stack spacing={2}>
              <Card elevation={0} sx={{ border: '1px solid #E0D8CC', borderRadius: 3 }}>
                <CardContent>
                  <Stack direction="row" spacing={1.5} alignItems="center" sx={{ mb: 1 }}>
                    <EmailIcon sx={{ color: Cafe_Royale }} />
                    <Typography variant="subtitle1" fontWeight={600} color={Birch}>
                      Email
                    </Typography>
                  </Stack>
                  <Typography
                    component="a"
                    href={`mailto:${contact.email}`}
                    variant="body2"
                    sx={{ color: Cafe_Royale, textDecoration: 'none', '&:hover': { textDecoration: 'underline' } }}
                  >
                    {contact.email}
                  </Typography>
                </CardContent>
              </Card>
              <Card elevation={0} sx={{ border: '1px solid #E0D8CC', borderRadius: 3 }}>
                <CardContent>
                  <Stack direction="row" spacing={1.5} alignItems="center" sx={{ mb: 1 }}>
                    <AccessTimeIcon sx={{ color: Cafe_Royale }} />
                    <Typography variant="subtitle1" fontWeight={600} color={Birch}>
                      Response time
                    </Typography>
                  </Stack>
                  <Typography variant="body2" color="text.secondary">
                    {contact.responseTime}
                  </Typography>
                </CardContent>
              </Card>
            </Stack>
          </Grid>

          <Grid item xs={12} md={7}>
            <Card elevation={0} sx={{ border: '1px solid #E0D8CC', borderRadius: 3 }}>
              <CardContent sx={{ p: { xs: 2, md: 3 } }}>
                <Typography variant="h6" fontWeight={700} color={Birch} gutterBottom>
                  Send a message
                </Typography>
                <Formik
                  initialValues={{ name: '', email: '', subject: '', message: '' }}
                  validationSchema={contactSchema}
                  onSubmit={async (values, { setSubmitting, resetForm }) => {
                    try {
                      const res = await fetch(`${BASE_URL}/contact`, {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({
                          name: values.name.trim(),
                          email: values.email.trim(),
                          subject: values.subject.trim(),
                          message: values.message.trim(),
                        }),
                      });
                      const data = await res.json();

                      if (res.ok) {
                        showToast('Message sent! We will get back to you soon.', 'success');
                        resetForm();
                      } else {
                        showToast(data.message || 'Failed to send message.', 'error');
                      }
                    } catch {
                      showToast('Network error. Please try again.', 'error');
                    } finally {
                      setSubmitting(false);
                    }
                  }}
                >
                  {({
                    values,
                    errors,
                    touched,
                    handleChange,
                    handleBlur,
                    handleSubmit,
                    isSubmitting,
                  }) => (
                    <form onSubmit={handleSubmit} noValidate>
                      <Stack spacing={2} sx={{ mt: 1 }}>
                        <AppTextField
                          name="name"
                          label="Your name"
                          value={values.name}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          error={touched.name && Boolean(errors.name)}
                          helperText={touched.name && errors.name}
                        />
                        <AppTextField
                          name="email"
                          label="Your email"
                          type="email"
                          value={values.email}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          error={touched.email && Boolean(errors.email)}
                          helperText={touched.email && errors.email}
                        />
                        <AppTextField
                          name="subject"
                          label="Subject"
                          value={values.subject}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          error={touched.subject && Boolean(errors.subject)}
                          helperText={touched.subject && errors.subject}
                        />
                        <AppTextField
                          name="message"
                          label="Message"
                          multiline
                          minRows={4}
                          value={values.message}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          error={touched.message && Boolean(errors.message)}
                          helperText={touched.message && errors.message}
                        />
                        <Button
                          type="submit"
                          variant="contained"
                          size="large"
                          disabled={isSubmitting}
                          sx={{ ...accentButtonSx, mt: 1 }}
                        >
                          {isSubmitting ? (
                            <CircularProgress size={26} sx={{ color: Birch }} />
                          ) : (
                            'Send Message'
                          )}
                        </Button>
                      </Stack>
                    </form>
                  )}
                </Formik>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>

      <Snackbar
        open={toast.open}
        autoHideDuration={5000}
        onClose={() => setToast((prev) => ({ ...prev, open: false }))}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <Alert
          severity={toast.severity}
          onClose={() => setToast((prev) => ({ ...prev, open: false }))}
          sx={{ width: '100%' }}
        >
          {toast.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default ContactPage;
