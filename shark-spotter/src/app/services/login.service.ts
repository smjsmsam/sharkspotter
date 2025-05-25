import { Injectable } from '@angular/core';
import { throwError, firstValueFrom } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';


@Injectable({
  providedIn: 'root',
})
export class LoginService{
    constructor(private http: HttpClient) {}

    public async retrieveUser(username: string, password: string): Promise<any> {
        const body = {username, password};
		const response = await firstValueFrom(this.http.post('http://localhost:3000/api/verifyUser', body));
        return response;
	}

    public async createUser(username: string, password: string): Promise<any> {
        const body = {username, password};
		const response = await firstValueFrom(this.http.post('http://localhost:3000/api/insertUser', body));
        return response;
    }

    public async isLoggedIn(): Promise<any> {
        const response = await firstValueFrom(this.http.get('http://localhost:3000/api/userStatus'));
        return response;
    }

    public async logout(): Promise<any> {
        const response = await firstValueFrom(this.http.post('http://localhost:3000/api/userLogout', ""));
        return response;
    }
    
}
