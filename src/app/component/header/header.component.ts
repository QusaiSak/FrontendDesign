import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { TabComponent } from "../tab/tab.component";

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, TabComponent],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  data = [
    {
      name: "Barcode",
      suboption: [
        { name: "Envelope", route: "/envelope" },
        { name: "Batch", route: "/batch" },
        { name: "Student", route: "/student" },
      ]
    },

  ];
}
