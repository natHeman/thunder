import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { environment } from '../../environment/environment';
import { User } from '../models/user';

@Injectable({ providedIn: 'root' })
export class AuthenticationService {

    private currentUserSubject = new BehaviorSubject<any>('');
    currentUser = this.currentUserSubject.asObservable();

    // private currentUserSubject: BehaviorSubject<any>;
    // public currentUser: Observable<User>;

    constructor(private http: HttpClient) {
        // this.currentUserSubject = new BehaviorSubject<any>(JSON.parse(localStorage.getItem('currentUser')));
        // this.currentUser = this.currentUserSubject.asObservable();



    }

    public get currentUserValue(): User {
        return this.currentUserSubject.value;
    }

    login(logindetails:any) {
        return this.http.post<any>(`${environment.apiUrl}/api/v1/user/login`, logindetails)
            .pipe(map(user => {
                // store user details and jwt token in local storage to keep user logged in between page refreshes
                localStorage.setItem('currentUser', JSON.stringify(user));
                this.currentUserSubject.next(user);
                return user;
            }));
    }

    register(registerdetails:any) {
        return this.http.post<any>(`${environment.apiUrl}/api/v1/user/register`, registerdetails)

    }

    logout() {
        // remove user from local storage to log user out
        localStorage.removeItem('currentUser');
        this.currentUserSubject.next(null);
    }
}