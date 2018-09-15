import React from "react";
import { withRouter } from "react-router";
import auth0Client from "../utils/Auth";

class LoginLink extends React.Component {
    constructor(props) {
        super(props);

        this.handleClick = this.handleClick.bind(this);
    }

    handleClick(event) {
        event.preventDefault();
        if (auth0Client.isAuthenticated()) {
            auth0Client.signOut();
            this.props.history.replace('/');
        } else {
            auth0Client.signIn();
        }
    }

    render() {
        return (
            <li role="presentation" className="" onClick={this.handleClick}>
                <a role="button" href={auth0Client.isAuthenticated() ? "#logout" : "#login"}>
                    <span className="glyphicon glyphicon-user" /> {auth0Client.isAuthenticated() ? "Log out" : "Log in"}
                </a>
            </li>
        )
    }
}

export default withRouter(LoginLink);