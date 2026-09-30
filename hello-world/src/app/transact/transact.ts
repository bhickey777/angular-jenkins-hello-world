import { Component } from "@angular/core";
import { Trades } from "../trades/trades";

@Component({
  selector: "app-transact",
  imports: [Trades],
  templateUrl: "./transact.html",
  styleUrl: "./transact.css",
})
export class Transact {
  constructor() {}
}
