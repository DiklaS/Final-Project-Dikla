import {Box, Typography} from '@mui/material';

const MuiBottomNavigators = () => {
    return (
      <Box
        sx={{
          backgroundColor: (theme) =>
            theme.palette.mode === "light"
              ? theme.palette.grey[300]
              : "rgba(255, 255, 255, 0.09)",
          p: 1,
        }}
        component="footer"
      > 
      <Typography variant="body2" color="text.primary" align="center">
        &copy; {new Date().getFullYear()} created by Dikla Shaked
      </Typography>
    </Box>

    )
}

export default MuiBottomNavigators;
