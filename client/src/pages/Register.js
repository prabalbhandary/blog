import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Typography, TextField, Button, InputAdornment, IconButton } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material'; // Import eye icons
import toast from 'react-hot-toast';
import axios from 'axios';

const Register = () => {
  const navigate = useNavigate();
  const [inputs, setInputs] = useState({
    name: '',
    email: '',
    password: '',
    showPassword: false, // Track password visibility
  });

  const handleChange = (e) => {
    setInputs((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleTogglePasswordVisibility = () => {
    setInputs((prevState) => ({
      ...prevState,
      showPassword: !prevState.showPassword,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const BASE_URL = 'http://localhost:4000';

    try {
      const { data } = await axios.post(`${BASE_URL}/api/v1/user/register`, {
        username: inputs.name,
        email: inputs.email,
        password: inputs.password,
      });

      if (data.success) {
        toast.success('User Registration Successful');
        navigate('/login');
      } else {
        toast.error('User Registration Failed');
      }
    } catch (error) {
      console.error('Error during registration:', error.message);
      toast.error('An error occurred during registration. Please try again.');
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <Box
          maxWidth={450}
          display="flex"
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
          margin="auto"
          marginTop={5}
          boxShadow="10px 10px 20px #ccc"
          padding={3}
          borderRadius={5}
        >
          <Typography
            variant="h4"
            sx={{ textTransform: 'uppercase' }}
            padding={3}
            textAlign="center"
          >
            Register
          </Typography>
          <TextField
            placeholder="Name"
            value={inputs.name}
            onChange={handleChange}
            name="name"
            margin="normal"
            type="text"
            required
            InputProps={{ style: { width: '100%' } }} // Set width to 100%
          />
          <TextField
            placeholder="Email"
            value={inputs.email}
            name="email"
            margin="normal"
            type="email"
            required
            onChange={handleChange}
            InputProps={{ style: { width: '100%' } }} // Set width to 100%
          />
          <TextField
            placeholder="Password"
            value={inputs.password}
            name="password"
            margin="normal"
            type={inputs.showPassword ? 'text' : 'password'} // Toggle visibility
            required
            onChange={handleChange}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={handleTogglePasswordVisibility} edge="end">
                    {inputs.showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
              style: { width: '100%' }, // Set width to 100%
            }}
          />
          <Button
            type="submit"
            sx={{ borderRadius: 3, marginTop: 3 }}
            variant="contained"
            color="primary"
          >
            Submit
          </Button>
          <Button
            onClick={() => navigate('/login')}
            sx={{ borderRadius: 3, marginTop: 3 }}
          >
            Already Registered? Please Login
          </Button>
        </Box>
      </form>
    </>
  );
};

export default Register;
