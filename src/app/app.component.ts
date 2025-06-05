import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { environment } from '../environments/environment';
import { HeaderComponent } from "./component/NavbarComponents/header/header.component";
import { TabComponent } from "./component/NavbarComponents/tab/tab.component";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, HeaderComponent, TabComponent, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'concepts';
  isLoginPage = false;
  version = environment.version;


  constructor(private router: Router) {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.isLoginPage = event.url === '/login';
      }
    });
  }

  data: any[] = [
    {
      name: "Barcode",
      routes: "/envelope",
      suboption: [
        { name: "Envelop Schedule Report", route: "/envelope" },
        { name: "Batch barcode Excel", route: "/batch" },
        { name: "Student barcode Excel", route: "/student" },
      ]
    },
    {
      name: "Post Exam",
      routes: "/upload",
      suboption:[
        { name: "Upload Zip", route: "/upload" },
        { name: "Status" , route: "/status" },
        { name: "Examinar Change" , route: "/exam" },
      ]
    },

  ];
}
