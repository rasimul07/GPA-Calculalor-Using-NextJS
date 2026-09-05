import { Corn, Birch } from '../Colors';

/** Gold CTA — overrides theme's dark contained gradient */
export const accentButtonSx = {
  background: `${Corn} !important`,
  backgroundImage: 'none !important',
  color: `${Birch} !important`,
  fontWeight: 700,
  boxShadow: '0 4px 14px rgba(229, 175, 5, 0.35)',
  '&:hover': {
    background: '#f0bc1a !important',
    backgroundImage: 'none !important',
    boxShadow: '0 6px 18px rgba(229, 175, 5, 0.45)',
  },
  '&.Mui-disabled': {
    background: 'rgba(229, 175, 5, 0.5) !important',
    color: 'rgba(66, 55, 38, 0.5) !important',
  },
};
