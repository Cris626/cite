import React, { Component } from 'react';
import { List, ListItem, ListItemText, Collapse } from '@material-ui/core';
import ExpandLess from '@material-ui/icons/ExpandLess'
import ExpandMore from '@material-ui/icons/ExpandMore'
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
// import { logoutUser } from '../../redux/actions';
import SvgIcon  from '@material-ui/core/SvgIcon';
// import { AccessAlarm, ThreeDRotation } from '@material-ui/icons';

class Sidebar extends Component{
    constructor(props) {
        super(props);
        this.state={
            selectedIndex: 0
        }
        this.handleClick = this.handleClick.bind(this);
        this.handleListItemClick = this.handleListItemClick.bind(this);
        this.handleListItemClickOnline = this.handleListItemClickOnline.bind(this);
    }
    
    componentDidMount(){
        let items = this.props.items.items
        items.map(x=>x.expand?this.setState({...x.expand}):'')
    }

    logOut(){
        localStorage.removeItem('Authorization');
        this.props.history.push('/');
    }

    handleClick = (expand) => {
        let newKey, value;
        let obj = {}
        let y = Object.keys(expand).map(x=>x)
        Object.keys(this.state).filter(key=>{
            if(key===y[0]){
                newKey = key
                value = !this.state[key]
            }
        })
        obj[newKey] = value
        this.setState({...obj})
    };

    handleListItemClick=(index)=>{
        this.setState({
            selectedIndex: index,
        })
    }

    handleListItemClickOnline=(index)=>{
        Object.keys(this.state).map(key=>{
            if(key!=='selectedIndex'){
                let obj = {};
                obj[key] = false
                this.setState({...obj})
            }
        })
        this.setState({
            selectedIndex: index,
        })
    }

    expandLess=(expand)=>{
        let value;
        let y = Object.keys(expand).map(x=>x)
        Object.keys(this.state).filter(key=>{
            if(key===y[0]){
                value = this.state[key]
            }
        })
        return value;
    }

    icons=(icon)=>{
        return <SvgIcon style={{marginRight: "15px"}}><path d={`${icon}`} /></SvgIcon>;
    }

    render(){
        const items = this.props.items.items;
        return(
            <List disablePadding className="sidebar">
                {items.map(({ label, name, option, url, num, expand, icon, ...rest}) => {
                return (
                    <div>
                        {option?<div>
                            <Link key={name} className="link-router">
                                <ListItem button key={name} onClick={()=>this.handleClick(expand)} selected={this.state.selectedIndex === num} className="list-button">
                                    {this.icons(icon)}
                                    <ListItemText>{label}</ListItemText>
                                    {this.expandLess(expand)?<ExpandLess /> : <ExpandMore />}
                                </ListItem>
                            </Link>
                            <Collapse in={this.expandLess(expand)} timeout="auto" unmountOnExit>
                                <List component="div" disablePadding>
                                    {option.map(x=>
                                    <Link to={x.url} key={x.name} className="link-router">
                                        <ListItem key={x.name} button className="list-button" selected={this.state.selectedIndex === num} onClick={()=>this.handleListItemClick(num)}>
                                            <ListItemText>{x.label}</ListItemText>
                                        </ListItem>
                                    </Link>
                                )}
                                </List>
                            </Collapse>
                        </div>:
                        <Link to={url} key={name} className="link-router">
                            <ListItem key={name} button {...rest} className="list-button" selected={this.state.selectedIndex === num} onClick={()=>this.handleListItemClickOnline(num)}>
                                {this.icons(icon)}
                                <ListItemText>{label}</ListItemText>
                            </ListItem>
                        </Link>}
                    </div>
                )})}
                <div className="link-router">
                    <ListItem key='cerrar-sesion' button onClick={()=>this.logOut()} className="list-button">
                        <SvgIcon style={{marginRight: "15px"}}>
                            <path d="M10.09 15.59L11.5 17l5-5-5-5-1.41 1.41L12.67 11H3v2h9.67l-2.58 2.59zM19 3H5c-1.11 0-2 .9-2 2v4h2V5h14v14H5v-4H3v4c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2z" />
                        </SvgIcon>
                        <ListItemText>Cerrar Sesión</ListItemText>
                    </ListItem>
                </div>
            </List>
        )
    }
}

export default Sidebar;