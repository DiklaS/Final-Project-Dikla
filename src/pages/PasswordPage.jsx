import { useState } from 'react';
import axios from 'axios';
import { Typography, Container, TextField, Button } from '@mui/material';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import ROUTES from "../routes/ROUTES";
import { useNavigate } from "react-router-dom";
import Joi from 'joi';

const passwordSchema = Joi.object({
  newPassword: Joi.string()
    .min(8)
    .pattern(/^(?=.*[a-z])/)
    .pattern(/^(?=.*[A-Z])/)
    .pattern(/^(?=.*[0-9])/)
    .pattern(/^(?=.*[!@%$#^&*_\-])/)
    .required()
    .messages({
      'string.min': 'Password must be at least 8 characters long',
      'string.pattern.base': 'Password must include at least one lowercase letter, one uppercase letter, one number, and one special character (!@%$#^&*-_)',
      'any.required': 'Password is required',
    }),
});

  
const PasswordPage = () => {
  const [newPassword, setNewPassword] = useState('');
  const { token } = useParams();
  const navigate = useNavigate();
  const [passwordErrors, setPasswordErrors] = useState([]);

  const handlePasswordChange = async () => {
  try {
    const errors = [];

    const validationResult = passwordSchema.validate({ newPassword }, { abortEarly: false });
    
    if (validationResult.error) {
      errors.push(validationResult.error.message);
    }

    // If there are validation errors, set them in the 'passwordErrors' state
    if (errors.length > 0) {
      setPasswordErrors(errors);
      return; // Exit the function since there are validation errors
    }

    // If validation is successful, make a POST request to change the password
    const response = await axios.post(`/users/password_reset`, {
      newPassword: newPassword,
      resetToken: token,
    });

    if (response.status === 200) {
      // Password change was successful
      console.log('Password changed successfully');
      toast.info('Password changed successfully');
      navigate(ROUTES.LOGIN); // Redirect to the login page
    } else {
      // Handle error in the response from the server
      console.error('Password change failed');
      toast.error('Password change failed');
    }
  } catch (error) {
    // Handle unexpected errors (e.g., network issues, server errors)
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
