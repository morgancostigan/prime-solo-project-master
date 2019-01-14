import React from 'react';
import { connect } from 'react-redux';
// import IconButton from '@material-ui/core/IconButton';
// import Robot from '../icons/Robot';
import './Footer.css';
import UserDrawer from '../UserDrawer/UserDrawer';
// import BrewerDrawer from '../BrewerDrawer/BrewerDrawer';

const Footer = (props) => (

  <footer>
    &copy; Morgan Costigan 
    {/* IF isBrewer = false */}
    <div className="nav-right">
        <UserDrawer>
          {props.user.username} 
        </UserDrawer>
      {/* <IconButton><Robot /></IconButton> */}
        </div>

  </footer>
);


const mapStateToProps = state => ({
  user: state.user,
});

export default connect(mapStateToProps)(Footer);
