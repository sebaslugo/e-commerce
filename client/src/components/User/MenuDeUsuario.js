import React from 'react';
import Button from '@material-ui/core/Button';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Grow from '@material-ui/core/Grow';
import Paper from '@material-ui/core/Paper';
import Popper from '@material-ui/core/Popper';
import MenuItem from '@material-ui/core/MenuItem';
import MenuList from '@material-ui/core/MenuList';
import { makeStyles } from '@material-ui/core/styles';
import { grey } from '@material-ui/core/colors';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ComputerIcon from '@material-ui/icons/Computer';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { logOut } from '../../redux/actions/menuLogIn';


let id = localStorage.getItem('idUser')
const greyHenry = grey[900]
const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        alignItems: "center",
    },
    paper: {
        marginRight: theme.spacing(2),
    },
    button: {
        color: "yellow",
        backgroundColor: "black",
        height: 50,
        marginBottom: 0,
        marginTop: 7,
        textDecoration: "none",

    }
}));

export default function MenuListComposition() {
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);
    const anchorRef = React.useRef(null);
    const dispatch = useDispatch()


    const handleToggle = () => {
        setOpen((prevOpen) => !prevOpen);
    };

    const handleClose = (event) => {
        if (anchorRef.current && anchorRef.current.contains(event.target)) {
            return;
        }

        setOpen(false);
    };
    const handleLogOut = (e) => {
        dispatch(logOut())
    }

    function handleListKeyDown(event) {
        if (event.key === 'Tab') {
            event.preventDefault();
            setOpen(false);
        }
    }

    const name = localStorage.getItem("name")

    // return focus to the button when we transitioned from !open -> open
    const prevOpen = React.useRef(open);
    useEffect(() => {
        if (prevOpen.current === true && open === false) {
            anchorRef.current.focus();
        }

        prevOpen.current = open;
    }, [open]);

    const handlePanel = () => {
        window.location.assign("http://localhost:3000/admin/panel")
    }

    const handlePerfil = () => {
        window.location.assign(`http://localhost:3000/user/perfil/${id}`)
    }

    return (
        <div className={classes.root}>

            <div>

                <Button

                    className={classes.button}
                    ref={anchorRef}
                    aria-controls={open ? 'menu-list-grow' : undefined}
                    aria-haspopup="true"
                    style={{ outline: "none" }}
                    onClick={handleToggle}
                >
                    <ComputerIcon />

                    &nbsp;
                    {localStorage.getItem("name")? name: "yo"}
                    <ExpandMoreIcon />
                </Button>
                <Popper open={open} anchorEl={anchorRef.current} role={undefined} transition disablePortal>
                    {({ TransitionProps, placement }) => (
                        <Grow
                            {...TransitionProps}
                            style={{ transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom' }}
                        >
                            <Paper>
                                <ClickAwayListener onClickAway={handleClose}>
                                    <MenuList autoFocusItem={open} id="menu-list-grow" onKeyDown={handleListKeyDown}>
                                        {localStorage.getItem('rol') == "admin"?<MenuItem onClick={handlePanel}>Panel</MenuItem>: null}                                     
                                        <MenuItem onClick={handlePerfil}>Perfil</MenuItem>
                                        <MenuItem onClick={handleLogOut}>Logout</MenuItem>
                                        </MenuList>
                                </ClickAwayListener>
                            </Paper>
                        </Grow>
                    )}
                </Popper>
            </div>
        </div >
    );
}