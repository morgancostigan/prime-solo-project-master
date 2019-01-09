import React from 'react';
import { connect } from 'react-redux';
import './Footer.css'

const Footer = (props) => (
  <footer>
    &copy; Morgan Costigan 
        <div className="nav-right">
      {props.user.username}
        </div>
  </footer>
);

const mapStateToProps = state => ({
  user: state.user,
});

// this allows us to use <App /> in index.js
export default connect(mapStateToProps)(Footer);
