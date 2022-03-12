class Auth {
    private static instance: Auth;
    private authenticated: boolean = false;

    private constructor(){

    }

    public static getInstance(){
        console.log("A");
        return this.instance || (this.instance = new this());
    }

    login(){
        this.authenticated=true;
    }

    logout(){
        this.authenticated=false;
    }

    isAuthenticated(){
        return this.authenticated;
    }
}

export default Auth.getInstance();