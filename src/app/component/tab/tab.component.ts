import { CommonModule } from '@angular/common';
import { Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-tab',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './tab.component.html',
  styleUrl: './tab.component.css'
})
export class TabComponent {
  Data = input<Array<{ name: string; suboption: Array<{ name: string; route: string }> }>>([]);

  selectedItem: string = '';
  selectedMainItem: string | null = null;

  // Only one active item at a time
  activeItem: { name: string; suboption: Array<{ name: string; route: string }> } | null = null;

  isDropdownOpen = false;

  selectMainItem(item: { name: string; suboption: Array<{ name: string; route: string }> }) {
    if (item.suboption && item.suboption.length) {
      this.activeItem = item;
      this.selectedMainItem = item.name;
    } else {
      this.activeItem = null;
      this.selectSubItem(item.name);
    }
    this.isDropdownOpen = false;
  }

  selectSubItem(name: string) {
    this.selectedItem = name;
    this.isDropdownOpen = false;
  }

  toggleDropdown() {
    this.isDropdownOpen = !this.isDropdownOpen;
  }

  closeDropdown() {
    this.isDropdownOpen = false;
  }
}
