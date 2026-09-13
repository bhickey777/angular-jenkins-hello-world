import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: "app-menu-bar",
   imports: [
    RouterLink,
    RouterLinkActive
  ],
  templateUrl: "./menu-bar.html",
  styleUrl: "./menu-bar.css",
})
export class MenuBar {}

