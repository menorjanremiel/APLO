import { Component } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { MatButtonModule } from "@angular/material/button";
import { MatDialogRef } from "@angular/material/dialog";
import { Material } from "../../material";
import { component } from "../component";

@Component({
  selector: 'app-feedback-Modal',
  templateUrl: 'feedback.component.html',
  standalone: true,
  imports: [MatButtonModule, FormsModule, Material, component],
})
export class feedbackModal {
  feedbackText: string = ''; // Store the feedback text

  constructor(public dialogRef: MatDialogRef<feedbackModal>) {}

  submitFeedback() {
    const subject = 'Feedback for Gcattend';
    const body = encodeURIComponent(this.feedbackText);
    const mailtoLink = `mailto:gcattend@example.com?subject=${subject}&body=${body}`;
    // Open the mail client with the mailto link
    window.location.href = mailtoLink;
  }
}
