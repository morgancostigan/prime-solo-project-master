import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import classnames from 'classnames';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import red from '@material-ui/core/colors/red';
import FavoriteIcon from '@material-ui/icons/Favorite';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import ShareIcon from '@material-ui/icons/Share';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import Chip from '@material-ui/core/Chip';


const styles = theme => ({
    card: {
        maxWidth: 350,
        minWidth: 350,
        maxHeight: 1500,
        minHeight: 400,
        margin: 10,
    },
    chip: {
        margin: '0px 5px 10px 5px'
        // marginLeft: 5,
        // marginRight: 5,
        // marginBottom: 10,
    },
    chips: {
        justifyContent: 'center',
    },
    media: {
        paddingTop: '40%', // 16:9
        maxHeight: '100%',
        maxWidth: '100%',
        objectFit: 'contain',
        // title: 24,        //trying to make this bigger, or bold   
    },
    actions: {
        display: 'flex',
        // alignItems: 'center',
        // justifyContent: 'center',      //trying to center the cards, esp on mobile
    },
    expand: {
        transform: 'rotate(0deg)',
        transition: theme.transitions.create('transform', {
            duration: theme.transitions.duration.shortest,
        }),
        marginLeft: 'auto',
        [theme.breakpoints.up('sm')]: {
            marginRight: -8,
        },
    },
    expandOpen: {
        transform: 'rotate(180deg)',
    },
    avatar: {
        backgroundColor: red[500],
    },
    h4: {
        fontsize: 24,
    }
});

class PortfolioItem extends Component {
    state = { expanded: false };

    handleExpandClick = () => {
        this.setState(state => ({ expanded: !state.expanded }));
    };

    deleteFromPortfolio = () => {
        this.props.dispatch({
            type: 'DELETE_BEER_TAGS',
            payload: {
                beer_id: this.props.id,
                user_id: this.props.reduxStore.user.id,
            },
            refresh: this.props.brewery_id
        })
    };

    render() {
        const { classes } = this.props;

        return (
            <Card className={classes.card}>
                <CardHeader
                    action={
                        <IconButton>
                            {/* <MoreVertIcon /> */}
                        </IconButton>
                    }
                    title={this.props.beer}
                    subheader={this.props.release}
                />
                <CardMedia
                    className={classes.media}
                    image={this.props.image}
                    title={this.props.beer_name}
                />
                <CardContent>
                    <Typography className={classes.h4} component="h4">
                        {this.props.style}
                    </Typography>
                    <div className={classes.chips} >
                        <Chip label={this.props.tag1} className={classes.chip} />
                        <Chip label={this.props.tag2} className={classes.chip} />
                        <Chip label={this.props.tag3} className={classes.chip} />
                    </div>


                </CardContent>
                <CardActions className={classes.actions} disableActionSpacing>
                    <IconButton aria-label="Delete"
                        onClick={this.deleteFromPortfolio}>
                        <DeleteIcon />
                    </IconButton>
                    <IconButton aria-label="Edit">
                        <EditIcon />
                    </IconButton>
                    <IconButton
                        className={classnames(classes.expand, {
                            [classes.expandOpen]: this.state.expanded,
                        })}
                        onClick={this.handleExpandClick}
                        aria-expanded={this.state.expanded}
                        aria-label="Show more"
                    >
                        <ExpandMoreIcon />
                    </IconButton>
                </CardActions>
                <Collapse in={this.state.expanded} timeout="auto" unmountOnExit>
                    <CardContent>
                        <Typography paragraph>{this.props.description}</Typography>

                    </CardContent>
                </Collapse>
            </Card>
        );
    }
}

// Instead of taking everything from state, we just want the beer info.
const mapStateToProps = reduxStore => ({
    reduxStore,
});

// this allows us to use <App /> in index.js
export default connect(mapStateToProps)(withStyles(styles)(PortfolioItem));