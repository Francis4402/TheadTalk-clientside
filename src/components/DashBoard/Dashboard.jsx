import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import SlideBar from "./SlideBar.jsx";
import {Outlet} from "react-router-dom";



const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
}));


const Dashboard = () => {


    return (
        <Box sx={{ display: 'flex' }}>
            <SlideBar/>
            <Box component="main" sx={{ flexGrow: 1}}>
                <DrawerHeader />
                <Outlet/>
            </Box>
        </Box>
    );
}

export default Dashboard;