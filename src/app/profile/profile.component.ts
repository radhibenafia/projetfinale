import { Component, OnInit } from '@angular/core';
import { Firestore, doc, getDoc } from '@angular/fire/firestore';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent implements OnInit {
  username: string | null = '';
  userData: any = null; // Stocke les données utilisateur

  constructor(private firestore: Firestore) { }

  async ngOnInit() {
    // Récupération de la variable "username" depuis sessionStorage
    this.username = sessionStorage.getItem('username');

    if (this.username) {
      try {
        // Référence au document utilisateur
        const userDocRef = doc(this.firestore, 'user', this.username);
        const docSnap = await getDoc(userDocRef);

        if (docSnap.exists()) {
          // Stocke les données utilisateur
          this.userData = docSnap.data();
        } else {
          console.error('Document utilisateur introuvable.');
        }
      } catch (error) {
        console.error('Erreur lors de la récupération des données utilisateur :', error);
      }
    } else {
      console.error('Aucun "username" trouvé dans le sessionStorage.');
    }
  }
}
