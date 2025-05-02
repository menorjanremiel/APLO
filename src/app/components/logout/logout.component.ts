import { Component } from "@angular/core";
import { MatButtonModule } from "@angular/material/button";
import { MatDialogRef } from "@angular/material/dialog";
import { Material } from "../../material";
import { SessionService } from "../../services/session.service";
import { component } from "../component";
import { Router } from "@angular/router";

@Component({
  selector: 'app-logout-Modal',
  templateUrl: 'logout.component.html',
  standalone: true,
  imports: [MatButtonModule, Material, component],
})
export class logoutModal {
  constructor(
    public dialogRef: MatDialogRef<logoutModal>,
    private route: Router,
    private sessionService: SessionService
  ) {}
  logout() {
    this.sessionService.deleteData();
    this.route.navigate(['admin/login']);
  }
}
