import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AuctionType } from '../../models/auction-type/auction-type';

const BASE_URL = environment.BASE_URL;

@Injectable({
  providedIn: 'root',
})
export class AuctionTypeService {
  constructor(private http: HttpClient) {}

  getAuctionTypes = (
    pageNumber?: number,
    pageSize?: number
  ): Observable<any> => {
    const params = new HttpParams()
      .append('page', `${pageNumber}`)
      .append('size', `${pageSize}`);
    return this.http.get<any>(`${BASE_URL}/auction-types`, { params: params });
  };

  createAuctionType = (auctionType: any): Observable<any> => {
    return this.http.post<any>(`${BASE_URL}/auction-types`, { ...auctionType });
  };

  getAuctionType = (auctionTypeId: number): Observable<AuctionType> => {
    return this.http.get<AuctionType>(
      `${BASE_URL}/auction-types/${auctionTypeId}`
    );
  };

  updateAuctionType = (
    auctionTypeId: number,
    auctionType: AuctionType
  ): Observable<any> => {
    return this.http.put<AuctionType>(
      `${BASE_URL}/auction-types/${auctionTypeId}`,
      auctionType
    );
  };
}
