import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, setDoc, doc, getDoc } from 'firebase/firestore';

// Configuration Firebase
const firebaseConfig = {
}

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {
  user = {
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  };

  private firestore = getFirestore(initializeApp(firebaseConfig));

  constructor(private router: Router) { }

  // Méthode pour soumettre les données à Firestore
  async onSubmit() {
    if (this.user.password !== this.user.confirmPassword) {
      alert("Les mots de passe ne correspondent pas.");
      return;
    }

    try {
      const userDocRef = doc(this.firestore, 'user', this.user.email);

      // Vérifie si le document existe déjà
      const docSnap = await getDoc(userDocRef);
      if (docSnap.exists()) {
        alert("Cet email est déjà utilisé. Veuillez utiliser un autre email.");
        return;
      }

      // Si le document n'existe pas, continuez avec l'ajout
      await setDoc(userDocRef, {
        username: this.user.username,
        email: this.user.email,
        password: this.user.password // Note : Ne stockez pas de mots de passe en clair en production
      });

      console.log('Utilisateur ajouté avec succès !');
      this.router.navigate(['/success']); // Redirige vers une page de succès si nécessaire
    } catch (error) {
      console.error("Erreur lors de l'ajout de l'utilisateur :", error);
    }
  }

  navigateTo(route: string) {
    this.router.navigate([route]);
  }

  isActive(route: string): boolean {
    return this.router.url.includes(route);
  }
}
