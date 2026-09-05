import { createTheme } from '@mui/material/styles';

const brand = {
  primary: '#754B0F',
  primaryLight: '#9A6B2E',
  primaryDark: '#523508',
  accent: '#E5AF05',
  text: '#423726',
  textMuted: '#6B6560',
  border: '#E0D8CC',
  borderHover: '#C4B5A0',
  inputBg: '#FAF8F5',
  inputBgHover: '#F5F1EB',
  error: '#D32F2F',
  success: '#2E7D32',
};

const inputRootStyles = {
  borderRadius: '12px',
  backgroundColor: brand.inputBg,
  transition: 'background-color 0.2s ease, border-color 0.2s ease, box-shadow 0.2s ease',
  '& fieldset': {
    borderColor: brand.border,
    borderWidth: '1.5px',
    transition: 'border-color 0.2s ease',
  },
  '&:hover': {
    backgroundColor: brand.inputBgHover,
    '& fieldset': {
      borderColor: brand.borderHover,
    },
  },
  '&.Mui-focused': {
    backgroundColor: '#FFFFFF',
    boxShadow: `0 0 0 3px rgba(117, 75, 15, 0.12)`,
    '& fieldset': {
      borderColor: brand.primary,
      borderWidth: '1.5px',
    },
  },
  '&.Mui-error': {
    boxShadow: 'none',
    '& fieldset': {
      borderColor: brand.error,
    },
  },
  '&.Mui-disabled': {
    backgroundColor: '#F0EDE8',
  },
};

const theme = createTheme({
  palette: {
    primary: {
      main: brand.primary,
      light: brand.primaryLight,
      dark: brand.primaryDark,
      contrastText: '#FFFFFF',
    },
    secondary: {
      main: brand.accent,
      contrastText: brand.text,
    },
    text: {
      primary: brand.text,
      secondary: brand.textMuted,
    },
    background: {
      default: '#FDFBF7',
      paper: '#FFFFFF',
    },
    error: {
      main: brand.error,
    },
    success: {
      main: brand.success,
    },
  },
  shape: {
    borderRadius: 12,
  },
  typography: {
    fontFamily: '"Poppins", "Roboto", "Helvetica", "Arial", sans-serif',
    h4: {
      fontWeight: 700,
      letterSpacing: '-0.02em',
    },
    h5: {
      fontWeight: 600,
    },
    h6: {
      fontWeight: 600,
    },
    button: {
      textTransform: 'none',
      fontWeight: 600,
    },
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          backgroundColor: '#FDFBF7',
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: inputRootStyles,
        input: {
          padding: '12px 14px',
          fontSize: '0.95rem',
          '&::placeholder': {
            color: brand.textMuted,
            opacity: 0.7,
          },
        },
        inputSizeSmall: {
          padding: '10px 12px',
          fontSize: '0.875rem',
        },
      },
    },
    MuiInputLabel: {
      styleOverrides: {
        root: {
          color: brand.textMuted,
          fontWeight: 500,
          fontSize: '0.9rem',
          '&.Mui-focused': {
            color: brand.primary,
            fontWeight: 600,
          },
          '&.Mui-error': {
            color: brand.error,
          },
        },
        outlined: {
          '&.MuiInputLabel-shrink': {
            transform: 'translate(14px, -9px) scale(0.85)',
          },
        },
      },
    },
    MuiFormLabel: {
      styleOverrides: {
        root: {
          color: brand.textMuted,
          fontWeight: 500,
        },
      },
    },
    MuiTextField: {
      defaultProps: {
        variant: 'outlined',
      },
      styleOverrides: {
        root: {
          '& .MuiFormHelperText-root': {
            marginLeft: '4px',
            fontSize: '0.75rem',
          },
        },
      },
    },
    MuiSelect: {
      styleOverrides: {
        select: {
          padding: '12px 14px',
          fontSize: '0.95rem',
        },
        outlined: {
          borderRadius: '12px',
        },
      },
    },
    MuiFormControl: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': inputRootStyles,
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: '10px',
          padding: '10px 20px',
          boxShadow: 'none',
          '&:hover': {
            boxShadow: '0 4px 12px rgba(117, 75, 15, 0.2)',
          },
        },
        contained: {
          background: `linear-gradient(135deg, ${brand.primary} 0%, ${brand.primaryLight} 100%)`,
          '&:hover': {
            background: `linear-gradient(135deg, ${brand.primaryDark} 0%, ${brand.primary} 100%)`,
          },
        },
        outlined: {
          borderWidth: '1.5px',
          '&:hover': {
            borderWidth: '1.5px',
            backgroundColor: 'rgba(117, 75, 15, 0.04)',
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: '16px',
          boxShadow: '0 8px 32px rgba(66, 55, 38, 0.12)',
        },
      },
    },
    MuiDialog: {
      styleOverrides: {
        paper: {
          borderRadius: '16px',
          overflow: 'hidden',
        },
      },
    },
    MuiMenuItem: {
      styleOverrides: {
        root: {
          borderRadius: '8px',
          margin: '2px 8px',
          fontSize: '0.9rem',
          '&.Mui-selected': {
            backgroundColor: 'rgba(117, 75, 15, 0.1)',
            '&:hover': {
              backgroundColor: 'rgba(117, 75, 15, 0.16)',
            },
          },
        },
      },
    },
    MuiStepper: {
      styleOverrides: {
        root: {
          backgroundColor: 'rgba(255, 255, 255, 0.95)',
          borderRadius: '16px',
          padding: '24px',
          '@media (max-width:600px)': {
            padding: '12px 8px',
          },
        },
      },
    },
    MuiToolbar: {
      styleOverrides: {
        root: {
          '@media (max-width:600px)': {
            paddingLeft: 8,
            paddingRight: 8,
          },
        },
      },
    },
  },
});

export default theme;
export { brand };
