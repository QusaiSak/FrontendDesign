import { CommonModule } from '@angular/common';
import { Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { heroBars3 , heroArrowLeft} from '@ng-icons/heroicons/outline';

@Component({
  selector: 'app-tab',
  standalone: true,
  imports: [CommonModule, RouterLink ,NgIcon],
  templateUrl: './tab.component.html',
  styleUrl: './tab.component.css',
  viewProviders: [provideIcons({ heroBars3 , heroArrowLeft })]
})
export class TabComponent {
  Data = input<Array<{ name: string;routes:string ; suboption: Array<{ name: string; route: string }> }>>([]);

  selectedItem: string = '';
  selectedMainItem: string | null = null;

  // Only one active item at a time (This seems to be for the external display, which we will remove)
  // activeItem: { name: string; routes:string ; suboption: Array<{ name: string; route: string }> } | null = null;

  isDropdownOpen = false;
  openAccordionItem: string | null = null; // Add this property to track open accordion item

  selectMainItem(item: { name: string; routes:string ; suboption: Array<{ name: string; route: string }> }) {
    // Toggle accordion for items with suboptions
    if (item.suboption && item.suboption.length) {
      if (this.openAccordionItem === item.name) {
        this.openAccordionItem = null; // Close if already open
      } else {
        this.openAccordionItem = item.name; // Open the clicked item
      }
      this.selectedMainItem = item.name; // Keep main item highlighted
    } else {
      // If no suboptions, navigate and close dropdown/accordion
      this.openAccordionItem = null; // Close accordion
      this.selectSubItem(item.name); // Navigate to the item's route
      this.selectedMainItem = null; // Deselect main item if it doesn't have suboptions
    }
    // Keep the main dropdown open when selecting a main item with suboptions
    if (!item.suboption || item.suboption.length === 0) {
       this.isDropdownOpen = false; // Close main dropdown only if no suboptions
    }
  }

  selectSubItem(name: string) {
    this.selectedItem = name;
    this.isDropdownOpen = false; // Close main dropdown
    this.openAccordionItem = null; // Close accordion
  }

  toggleDropdown() {
    this.isDropdownOpen = !this.isDropdownOpen;
    if (!this.isDropdownOpen) {
      this.openAccordionItem = null; // Close accordion when main dropdown closes
    }
  }

  closeDropdown() {
    this.isDropdownOpen = false;
    this.openAccordionItem = null; // Close accordion when main dropdown closes
  }
}
