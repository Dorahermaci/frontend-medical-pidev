import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AppUser } from '../models/user';
import { map } from 'rxjs/operators';

export interface User{
  userName:string,
  userPassword:string
}

@Injectable({
  providedIn: 'root'
})
export class UserService {
  readonly baseUrl='/api/v1/registration'
  user : User ={
    userName: "",
    userPassword:""
  };
  constructor(private httpClient:HttpClient) { 
  //  this.apiServerUrl=''

  }
  
 

  authenticate(email: string, password: string) {
    console.log('authenticate function called'); // add this line
    this.user.userName=email;
    this.user.userPassword=password;
    const url = `${this.baseUrl}/login`;
      return this.httpClient.post(url,this.user).pipe(map((data => {

        // login successful if there's a jwt token in the response
        if (data && data['jwtToken']) {
          // store user details and jwt token in local storage to keep user logged in between page refreshes
          localStorage.setItem('currentUser', JSON.stringify(data));
        }
        return data;
      })))
  }
// to call when need it it's all ready here ! 
  logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('currentUser');
  }

  addUser(user: any) {
    return this.httpClient.post(`${this.baseUrl}`, user);
  }

  
  
  
}
