import React, { Component, useState } from "react";

import { GoogleLogin } from 'react-google-login';

export default class Login extends Component {
    constructor() {
        super();
        this.state = {
            name: ''
          };

      }
    render(){
        
        const responseGoogle = (response) => {
            const userName = response.profileObj.name;
            const UserId = response.profileObj.googleId

                    console.log(response);
                    this.setState({name: userName})
                    // setName(response.profileObj.name);
                    localStorage.setItem("id", UserId);
                    localStorage.setItem("login", 'true');

                    this.props.history.push({pathname: '/homepage', name: userName, id: UserId}); 
            }
        return (
        <div>
            <h1>Auth with google</h1>  
                 <GoogleLogin
                    clientId="1062129881714-oknshp1dutternt6m0c16ltg9dnk7vl6.apps.googleusercontent.com"
                    buttonText="Login"
                    onSuccess={responseGoogle}
                    onFailure={responseGoogle}
                    cookiePolicy={'single_host_origin'}
                  />
                  </div>
        )
    }
}
