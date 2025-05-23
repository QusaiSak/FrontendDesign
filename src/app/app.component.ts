import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { initFlowbite } from 'flowbite';
import { HeaderComponent } from "./component/header/header.component";
import { TabComponent } from "./component/tab/tab.component";
@Component({
  selector: 'app-root',
  imports: [RouterOutlet, HeaderComponent, TabComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  title = 'concepts';
  ngOnInit(): void {
    initFlowbite();
  }

  data : any[] = [
    {
      name: "Barcode",
      routes: "/envelope",
      suboption: [
        { name: "Envelope", route: "/envelope" },
        { name: "Batch", route: "/batch" },
        { name: "Student", route: "/student" },
      ]
    },
    {
      name: "Status",
      routes: "/status",
      suboption:[]
    },

  ];
}
