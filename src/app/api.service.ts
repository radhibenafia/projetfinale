// api.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private apiUrl = 'https://www.data.gouv.fr/api/1/datasets/tournee-de-collecte-2024-des-dechets/';  // L'URL de l'API

  constructor(private http: HttpClient) { }

  // Méthode pour obtenir les données depuis l'API
  getData(): Observable<any> {
    return this.http.get(this.apiUrl);
  }
}
