import { Typography, Divider, Grid, Box, List, ListItem } from "@mui/material";
import homePageImg from './homePageImg.png';
import favoritesPageImg from './FavoritesPageImg.png'
import mycardsPageImg from './mycardsPageImg.png'
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import FavoriteIcon from '@mui/icons-material/Favorite';
import SummarizeIcon from '@mui/icons-material/Summarize';

const AboutPage = () => {
    return (
        <Box>
            <Typography variant="h4" textAlign={"center"} my={2}>
              About Our Website 
            </Typography>
            <Typography variant="h6" textAlign={"center"} my={2}>
              Here you can find explaination about our Business Cards website.
            </Typography>
            <Divider />
            <Grid container spacing={2} my={2}>
                <Grid item xs={12} md={12} my={2}>
                    <Typography variant="h5" gutterBottom>Our website presents business cards of different businesses from different sections. If you are a business that wants to publish itself and to present details about it, you are welcome to join us.</Typography>    
                </Grid>
                <Grid item xs={12} md={6} sx={{background: '#9e9e9e', display: 'flex', alignItems: 'center'}}>
                    <div>
                        <Typography variant="h6" gutterBottom >Home Page</Typography>
                    <Typography>On the home page you can find all the business cards we have on our site.</Typography>
                    <List>
                        <ListItem><SummarizeIcon sx={{m:1}}/> Clicking on the business card will bring you to a page with more details about the business.</ListItem>
                        <ListItem><FavoriteIcon sx={{m:1}}/> Clicking on the favorite icon will mark this business card as a favorite.</ListItem>
                        <ListItem><EditIcon sx={{m:1}}/> Clicking on the edit icon will allow editing of the card, available only to business customers who created the card.</ListItem>
                        <ListItem><DeleteIcon sx={{m:1}}/> Clicking on the delete icon will allow deletion of the card, available only to admin and bussiness customers.</ListItem>
                    </List>
                    </div> 
                </Grid>
                <Grid item xs={12} md={6} sx={{background: '#9e9e9e', }}>
                        <img src={homePageImg} alt={'Home Page'} style={{maxWidth: '100%', height: 'auto'}}></img>
                </Grid>
                <Grid item xs={12} md={6} >
                    <img src={favoritesPageImg} alt={'Favorites Page'} style={{maxWidth: '100%', height: 'auto'}}></img>
                </Grid>
                <Grid item xs={12} md={6} style={{display: 'flex', alignItems: 'center'}}>
                  <div>
                    <Typography variant="h6" gutterBottom>Favorites Page</Typography>
                    <Typography>Favorites page is available to registered and logged in users. All the business cards that the user has marked as favorites are saved here, so you can perform the actions on the card just like from the home page.</Typography> 
                  </div> 
                </Grid>
                <Grid item xs={12} md={6} sx={{background: '#9e9e9e', display: 'flex', alignItems: 'center'}}>
                    <div>
                    <Typography variant="h6" gutterBottom>My Cards Page</Typography>
                    <Typography>This page is available to business users who logged in. All business cards created by the user are displayed here. From this page you can also create a new card by clicking on the "+" button.</Typography>
                    </div>
                </Grid>
                <Grid item xs={12} md={6} sx={{background: '#9e9e9e'}}>
                    <img src={mycardsPageImg} alt={'My Cards Page'} style={{maxWidth: '100%', height: 'auto'}}></img>
                </Grid>
                <Grid item xs={12} md={6} >
                    <Typography variant="h6" gutterBottom>Sandbox Page</Typography>
                    <Typography>CRM page is available to Admin users. This page demonstrates using a page within a page as taught in class. Clicking on the link opens the corresponding page.</Typography>  
                </Grid>
                <Grid item xs={12} md={6} mb={3}>
                    <Typography variant="h6" gutterBottom>CRM Page</Typography>
                    <Typography>CRM page is available to Admin users. This table shows all users and their information details. In this table, an admin user can delete a user or edit a business status for other non-admin users. This is a bonus task.</Typography>  
                </Grid>
                <Grid item xs={12} md={6} sx={{background: '#9e9e9e', display: 'flex', alignItems: 'center'}}>
                    <div>
                    <Typography variant="h6" gutterBottom>Detailed Business Card Page</Typography>
                    <Typography>This page is available to all types of users, and here you can find more details about the businesses. An admin user will be able to change the business number here by clicking a button at the bottom of the card (bonus task).</Typography>
                    </div>  
                </Grid>
                <Grid item xs={12} md={6} sx={{background: '#9e9e9e'}}>
                    <Typography variant="h6" gutterBottom>There are several form pages on the website:</Typography>  
                    <List>
                        <ListItem># User Signup</ListItem>
                        <ListItem># User Login (With user blocking after 3 failed logins for 24 hrs.)</ListItem>
                        <ListItem># User Profile (bonus task)</ListItem>
                        <ListItem># Creat card</ListItem>
                        <ListItem># Edit Card</ListItem>
                    </List>
                </Grid>



            </Grid>
        </Box>
    )
}

export default AboutPage;