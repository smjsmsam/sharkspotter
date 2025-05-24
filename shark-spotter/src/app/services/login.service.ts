import { Injectable } from '@angular/core';
import { throwError, firstValueFrom } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';


@Injectable({
  providedIn: 'root',
})
export class LoginService{
    constructor(private http: HttpClient) {}

    public async retrieveUser(email: string, password: string): Promise<any> {
        const body = {email, password};
		//const params = new HttpParams().set('email', email).set('password', password);
		const response = await firstValueFrom(this.http.post('http://localhost:3000/api/verifyUser', body));
        return response;
	}
}
