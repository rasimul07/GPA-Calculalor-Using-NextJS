import axios from 'axios';
import { BASE_URL } from './helper';

export async function fetchProfileData() {
  const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
  if (!token || token === 'null') {
    throw new Error('Login required to fetch profile data.');
  }

  const response = await axios.get(`${BASE_URL}/user/getUserInfo`, {
    headers: { authorization: `Bearer ${token}` },
  });

  const data = response.data;
  if (!data) {
    throw new Error('Failed to fetch profile data.');
  }

  if (!data.isPremium) {
    throw new Error(
      'Premium required to use profile data. Unlock the GPA store from your profile or home page.'
    );
  }

  if (!data.credits?.length) {
    throw new Error('No credit points saved in profile. Add them from your profile page.');
  }

  return data;
}
