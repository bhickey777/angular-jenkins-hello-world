import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { MarketCard } from '../market-card/market-card';

@Component({
  selector: 'app-home',
  imports: [
    RouterLink, 
    RouterLinkActive, 
    MarketCard
  ],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class Home {}
