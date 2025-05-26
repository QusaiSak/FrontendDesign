import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { heroArrowLeftEndOnRectangle } from '@ng-icons/heroicons/outline';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule,NgIcon],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  viewProviders: [provideIcons({ heroArrowLeftEndOnRectangle })]
})
export class HeaderComponent {

}
