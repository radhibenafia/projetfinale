import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { createClient } from '@supabase/supabase-js';
import { CommonModule } from '@angular/common';  // Importation nécessaire pour utiliser ngModel
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-ajout',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './ajout.component.html',
  styleUrl: './ajout.component.css'
})
export class AjoutComponent implements OnInit {
  // Modèle pour un terrain avec id, nom, et prénom
  newTerrain = {
    id: null,
    owner: '',
    nom: '',
    place: '',
    superficie: null,
    statut: '', // Nouveau champ statut
    description: ''
  };
  newImage = {
    image: null,  // L'image sélectionnée sera stockée ici
    nomImage: ''  // Le nom de l'image
  };
  username: string | null = null;

  // URL et clé API Supabase
  private supabaseUrl: string = 'https://atposvzwfeniczedypwu.supabase.co';
  private supabaseKey: string = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImF0cG9zdnp3ZmVuaWN6ZWR5cHd1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzE3NTY3MDUsImV4cCI6MjA0NzMzMjcwNX0.VpAxKP8txqhWEp8SXXuMkVOtnkF_Zq8UZ674IL3Tj5c';

  // Initialisation du client Supabase
  private supabase = createClient(this.supabaseUrl, this.supabaseKey);

  constructor() { }

  ngOnInit(): void {
    // Initialisation si nécessaire
    this.username = sessionStorage.getItem('username');
  }
  onImageChange(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.newImage.image = file;
      this.newImage.nomImage = file.name;  // Le nom de l'image est enregistré
    }
  }

  // Méthode appelée lors de la soumission du formulaire d'image
  async onUploadImage() {
    if (!this.newImage.image || !this.newImage.nomImage) {
      alert('Veuillez saisir un nom d\'image et sélectionner une image.');
      return;
    }

    try {
      // Utilisation du nom d'utilisateur comme dossier
      const userFolder = this.username; // Nom de dossier basé sur l'utilisateur
      const imagePath = `${userFolder}/${this.newImage.nomImage}`; // Chemin d'accès avec le nom du dossier

      // Upload de l'image dans le dossier spécifique de l'utilisateur dans le bucket "radhifichier"
      const { data, error } = await this.supabase
        .storage
        .from('radhifichier')
        .upload(imagePath, this.newImage.image); // Utilisation du chemin avec le dossier spécifique à l'utilisateur

      if (error) {
        console.error('Erreur lors de l\'upload de l\'image:', error.message);
        alert('Erreur lors de l\'upload de l\'image');
        return;
      }

      // Récupérer l'URL publique de l'image
      const imageUrl = `https://atposvzwfeniczedypwu.supabase.co/storage/v1/object/public/radhifichier/${imagePath}`;

      alert('Image téléchargée avec succès!');
      console.log('Image téléchargée:', data);

      // Réinitialiser les champs après l'ajout
      this.newImage = { image: null, nomImage: '' };
    } catch (error) {
      console.error('Erreur dans le processus d\'upload:', error);
      alert('Erreur dans le processus d\'upload');
    }
  }



  // Méthode appelée lors de la soumission du formulaire
  async onSubmit() {
    try {
      const { data, error } = await this.supabase
        .from('radhi') // Nom de la table dans Supabase
        .insert([{
          nom: this.newTerrain.nom,
          owner: this.username,
          place: this.newTerrain.place,
          superficie: this.newTerrain.superficie,
          statut: this.newTerrain.statut,
          description: this.newTerrain.description
        }]);

      if (error) {
        console.error('Erreur lors de l\'ajout du terrain:', error.message);
        alert('Erreur lors de l\'ajout du terrain');
      } else {
        alert('Terrain ajouté avec succès!');
        console.log('Données ajoutées:', data);
        this.newTerrain = { id: null, nom: '', place: '', superficie: null, statut: '', description: '', owner: '' };
      }
    } catch (error) {
      console.error('Erreur dans le processus d\'ajout:', error);
      alert('Erreur dans le processus d\'ajout');
    }
  }
}
