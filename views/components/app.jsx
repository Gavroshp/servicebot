import React from 'react';
import Fetcher from "./utilities/fetcher.jsx"
import NavBootstrap from "./layouts/nav-bootstrap.jsx"
import Footer from "./layouts/footer.jsx"
import {browserHistory} from 'react-router';
import {connect} from "react-redux";
import {setUid, setUser, dismissAlert, setPermissions} from "./utilities/actions"
import { store } from "../store"

import i18n from './utilities/i18n'
import { I18nextProvider, translate } from "react-i18next";

class App extends React.Component {

    constructor(props) {
        super(props);
        this.state = {backgroundColor: '#000000'};
        this.handleLogout = this.handleLogout.bind(this);
    }

    componentDidMount(){
    }

    handleLogout() {
        let that = this;

        Fetcher("/api/v1/auth/session/clear").then(function(result){
            localStorage.removeItem("permissions");
            that.props.logout();
            browserHistory.push('/');
        })
    }

    render () {
        let self = this;
        let background = (this.props.options && this.props.options.background_color)  ? this.props.options.background_color.value : '#ff0400';
        if(this.props.options && this.props.options.background_color){
            document.getElementById('servicebot-loader').classList.add('move-out');
        }

        const childrenWithProps = React.Children.map(self.props.children, child => React.cloneElement(child, { t: this.props.t, i18n: this.props.i18n }));

        return(
            <div className="app-container" style={{backgroundColor: background}}>
                {this.props.modal && this.props.modal}
                <NavBootstrap handleLogout={this.handleLogout}
                              t={this.props.t}
                              i18n={this.props.i18n}
                />
                {childrenWithProps}
                <Footer
                    t={this.props.t}
                    i18n={this.props.i18n}
                />
            </div>
        );
    }
}
let mapStateToProps = function(state){
    return {
        options : state.options,
        modal: state.modal
    }
}
let mapDispatchToProps = function(dispatch){
    return {
        logout : function(){
            dispatch(setUid(null));
            dispatch(dismissAlert([]));
            dispatch(setUser(null));
            dispatch(setPermissions([]));

        }}
}

const AppTrans = translate("translations")(connect(mapStateToProps, mapDispatchToProps)(App));

export default (props) => {
    return (
        <I18nextProvider i18n={i18n}>
            <AppTrans {...props}/>
        </I18nextProvider>
    )
}

