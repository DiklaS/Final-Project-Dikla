import { Typography, Container, Box, Grid, TextField, Button } from "@mui/material";

const BizNumberPage = () => {
    return (
        <Container component="main" maxWidth="md">
            <Box
              sx={{
                marginTop: 8,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <Typography component="h1" variant="h5">
                Login Page
              </Typography>
              <Box component="div" noValidate sx={{ mt: 3 }}>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <TextField
                      required
                      fullWidth
                      id="email"
                      label="Email"
                      name="email"
                      autoComplete="email"
                      //value={inputState.email}
                      //onChange={handleInputChange}
                    />
                    {/* {inputsErrorsState && inputsErrorsState.email && (
                      <Alert severity="warning">
                        {inputsErrorsState.email.map((item) => (
                          <div key={"email-errors" + item}>{item}</div>
                        ))}
                      </Alert>
                    )} */}
                  </Grid>
                  <Button
                      fullWidth
                      variant="contained"
                      sx={{ mt: 3, mb: 2 }}
                      //onClick={handleBtnClick}
                    >
                      Submit
                    </Button>
                </Grid> 
                
              </Box>
            </Box>
    </Container>
  );
    

}

export default BizNumberPage;