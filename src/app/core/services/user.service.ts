import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AppUser } from '../models/user';
import { map } from 'rxjs/operators';
import { ConfirmRequest } from '../models/confirmrequest';
import { PasswordResetRequest } from '../models/passwordresetrequest';


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

  private loggedIn = false;
  
  

  authenticate(email: string, password: string) {
    console.log('authenticate function called'); // add this line
    this.user.userName=email;
    this.user.userPassword=password;
    const url = `${this.baseUrl}/login`;
      return this.httpClient.post(url,this.user).pipe(map((data => {

        // login successful if there's a jwt token in the response
        if (data ) {
          // store user details and jwt token in local storage to keep user logged in between page refreshes
          localStorage.setItem('currentUser', JSON.stringify(data));
          this.loggedIn = true;
          console.log(this.loggedIn);
        }
        return data;
      })))
      

  }
// to call when need it it's all ready here ! 
  logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('currentUser');
    this.loggedIn = false;
  }

  addUser(user: any) {
    return this.httpClient.post(`${this.baseUrl}`, user);
  }


  removeUser(userName: string): Observable<Object>{
  const currentUser = this.getCurrentUser(); 
  const token = currentUser?.jwtToken; 
  const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`); 
    return this.httpClient.delete(`${this.baseUrl}/delete/${userName}`, { headers });
  }
  
  getAllUsers(): Observable<AppUser[]>{
  const currentUser = this.getCurrentUser(); 
  const token = currentUser?.jwtToken; 
  const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`); 
    return this.httpClient.get<AppUser[]>(`${this.baseUrl}/users`, { headers });
  }
  
  confirmUser(confirmRequest: ConfirmRequest): Observable<string> {
    return this.httpClient.post<string>(`${this.baseUrl}/confirm`, confirmRequest);
  }

  generatePasswordResetToken(email: string): Observable<any> {
    return this.httpClient.post(`${this.baseUrl}/password-generate`, { email });
  }

  resetPassword(resetRequest: PasswordResetRequest): Observable<any> {
    return this.httpClient.post(`${this.baseUrl}/password-reset`, resetRequest);
  }
  unlockUser(userName: string) : Observable<Object> {
    return this.httpClient.put(`${this.baseUrl}/unlock/${userName}`, {});
  }
  updateUser(email: string, updatedUser: any) : Observable<any> {
    return this.httpClient.put<any>(`${this.baseUrl}/update/${email}`, updatedUser);
  }
  changePassword(email: string, oldPassword: string, newPassword: string): Observable<any> {
    const requestPayload = {
      oldPassword: oldPassword,
      newPassword: newPassword
    };
    return this.httpClient.put(`${this.baseUrl}/changepassword/${email}`, requestPayload);
  }
  isLoggedIn(): boolean {
    return this.loggedIn;
  }

  getUserByUsername(username: string): Observable<any> {
    return this.httpClient.get(`${this.baseUrl}/${username}`);
  }
  
  getCurrentUser(): any {
    const currentUser = localStorage.getItem('currentUser');
    if (currentUser) {
      return JSON.parse(currentUser);
    }
    return null;
  }
  
}

