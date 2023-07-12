import { Box, CircularProgress, Divider, Grid, Typography, ImageList, ImageListItem, ImageListItemBar  } from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import CardComponent from "../components/CardComponent";
import { toast } from "react-toastify";
import useQueryParams from "../hooks/useQueryParams";
import { useSelector } from "react-redux";
import { filterData } from "../components/filterFunc";



const HomePage = () => {
  const [originalCardsArr, setOriginalCardsArr] = useState(null);
  const [itemsArr, setItemsArr] = useState(null);
  const navigate = useNavigate();
  let qparams = useQueryParams();
  const payload = useSelector((bigPie) => bigPie.authSlice.payload);

  useEffect(() => {
  axios
    .get("/cards/")
    .then(({ data }) => {
      console.log("data", data);
      filterFunc(data);
    })
    .catch((err) => {
      console.log("err from axios", err);
      toast.error("Oops");
    });
  
    /* const filterFunc = (data) => {
    let filter = "";
    if (qparams.filter) {
      filter = qparams.filter.toLowerCase();;
    }
    if (originalCardsArr) {
      
      let newOriginalCardsArr = JSON.parse(JSON.stringify(originalCardsArr));
      setCardsArr(
        newOriginalCardsArr.filter((card) => card.title.toLowerCase().startsWith(filter) || card.bizNumber.toLowerCase().startsWith(filter))
      );
    } else if (data) {
      
      setOriginalCardsArr(data);
      setCardsArr(data.filter((card) => card.title.toLowerCase().startsWith(filter) || card.bizNumber.toLowerCase().startsWith(filter)));
    }
  }; 
  
  }, [qparams.filter]);*/

  const filterFunc = (data) => {
    let filter = "";
    if (qparams.filter) {
      filter = qparams.filter.toLowerCase();;
    }
      const newOriginalCardsArr = JSON.parse(
        JSON.stringify(originalCardsArr || data)
      );
      const filteredData = filterData(newOriginalCardsArr, filter);
      setOriginalCardsArr(newOriginalCardsArr);
      setItemsArr(filteredData);
    };
  }, [qparams.filter]);
  
  
  const handleDeleteFromInitialCardsArr = async (id) => {
    try {
      await axios.delete("/cards/" + id); // /cards/:id
      setItemsArr((newCardsArr) =>
        newCardsArr.filter((item) => item._id !== id)
      );
    } catch (err) {
      console.log("error when deleting", err.response.data);
    }
  }; 

  const handleEditFromInitialCardsArr = (id) => {
    navigate(`/edit/${id}`); //localhost:3000/edit/123213
  };

  const handleDetailedCardFromInitialCardsArr = (id) => {
    navigate(`/detailedcard/${id}`); 
  }; 

  if (!itemsArr) {
    return <CircularProgress />;
  } 

  return (
    <Box>
      <Typography variant="h4" textAlign={"center"} my={2}>
        Cards Page
      </Typography>
      <Typography variant="h6" textAlign={"center"} my={2}>
        Here you can find cards of all our businesses.
      </Typography>
      <Divider />
      <Grid container spacing={2} my={2}>
        {itemsArr.map((item) => (
          <Grid item xs={12} md={4} key={item._id + Date.now()}>
            <CardComponent
              id={item._id}
              item={item.item}
              company={item.company}
              price={item.price}
              size={item.size}
              contactName={item.contactName}
              location={item.location}
              phone={item.phone}
              bizNumber={item.bizNumber}
              url={item.image.url}
              alt={item.image.alt}
              likes={item.likes}
              userId={item.user_id}
              onDelete={handleDeleteFromInitialCardsArr}
              onEdit={handleEditFromInitialCardsArr}
              onDetailedCard={handleDetailedCardFromInitialCardsArr}
              canEdit={payload && payload.isAdmin}
             
            />
          </Grid>
          
        ))}
      </Grid>
      
    </Box> 
  );
};


export default HomePage;
