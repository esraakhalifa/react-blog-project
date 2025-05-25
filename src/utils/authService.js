import  {jwtDecode} from 'jwt-decode';
export const setTokens = ({ access, refresh }) => {
    localStorage.setItem('accessToken', access);
    localStorage.setItem('refreshToken', refresh);
  };
  
  export const getAccessToken = () => localStorage.getItem('accessToken');
  
  export const clearTokens = () => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
  };
  
  export const getCurrentUserId = () => {
    const token = getAccessToken();
    if (!token) return null;
  
    try {
      const decoded = jwtDecode(token);
      return decoded.user_id || decoded.sub || null;
    } catch (error) {
      console.error('Failed to decode token:', error);
      return null;
    }
  };