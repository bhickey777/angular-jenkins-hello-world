import { Component } from "@angular/core";
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: "help",
  imports: [
    RouterLink,
    RouterLinkActive
  ],
  templateUrl: "./app-help.html",
  styleUrl: "./app-help.css",
})
export class AppHelp {}
