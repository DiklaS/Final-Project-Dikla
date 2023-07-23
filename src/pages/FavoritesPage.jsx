import { Typography, Box, Grid, Divider, CircularProgress } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import ROUTES from "../routes/ROUTES";
import axios from "axios";
import { toast } from "react-toastify";
import CardComponent from "../components/CardComponent";
import { useSelector } from "react-redux";
import { filterData } from "../components/filterFunc";
import useQueryParams from "../hooks/useQueryParams";
import PropTypes from 'prop-types';

const FavoritesPage = () => {
  const payload = useSelector((bigPie) => bigPie.authSlice.payload);
  const navigate = useNavigate();
  const [originalfavoritesArr, setOriginalfavoritesArr] = useState(null);
  const [favoritesArr, setFavoritesArr] = useState();
  let qparams = useQueryParams();

  useEffect(() => {
    axios
      .get("/cards/favorites")
      .then(({ data }) => {
        console.log("data", data);
        //setFavoritesArr(data);
        filterFunc(data);
      })
      .catch((err) => {
        console.log("err from axios", err);
        toast.error("Oops");
      });
    const filterFunc = (data) => {
    let filter = "";
    if (qparams.filter) {
      filter = qparams.filter.toLowerCase();;
    }
      const newOriginalCardsArr = JSON.parse(
        JSON.stringify(originalfavoritesArr || data)
      );
      const filteredData = filterData(newOriginalCardsArr, filter);
      setOriginalfavoritesArr(newOriginalCardsArr);
      setFavoritesArr(filteredData);
  };
  }, [qparams.filter]);

  const updateFavoritesArr = (updatedFavorites) => {
    setFavoritesArr(updatedFavorites);
  };

  const handleDeleteFromInitialCardsArr = async (id) => {
    try {
      await axios.delete("/cards/" + id); // /cards/:id
      setFavoritesArr((newCardsArr) =>
        newCardsArr.filter((item) => item._id !== id)
      );
    } catch (err) {
      console.log("error when deleting", err.response.data);
    }
  }; 

  const handleEditFromInitialCardsArr = (id) => {
    navigate(`/edit/${id}`); 
  };
  
  const handleDetailedCardFromInitialCardsArr = (id) => {
    navigate(`/detailedcard/${id}`); 
  }; 

  if (!favoritesArr) {
    return <CircularProgress />;
  }  
    return (
        <Box>
            <Typography variant="h4" textAlign={"center"} my={2}>
              My Favorites Cards Page
            </Typography>
            <Typography variant="h6" textAlign={"center"} my={2}>
              All your favorites businesses are displayed here.
            </Typography>
            <Divider />
            <Grid container spacing={2} my={2}>
            {favoritesArr && favoritesArr.length>0 ? (favoritesArr.map((item) => (
              <Grid item xs={12} md={4} key={item._id + Date.now()}>
                <CardComponent
                  id={item._id}
                  item={item.item}
                  company={item.company}
                  price={item.price}
                  size={item.size}
                  url={item.image.url}
                  alt={item.image.alt}
                  location={item.location}
                  contactName={item.contactName}
                  bizNumber={item.bizNumber}
                  phone={item.state}
                  likes={item.likes}
                  userId={item.user_id}
                  createdAt={item.createdAt}
                  onDelete={handleDeleteFromInitialCardsArr}
                  onEdit={handleEditFromInitialCardsArr}
                  onDetailedCard={handleDetailedCardFromInitialCardsArr}
                  canEdit={payload && (payload.biz || payload.isAdmin)}
                  updateFavoritesArr={updateFavoritesArr}
                />
              </Grid>)))
              : <Typography variant="h6" gutterBottom>
                You don't have Favorites
              </Typography>
          
            }
            </Grid>
        </Box>
  );
}

FavoritesPage.propTypes = {
    //CardComponent: PropTypes.elementType.isRequired,
    originalfavoritesArr: PropTypes.array,
    favoritesArr: PropTypes.array,
    updateFavoritesArr: PropTypes.func,
    qparams: PropTypes.object,
  };

export default FavoritesPage;