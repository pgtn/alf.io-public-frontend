import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Info } from '../model/info';
import { shareReplay } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class InfoService {

  private infoCache: Observable<Info>;

  constructor(private http: HttpClient) { }

  getInfo(): Observable<Info> {
    if (!this.infoCache) {
      this.infoCache = this.http.get<Info>('/api/v2/info').pipe(shareReplay(1));
      setTimeout(() => {
        this.infoCache = null;
      }, 60000 * 10); // clean up cache after 10 minute
    }

    return this.infoCache;
  }
}
