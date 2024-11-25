import { Component, OnInit } from '@angular/core';
import { inject } from '@angular/core';
import { Firestore, collection, getDocs, addDoc, getFirestore } from 'firebase/firestore';
import { initializeApp } from 'firebase/app'; // Importez la fonction d'initialisation de Firebase
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

// Configuration Firebase
const firebaseConfig = {
 
};

@Component({
  selector: 'app-terrain',
  standalone: true,
  imports: [CommonModule],  // Import des modules Angular nécessaires
  templateUrl: './terrain.component.html',
  styleUrls: ['./terrain.component.css']
})
export class TerrainComponent implements OnInit {
  expandedCardIndex: number | null = null;
  terrains: any[] = [];
  newTerrain = {
    nom: '',
    localisation: '',
    prix: 0,
    description: '',
  };
  username: string | null = null;
  private firestore: Firestore;

  constructor(private router: Router) {
    // Initialiser Firebase avec la configuration donnée
    const app = initializeApp(firebaseConfig);
    this.firestore = getFirestore(app);  // Utilisation de Firestore à partir de l'app initialisée
  }

  ngOnInit(): void {
    this.username = sessionStorage.getItem('username');

    // Récupérer les terrains lors du chargement du composant
    this.fetchTerrains();
  }

  // Récupérer les terrains depuis Firestore
  fetchTerrains(): void {
    const terrainsCollection = collection(this.firestore, 'terrains');
    getDocs(terrainsCollection)
      .then((querySnapshot) => {
        this.terrains = querySnapshot.docs.map((doc) => doc.data());
      })
      .catch((error) => {
        console.error('Erreur lors de la récupération des terrains :', error);
      });
  }
  toggleExpansion(index: number): void {
    if (this.expandedCardIndex === index) {
      this.expandedCardIndex = null;  // Si la carte est déjà agrandie, on la réduit
    } else {
      this.expandedCardIndex = index;  // Agrandir la carte
    }
  }
  navigateTo(route: string): void {
    this.router.navigate([route]);
  }
  isActive(route: string): boolean {
    return this.router.url.includes(route);
  }

}
