import axios from 'axios';

export async function fetchUsers() {
  await new Promise(resolve => setTimeout(resolve, 2000));
  const response = await axios.get('https://untitled-lg51povwrnr7.runkit.sh/');
  return response.data;
}