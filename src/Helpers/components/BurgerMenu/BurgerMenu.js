import React from 'react';
import {Fade, Menu, MenuItem} from "@material-ui/core";
import {useHistory} from "react-router-dom";
import MenuIcon from '@material-ui/icons/Menu';
import MenuOpenIcon from '@material-ui/icons/MenuOpen';
import {useDispatch} from "react-redux";
import {outUser} from "../../../redux/User/userActions";

const BurgerMenu = ({defContents}) => {

    const history = useHistory();
    const dispatch = useDispatch();
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const goToPage = (path) => {
        handleClose()
        history.push(path)
    }

    const handleSignOut = () => {
        handleClose()
        dispatch(outUser())
    }

    return (
        <div className='user_header_burger_menu'>
            <div onClick={handleClick}>
                {open ? <MenuOpenIcon/> : <MenuIcon/>}
            </div>
            <Menu
                id="fade-menu"
                anchorEl={anchorEl}
                anchorPosition={{left: 20, top: 40}}
                keepMounted
                open={open}
                onClose={handleClose}
                classes={{paper: 'header_burger'}}
                TransitionComponent={Fade}
            >
                {
                    defContents.map(el => (
                        <MenuItem onClick={() => goToPage(el.path)} key={el.path}>
                            {el.label}
                        </MenuItem>
                    ))
                }
                <MenuItem onClick={handleSignOut}>Sign Out</MenuItem>
            </Menu>
        </div>
    );
};

export default BurgerMenu;