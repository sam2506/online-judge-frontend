export const USER_NAME_SESSION_ATTRIBUTE_NAME = 'authenticatedUser'
export const USER_TOKEN_SESSION_ATTRIBUTE_NAME = 'authenticatedUserToken'

class AuthenticationService {

    // createBasicAuthToken(username, password) {
    //     return 'Basic ' + window.btoa(username + ":" + password)
    // }

    registerSuccessfulLoginForJwt(username, token, tokenType) {
        sessionStorage.setItem(USER_NAME_SESSION_ATTRIBUTE_NAME, username)
        sessionStorage.setItem(USER_TOKEN_SESSION_ATTRIBUTE_NAME, this.createJWTToken(token, tokenType))
        console.log(sessionStorage.getItem(USER_TOKEN_SESSION_ATTRIBUTE_NAME));
    }

    createJWTToken(token, tokenType) {
        return tokenType + " " + token
    }

    logout() {
        sessionStorage.removeItem(USER_NAME_SESSION_ATTRIBUTE_NAME);
        sessionStorage.removeItem(USER_TOKEN_SESSION_ATTRIBUTE_NAME);
    }

    isUserLoggedIn() {
        let user;   
        try{
            user = sessionStorage.getItem(USER_NAME_SESSION_ATTRIBUTE_NAME)
        } catch (e) {
            console.log(e);
        }
        console.log(user);
        if (user === null) return false
        return true
    }

    getLoggedInUserName() {
        let user = sessionStorage.getItem(USER_NAME_SESSION_ATTRIBUTE_NAME)
        if (user === null) return ''
        return user
    }
}

export default new AuthenticationService;
