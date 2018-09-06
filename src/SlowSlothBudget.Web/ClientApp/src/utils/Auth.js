import auth0 from 'auth0-js';
import { auth0Config } from './Configuration';

class Auth {
    constructor() {
        this.auth0 = new auth0.WebAuth({
            domain: auth0Config.domain,
            audience: auth0Config.audience,
            clientID: auth0Config.clientID,
            redirectUri: auth0Config.redirectUri,
            responseType: auth0Config.responseType
        });

        this.getProfile = this.getProfile.bind(this);
        this.handleAuthentication = this.handleAuthentication.bind(this);
        this.isAuthenticated = this.isAuthenticated.bind(this);
        this.signIn = this.signIn.bind(this);
        this.signOut = this.signOut.bind(this);
    }

    getProfile() {
        return this.profile;
    }

    getIdToken() {
        return this.idToken;
    }

    handleAuthentication() {
        return new Promise((resolve, reject) => {
            this.auth0.parseHash((err, authResult) => {
                if (err) return reject(err);
                if (!authResult || !authResult.idToken) {
                    return reject(err);
                }
                this.idToken = authResult.idToken;
                this.profile = authResult.idTokenPayload;
                // set the time that the id token will expire at
                this.expiresAt = authResult.expiresIn * 1000 + new Date().getTime();
                resolve();
            });
        })
    }

    isAuthenticated() {
        return new Date().getTime() < this.expiresAt;
    }
    
    signIn() {
        this.auth0.authorize();
    }

    signOut() {
        // clear id token, profile, and expiration
        this.idToken = null;
        this.profile = null;
        this.expiresAt = null;
    }
}

const auth0Client = new Auth();

export default auth0Client;