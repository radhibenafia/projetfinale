import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';

// Définir l'interface ApiData en fonction de la réponse de l'API
interface ApiData {
  title: string;
  description: string;
  resources: {
    title: string;
    description: string;
    url: string;
    format: string;
  }[];
  organization: {
    name: string;
    logo: string;
    page: string;
  };
  tags: string[];
}

@Component({
  selector: 'app-second',
  standalone: true,
  imports: [HttpClientModule, CommonModule],
  templateUrl: './second.component.html',
  styleUrls: ['./second.component.css']
})
export class SecondComponent implements OnInit {
  apiData: ApiData | null = null;  // Ce sera utilisé pour stocker les données API
  isLoading: boolean = true;  // Indicateur de chargement
  errorMessage: string = '';  // Message d'erreur en cas d'échec de la requête

  constructor(private http: HttpClient) { }

  ngOnInit() {
    // Effectuer une requête HTTP GET vers l'API
    this.http.get<ApiData>('https://www.data.gouv.fr/api/1/datasets/tournee-de-collecte-2024-des-dechets/')
      .subscribe({
        next: (data) => {
          console.log('Data from API:', data);  // Log des données reçues de l'API
          this.apiData = data;  // Assigner les données à apiData
          this.isLoading = false;  // Changer l'état du chargement
        },
        error: (err) => {
          console.error('Erreur lors du chargement des données', err);  // Log des erreurs
          this.errorMessage = 'Erreur lors du chargement des données';  // Définir le message d'erreur
          this.isLoading = false;  // Changer l'état du chargement
        }
      });
  }
}
