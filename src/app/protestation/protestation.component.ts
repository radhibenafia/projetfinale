import { Component } from '@angular/core';
import { Firestore, collection, addDoc, query, where, getDocs, serverTimestamp } from '@angular/fire/firestore';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import emailjs from 'emailjs-com';

@Component({
  selector: 'app-protestation',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './protestation.component.html',
  styleUrls: ['./protestation.component.css']
})
export class ProtestationComponent {
  protestation: string = ''; // Variable pour l'entrée "protestation"
  autre: string = '';        // Variable pour l'entrée "autre"
  username: string | null = sessionStorage.getItem('username'); // Récupération de `username`
  message: string = '';      // Message pour le succès ou l'erreur
  protestationsList: any[] = []; // Liste des protestations récupérées

  constructor(private firestore: Firestore) { }

  // Fonction pour soumettre une nouvelle protestation
  async submitProtestation() {
    if (this.username && this.protestation && this.autre) {
      try {
        // Référence à la collection `protestation`
        const protestationRef = collection(this.firestore, 'protestation');

        // Ajout du document
        await addDoc(protestationRef, {
          protestation: this.protestation,
          autre: this.autre,
          username: this.username,
          timestamp: serverTimestamp()
        });

        // Réinitialiser les champs et afficher un message de succès
        this.protestation = '';
        this.autre = '';
        this.message = 'Protestation ajoutée avec succès !';
      } catch (error) {
        console.error('Erreur lors de l’ajout de la protestation :', error);
        this.message = 'Une erreur est survenue. Veuillez réessayer.';
      }
    } else {
      this.message = 'Veuillez remplir tous les champs.';
    }
  }

  // Nouvelle fonction pour afficher les protestations de l'utilisateur
  async displayProtestations() {
    if (this.username) {
      try {
        // Référence à la collection `protestation`
        const protestationRef = collection(this.firestore, 'protestation');

        // Créez une requête pour récupérer les protestations où `username` est égal à l'utilisateur courant
        const q = query(protestationRef, where('username', '==', this.username));

        // Exécutez la requête
        const querySnapshot = await getDocs(q);

        // Remplir la liste des protestations
        this.protestationsList = [];
        querySnapshot.forEach((doc) => {
          this.protestationsList.push(doc.data());
        });
      } catch (error) {
        console.error('Erreur lors de la récupération des protestations :', error);
        this.message = 'Une erreur est survenue. Veuillez réessayer.';
      }
    } else {
      this.message = 'Utilisateur non connecté.';
    }
  }
  // Fonction pour envoyer un e-mail
  sendEmail() {
    if (this.username) {
      console.log('Envoi de l\'e-mail à:', this.username);

      // Paramètres pour le modèle EmailJS
      const templateParams = {
        to: this.username,                    // Destinataire, l'utilisateur courant
        message: 'Attestation acceptée'       // Le message à envoyer
      };

      const userId = 'kQSq5j-V8Qx8J_2Bu'; // Votre `user_id` EmailJS

      // Envoi de l'email via EmailJS
      emailjs.send('service_tmjcug2', 'template_47vjb9e', templateParams, userId)
        .then((response) => {
          console.log('Email envoyé avec succès:', response);
          this.message = 'L\'email a été envoyé avec succès !';
        })
        .catch((error) => {
          console.error('Erreur lors de l\'envoi de l\'email:', error);
          this.message = 'Une erreur est survenue lors de l\'envoi de l\'email.';
        });
    } else {
      this.message = 'Utilisateur non connecté, impossible d\'envoyer l\'email.';
    }
  }
}
