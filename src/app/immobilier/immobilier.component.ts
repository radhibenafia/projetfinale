import { Component, OnInit } from '@angular/core';
import { createClient } from '@supabase/supabase-js';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-immobilier',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './immobilier.component.html',
  styleUrl: './immobilier.component.css'
})
export class ImmobilierComponent implements OnInit {
  private supabaseUrl: string = 'ht';
  private supabaseKey: string = 'V4cCI6MjA0NzMzMjcwNX0.VpAxKP8txqhWEp8SXXuMkVOtnkF_Zq8UZ674IL3Tj5c';

  // Initialisation du client Supabase
  private supabase = createClient(this.supabaseUrl, this.supabaseKey);

  // Liste pour stocker les données récupérées
  radhiData: any[] = [];

  constructor() { }

  ngOnInit(): void {
    this.fetchData();
  }

  // Méthode pour récupérer les données de la table 'radhi'
  async fetchData() {
    try {
      const { data, error } = await this.supabase
        .from('radhi') // Nom de la table
        .select('*'); // Sélectionner toutes les colonnes

      if (error) {
        console.error('Erreur lors de la récupération des données:', error.message);
        return;
      }

      if (data) {
        this.radhiData = data; // Stocker les données récupérées

      }
    } catch (error) {
      console.error('Erreur inattendue:', error);
    }
  }
}

