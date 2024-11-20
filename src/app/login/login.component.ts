import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { Firestore, doc, getDoc } from '@angular/fire/firestore';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  user = {
    email: '', // L'email de l'utilisateur pour l'identifiant
    password: '' // Mot de passe pour l'utilisateur
  };

  constructor(private router: Router, private firestore: Firestore) { }

  async onSubmit() {
    try {
      // Référence au document utilisateur dans la collection "user"
      const userDocRef = doc(this.firestore, 'user', this.user.email);
      const docSnap = await getDoc(userDocRef);

      if (docSnap.exists()) {
        // Récupération des données utilisateur
        const userData = docSnap.data();

        // Vérification du mot de passe
        if (userData && userData['password'] === this.user.password) {
          // Stocker l'email dans le sessionStorage pour identifier l'utilisateur
          sessionStorage.setItem('username', this.user.email);

          // Redirection vers la page "terrain"
          this.router.navigate(['/terrain']);
        } else {
          alert('Mot de passe incorrect.');
        }
      } else {
        alert('Utilisateur introuvable. Veuillez vérifier votre email.');
      }
    } catch (error) {
      console.error('Erreur lors de la connexion :', error);
      alert('Une erreur est survenue. Veuillez réessayer plus tard.');
    }
  }
}
