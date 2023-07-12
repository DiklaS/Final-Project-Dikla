import { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import {Typography, Divider} from "@mui/material";
import Container from "@mui/material/Container";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import LoopOutlinedIcon from '@mui/icons-material/LoopOutlined';
import ROUTES from "../routes/ROUTES";
import validateEditSchema, {
  validateEditCardParamsSchema,
} from "../validation/editValidation";
import { CircularProgress } from "@mui/material";
import atom from "../logo.svg";
import { toast } from "react-toastify";

const EditCardPage = () => {
  const { id } = useParams();
  const [inputState, setInputState] = useState(null);
  const [inputsErrorsState, setInputsErrorsState] = useState({});
  const navigate = useNavigate();
  
  useEffect(() => {
    axios
      .get("/cards/" + id)
      .then(({ data }) => {
        let newInputState = {...data};

        if (data.image && data.image.url) {newInputState.url = data.image.url;}
        else {newInputState.url = "";}
        if (data.image && data.image.alt) {newInputState.alt = data.image.alt;} 
        else {newInputState.alt = "";}


        delete newInputState.image;
        delete newInputState.likes;
        delete newInputState._id;
        delete newInputState.user_id;
        delete newInputState.bizNumber;
        delete newInputState.createdAt;
        delete newInputState.address;
        delete newInputState.__v;

        setInputState(newInputState);
      })
      .catch((err) => {
        console.log("err from axios", err);
        toast.error("Oops"); 
      });
  }, []);

  const handleSubmitBtnClick = async (ev) => {
    try {
      const joiResponse = validateEditSchema(inputState);
      setInputsErrorsState(joiResponse);
      console.log(joiResponse);
      if (!joiResponse) {
        //move to homepage
        await axios.put("/cards/" + id, inputState);
        navigate(ROUTES.HOME);
      }
    } catch (err) {
      console.log("err", err);
      toast.error("errrrrrrrrrrrrrrrror");
    }
  };

  const handleCancelBtnClick = () => {
    navigate(ROUTES.HOME);
  };
  const handleInputChange = (ev) => {
    const{id, value} = ev.target
    setInputState(prev => (
      {...prev,
      [id]: value}
    ));
  }
  
  useEffect(() => {
    const joiResponse = validateEditSchema(inputState);
    setInputsErrorsState(joiResponse);
    console.log(inputsErrorsState)
  }, [inputState]);

 if (!inputState) {
    return <CircularProgress />;
  }  

  return (
    <Container component="main" maxWidth="md">
      <Box
        sx={{
          marginY: 2,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography variant="h4" textAlign={"center"} my={2}>
          Edit Your Item
        </Typography>
        <Typography variant="h6" textAlign={"center"} my={2}>
          Here you can edit all the details of the item.
        </Typography>
        <Divider />
      <Box
        component="img"
        sx={{
          width: '1/9',
          maxWidth: { xs: '1', md: '1/2'},
        }}
        alt={inputState && inputState.alt}
        src={inputState && inputState.url}
      />
        <Box component="div" noValidate sx={{ mt: 3 }}>
          <Grid container spacing={2}>
            {[
              {id: 'item',label: 'Item', required: true, },
              {id: 'company',label: 'Company', required: true, },
              {id: 'price',label: 'Price', required: true, },
              {id: 'size',label: 'Size', required: false, },
              {id: 'location',label: 'Location', required: true, },
              {id: 'contactName',label: 'Contact Name', required: true},
              {id: 'phone',label: 'Phone', required: true, },
              {id: 'email',label: 'Email', required: false, },
              {id: 'url',label: 'Image Url', required: true, },
              {id: 'alt',label: 'Image alt', required: true, },
            ].map(({id, label, required, type}) => (
              <Grid item xs={12} sm={6} key={id}>
                <TextField
                  required={required}
                  id={id}
                  label={label}
                  fullWidth
                  value={inputState[id]}
                  onChange={handleInputChange}
                  error={(inputState && inputState[id] && inputsErrorsState && inputsErrorsState[id]) ? true : false}
                  helperText={
                  inputsErrorsState &&
                  inputState &&
                  inputState[id] &&
                  inputsErrorsState[id] &&
                  inputsErrorsState[id].map((item) => (
                    <span key={`errors${item}`}>{item}</span>
                  ))}
                />
              </Grid>))}
              <Grid item xs={12} md={6}>
                <Button
                fullWidth
                variant="outlined"
                color="error"
                onClick={handleCancelBtnClick}
                >
                CANCEL
                </Button>
              </Grid>
            <Grid item xs={12} md={6}>
              <Button 
                fullWidth
                variant="outlined"
                /* onClick={handleResetBtnClick} */
              >
                <LoopOutlinedIcon/>
              </Button>
            </Grid>
            <Grid item xs={12} md={12}>
              <Button
                fullWidth
                sx={{mb: 5}}
                variant="contained" 
                onClick={handleSubmitBtnClick}
              >
                SUBMIT
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
};
export default EditCardPage;
