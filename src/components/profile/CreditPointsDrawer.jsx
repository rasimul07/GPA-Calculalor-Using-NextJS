'use client';
import React, { useEffect, useState } from 'react';
import {
  Drawer,
  Box,
  Typography,
  Button,
  Grid,
  IconButton,
  Divider,
  MenuItem,
  Alert,
  CircularProgress,
  FormControlLabel,
  Checkbox,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import axios from 'axios';
import { BASE_URL } from '../../services/helper';
import { AppTextField, AppSelect } from '../common';
import { DialogBox } from '../FindPercentage';
import { Cafe_Royale, Birch, Mauntain_Mist } from '../../Colors';

const CreditPointsDrawer = ({
  open,
  onClose,
  initialCredits,
  initialIsLateralEntry = false,
  hasExistingCredits,
  onSaved,
}) => {
  const [numOfSemester, setNumOfSemester] = useState(1);
  const [creditValues, setCreditValues] = useState(['', '']);
  const [isLateralEntry, setIsLateralEntry] = useState(false);
  const [isVisited, setIsVisited] = useState([]);
  const [error, setError] = useState('');
  const [saving, setSaving] = useState(false);

  const title = hasExistingCredits ? 'Edit Credit Points' : 'Add Credit Points';
  const TitleIcon = hasExistingCredits ? EditIcon : AddIcon;

  useEffect(() => {
    if (!open) return;

    const credits = initialCredits?.length ? [...initialCredits] : ['', ''];
    const semCount = credits.length / 2 || 1;
    setNumOfSemester(semCount);
    setCreditValues(credits);
    setIsLateralEntry(Boolean(initialIsLateralEntry));
    setIsVisited(new Array(semCount * 2).fill(false));
    setError('');
  }, [open, initialCredits, initialIsLateralEntry]);

  const handleSemesterChange = (e) => {
    const count = Number(e.target.value);
    setNumOfSemester(count);
    const temp = [...creditValues];
    const targetLen = count * 2;

    while (temp.length < targetLen) temp.push('');
    while (temp.length > targetLen) temp.pop();

    setCreditValues(temp);
    setIsVisited(new Array(targetLen).fill(false));
  };

  const handleCreditChange = (index, value) => {
    const temp = [...creditValues];
    temp[index] = value;
    setCreditValues(temp);
  };

  const markVisited = (index) => {
    const temp = [...isVisited];
    temp[index] = true;
    setIsVisited(temp);
  };

  const handleSave = async () => {
    setError('');
    setSaving(true);

    try {
      const token = localStorage.getItem('token');
      const response = await axios.put(
        `${BASE_URL}/user/credits`,
        { credits: creditValues, isLateralEntry },
        { headers: { authorization: `Bearer ${token}` } }
      );

      if (response.data) {
        onSaved(response.data);
        onClose();
      }
    } catch (err) {
      if (err.response?.status === 403 && err.response?.data?.requiresPremium) {
        setError('Premium required. Unlock the GPA store from your profile or home page.');
      } else {
        const message = err.response?.data?.message || 'Failed to save credit points.';
        setError(message);
      }
    } finally {
      setSaving(false);
    }
  };

  const semesters = Array.from({ length: numOfSemester }, (_, i) => i + 1);

  return (
    <Drawer
      anchor="bottom"
      open={open}
      onClose={onClose}
      PaperProps={{
        sx: {
          borderTopLeftRadius: 20,
          borderTopRightRadius: 20,
          maxHeight: '92vh',
          bgcolor: '#FDFBF7',
        },
      }}
    >
      <Box
        sx={{
          width: 40,
          height: 4,
          bgcolor: '#D0C8BC',
          borderRadius: 2,
          mx: 'auto',
          mt: 1.5,
        }}
      />

      <Box sx={{ px: { xs: 2, md: 3 }, pt: 2, pb: 3 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 1 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <TitleIcon sx={{ color: Cafe_Royale }} />
            <Typography variant="h6" fontWeight={700} color={Birch}>
              {title}
            </Typography>
          </Box>
          <IconButton onClick={onClose} aria-label="Close">
            <CloseIcon />
          </IconButton>
        </Box>

        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
          Enter obtained and full credit points for each semester from your MAKAUT grade sheet.
        </Typography>

        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2, alignItems: 'center', mb: 2 }}>
          <AppSelect
            label="Number of semesters"
            labelId="profile-sem-count"
            value={numOfSemester}
            onChange={handleSemesterChange}
            sx={{ minWidth: 200 }}
          >
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((n) => (
              <MenuItem key={n} value={n}>{n} semester{n > 1 ? 's' : ''}</MenuItem>
            ))}
          </AppSelect>
          <DialogBox inline />
        </Box>

        <FormControlLabel
          control={
            <Checkbox
              checked={isLateralEntry}
              onChange={(e) => setIsLateralEntry(e.target.checked)}
            />
          }
          label="Lateral Entry (4-year program — Years 2, 3, 4 only)"
          sx={{ mb: 1, display: 'block' }}
        />
        {isLateralEntry && (
          <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
            Enter credits for Years 2–4 only (typically 6 semesters).
          </Typography>
        )}

        <Divider sx={{ mb: 2 }} />

        <Box sx={{ overflowY: 'auto', maxHeight: '50vh', pr: 0.5 }}>
          <Grid container spacing={2}>
            {semesters.map((sem, index) => (
              <Grid item xs={12} sm={6} key={sem}>
                <Box
                  sx={{
                    p: 2,
                    borderRadius: 2,
                    border: '1px solid #E0D8CC',
                    bgcolor: 'white',
                  }}
                >
                  <Typography
                    fontWeight={700}
                    textTransform="uppercase"
                    color={Mauntain_Mist}
                    fontSize="0.85rem"
                    mb={1.5}
                  >
                    Semester {sem}
                  </Typography>
                  <Grid container spacing={1.5}>
                    <Grid item xs={6}>
                      <AppTextField
                        required
                        label="Obtained credit"
                        type="number"
                        value={creditValues[index * 2] || ''}
                        onChange={(e) => handleCreditChange(index * 2, e.target.value)}
                        onFocus={() => markVisited(index * 2)}
                        error={creditValues[index * 2] === '' && isVisited[index * 2]}
                        helperText={
                          creditValues[index * 2] === '' && isVisited[index * 2]
                            ? 'Required'
                            : 'Obtained'
                        }
                      />
                    </Grid>
                    <Grid item xs={6}>
                      <AppTextField
                        required
                        label="Full credit"
                        type="number"
                        value={creditValues[index * 2 + 1] || ''}
                        onChange={(e) => handleCreditChange(index * 2 + 1, e.target.value)}
                        onFocus={() => markVisited(index * 2 + 1)}
                        error={creditValues[index * 2 + 1] === '' && isVisited[index * 2 + 1]}
                        helperText={
                          creditValues[index * 2 + 1] === '' && isVisited[index * 2 + 1]
                            ? 'Required'
                            : 'Full credit'
                        }
                      />
                    </Grid>
                  </Grid>
                </Box>
              </Grid>
            ))}
          </Grid>
        </Box>

        {error && (
          <Alert severity="error" sx={{ mt: 2 }}>
            {error}
          </Alert>
        )}

        <Box sx={{ display: 'flex', gap: 2, mt: 3 }}>
          <Button
            variant="outlined"
            fullWidth
            onClick={onClose}
            sx={{ borderColor: Cafe_Royale, color: Cafe_Royale }}
          >
            Cancel
          </Button>
          <Button
            variant="contained"
            fullWidth
            disabled={saving}
            onClick={handleSave}
            sx={{ bgcolor: Cafe_Royale, fontWeight: 700, '&:hover': { bgcolor: '#5a3a0c' } }}
          >
            {saving ? <CircularProgress size={24} color="inherit" /> : 'Save Credit Points'}
          </Button>
        </Box>
      </Box>
    </Drawer>
  );
};

export default CreditPointsDrawer;
