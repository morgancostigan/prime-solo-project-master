import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';
import LogOutButton from '../LogOutButton/LogOutButton';
import Drawer from '@material-ui/core/Drawer';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import LocalDrinkIcon from '@material-ui/icons/LocalDrink';
import HomeIcon from '@material-ui/icons/Home';
import CalendarIcon from '@material-ui/icons/CalendarToday';
import SearchRoundedIcon from '@material-ui/icons/SearchRounded';
import LockIcon from '@material-ui/icons/Lock';
import EditIcon from '@material-ui/icons/Edit';
import ViewListIcon from '@material-ui/icons/ViewList';
import { connect } from 'react-redux';


let brewerList;
let fullList;
let loginLogout;

const styles = {
    list: {
        width: 250,
    },
    brewerList:{
        width: 'auto',
    },
    fullList: {
        width: 'auto',
    },
    loginLogout: {
        width: 'auto',
    },
    /* This line makes the "Register" and "Login" buttons look like links */
    linkButton: {
        background: 'none',
        color: 'inherit',
        border: 'none',
        padding: 0,
        font: 'inherit',
        outline: 0,
        // borderBottom: '1px solid #444',
        cursor: 'pointer',
    }
};

class UserDrawer extends React.Component {
    state = {
        top: false,
        left: false,
        bottom: false,
        right: false,
    };

    toggleDrawer = (side, open) => () => {
        this.setState({
            [side]: open,
        });
    };

    render( props ) {
        if (this.props.user.id && this.props.user.isBrewer) { 

        const { classes } = this.props;

        brewerList = (
            <div className={classes.brewerList}>
                <List>
                    <Link to="/add-beer">
                    <ListItem>
                        <ListItemIcon><LocalDrinkIcon /></ListItemIcon>
                        <ListItemText primary={'Add Beer'} />
                    </ListItem>
                    </Link>
                    <ListItem>
                        <ListItemIcon><ViewListIcon /></ListItemIcon>
                        <ListItemText primary={'View Our Portfolio'} />
                    </ListItem>
                </List>
                <Divider />
            </div>
        );
        
        fullList = (
            <div className={classes.fullList}>
                <List>
                    <ListItem>
                        <ListItemIcon><SearchRoundedIcon/></ListItemIcon>
                        <ListItemText primary={'Search / Filter'} />
                    </ListItem>
                    <ListItem>
                        <ListItemIcon><CalendarIcon /></ListItemIcon>
                        <ListItemText primary={'View My Calendar'} />
                    </ListItem>
                    <ListItem>
                        <ListItemIcon><EditIcon /></ListItemIcon>
                        <ListItemText primary={'Edit My Profile'} />
                    </ListItem>
                </List>
                <Divider />
            </div>
        );

            loginLogout = (
                <div className={classes.loginLogout}>
                    <List>
                    <Link to="/home">
                        <ListItem>
                            <ListItemIcon><HomeIcon /></ListItemIcon>
                            <ListItemText primary={'Home'} />
                        </ListItem>
                    </Link>
                    <LogOutButton className={classes.linkButton}>
                        <ListItem>
                            <ListItemIcon><LockIcon /></ListItemIcon>  
                            <ListItemText primary={'Log Out'} />
                        </ListItem>
                    </LogOutButton>                     
                    </List>
                </div>
            );
        } else if (this.props.user.id) {
            const { classes } = this.props;

            fullList = (
                <div className={classes.fullList}>
                    <List>
                        <ListItem>
                            <ListItemIcon><SearchRoundedIcon /></ListItemIcon>
                            <ListItemText primary={'Search / Filter'} />
                        </ListItem>
                        <ListItem>
                            <ListItemIcon><CalendarIcon /></ListItemIcon>
                            <ListItemText primary={'View My Calendar'} />
                        </ListItem>
                        <ListItem>
                            <ListItemIcon><EditIcon /></ListItemIcon>
                            <ListItemText primary={'Edit My Profile'} />
                        </ListItem>
                    </List>
                    <Divider />
                </div>
            );

            loginLogout = (
                <div className={classes.loginLogout}>
                    <List>
                        <Link to="/home">
                            <ListItem>
                                <ListItemIcon><HomeIcon /></ListItemIcon>
                                <ListItemText primary={'Home'} />
                            </ListItem>
                        </Link>
                        <LogOutButton className={classes.linkButton}>
                            <ListItem>
                                <ListItemIcon><LockIcon /></ListItemIcon>
                                <ListItemText primary={'Log Out'} />
                            </ListItem>
                        </LogOutButton> 
                    </List>
                </div>
            );
        } else {
            const { classes } = this.props;
            loginLogout = (
                <div className={classes.loginLogout}>
                    <List>
                        <Link to="/home">
                            <ListItem>
                                <ListItemIcon><HomeIcon /></ListItemIcon>
                                <ListItemText primary={'Home'} />
                            </ListItem>
                        </Link>
                    </List>
                    <List>
                        <Link to="/home">
                        <ListItem>
                            <ListItemIcon><LockIcon /></ListItemIcon>
                            <ListItemText primary={'Log In / Register'} />
                        </ListItem>
                        </Link>
                    </List>
                </div>
            );
        }
         
        return (
            <div>
                <Button onClick={this.toggleDrawer('bottom', true)}>{this.props.user.username}</Button>
                <Drawer
                    anchor="bottom"
                    open={this.state.bottom}
                    onClose={this.toggleDrawer('bottom', false)}
                >
                    <div
                        tabIndex={0}
                        role="button"
                        onClick={this.toggleDrawer('bottom', false)}
                        onKeyDown={this.toggleDrawer('bottom', false)}
                    >
                        {brewerList}
                        {fullList}
                        {loginLogout}

                    </div>
                </Drawer>
            </div>
        );
    }
}

UserDrawer.propTypes = {
    classes: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
    user: state.user,
});

export default connect(mapStateToProps)(withStyles(styles)(UserDrawer));