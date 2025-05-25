import { Injectable } from '@angular/core';
import { throwError, firstValueFrom } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';


@Injectable({
  providedIn: 'root',
})
export class ReportService {
    constructor(private http: HttpClient) {}

    public async retrieveCommunityReports(): Promise<any> {
		  const response = await firstValueFrom(this.http.get('http://localhost:3000/api/retrieveCommunityReports'));
      console.log("Retrieve Community Reports Response: " + response);
      return response;
	  }

    public async retrieveUserReports(): Promise<any> {
      const response = await firstValueFrom(this.http.get('http://localhost:3000/api/retrieveUserReports'));
      console.log("Retrieve Community Reports Response: " + response);
      return response;
    }

    public async addReport(report: JSON): Promise<any> {
      const response = await firstValueFrom(this.http.post('http://localhost:3000/api/addReport', report));
      return response;
    }

    public async getMarker(markerID: number): Promise<any> {
      const params = new HttpParams().set("markerID", markerID);
      const response = await firstValueFrom(this.http.get('http://localhost:3000/api/getMarker', {params: params}));
      return response;
    }
    
}