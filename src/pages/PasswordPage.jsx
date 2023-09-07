import { useState } from 'react';
import axios from 'axios';
import { Typography, Container, TextField, Button } from '@mui/material';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import ROUTES from "../routes/ROUTES";
import { useNavigate } from "react-router-dom";
import Joi from 'joi';

const passwordSchema = Joi.string().regex(new RegExp(
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9]{4})(?=.*[!@%$#^&*-_*]).{8,}$/
        )).label('Password')

const PasswordPage = () => {
  const [newPassword, setNewPassword] = useState('');
  const { token } = useParams();
  const navigate = useNavigate();
  const [passwordErrors, setPasswordErrors] = useState([]);

  const handlePasswordChange = async () => {
    try {
      const { error } = passwordSchema.validate({ newPassword });
      if (error) {
        const errorMessages = error.details.map((detail) => detail.message);
        setPasswordErrors(errorMessages);
        return;
      }

      const response = await axios.post(`/users/password_reset`, {
        newPassword: newPassword,
        resetToken: token,
        
      });
        
      if (response.status === 200) {
        console.log('Password changed successfully');
        toast.info('Password changed successfully');
        navigate(ROUTES.LOGIN);
      } else {
        // Handle error
        console.error('Password change failed');
        toast.error('Password change failed')
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <Container maxWidth="sm" sx={{ marginY: 3 }} >
      <Typography variant="h4" align="center" gutterBottom >
        Change Password
      </Typography>
      <form >
        <TextField
          type="password"
          label="New Password"
          variant="outlined"
          fullWidth
          margin="normal"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          error={passwordErrors.length > 0} // Set error state based on the number of errors
          helperText={passwordErrors.map((error) => (
            <span key={error}>{error}</span>
          ))} // Display all error messages
        />

        <Button
          variant="contained"
          color="primary"
          
          onClick={handlePasswordChange}
        >
          Change Password
        </Button>
      </form>
    </Container>
  );
};

export default PasswordPage;
