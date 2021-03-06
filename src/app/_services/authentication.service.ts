import {Injectable} from '@angular/core';
import {BehaviorSubject,Observable} from 'rxjs';
import {environment} from "../../environments/environment";

interface UserT {
    email: string;
    username: string;
    password: string;
    accessToken: string;
    refreshToken: string;
};

@Injectable({providedIn: 'root'})
export class AuthenticationService {
    user: UserT;
    authenticated = false;

    constructor() {}

    public async loadUser() {
        const userRes = await fetch(`${environment.URL_API}/api/user`,{
            headers: {'Authorization': `Bearer ${localStorage.getItem("accessToken")}`}
        });
        if(!userRes.ok)
            return;
        const userJson = await userRes.json();
        this.user = userJson.data;
        this.authenticated = true;
    }

    public login(accessToken: string,refreshToken: string) {
        localStorage.setItem("accessToken",accessToken);
        localStorage.setItem("refreshToken",refreshToken);
    }

    public logout() {
        this.authenticated = false;
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
    }
}