import { CommonModule } from '@angular/common';
import { Component, computed, EventEmitter, Input, Output, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { heroMagnifyingGlass } from '@ng-icons/heroicons/outline';
import { FilterBydropdownPipe } from '../../pipe/filter-bydropdown.pipe';
import { FilterPipe } from '../../pipe/filter.pipe';

export interface FilterChangeEvent extends Event {
  target: HTMLSelectElement;
}

interface DropdownConfig {
  label: string;
  key: string;
}

@Component({
  selector: 'app-filtersearch',
  standalone: true,
  imports: [CommonModule, FormsModule,NgIcon],
  templateUrl: './filtersearch.component.html',
  styleUrl: './filtersearch.component.css',
  viewProviders:[provideIcons({ heroMagnifyingGlass })]
})
export class FiltersearchComponent {
  @Input() dropdownConfigs: DropdownConfig[] = [];
  @Input() data: any[] = [];
  @Output() filteredDataChange = new EventEmitter<any[]>();
  @Output() searchTermChange = new EventEmitter<string>();

  searchTerm = signal('');
  selectedFilters = signal<{ [key: string]: string | null }>({});

  // Computed signal for unique options
  dynamicUniqueOptions = computed(() => {
    const uniqueOptions: { [key: string]: (string )[] } = {};
    const currentData = this.data;
    const currentFilters = this.selectedFilters();

    this.dropdownConfigs.forEach(config => {
      const filteredData = currentData.filter(item => {
        return Object.keys(currentFilters).every(filterKey => {
          if (filterKey !== config.key && currentFilters[filterKey] !== null) {
            return String(item[filterKey]) === String(currentFilters[filterKey]);
          }
          return true;
        });
      });

      const values = filteredData.map(item => item[config.key]);
      uniqueOptions[config.key] = [...new Set(values)];
    });

    return uniqueOptions;
  });

  // Initialize the component
  ngOnInit() {
    // Initialize filteredData with the full dataset
    this.filteredDataChange.emit(this.data);
  }

  // Computed signal for filtered data
  filteredData = computed(() => {
    const filterPipe = new FilterPipe();
    const filterByDropdownPipe = new FilterBydropdownPipe();

    // First apply the dropdown filters
    let filtered = filterByDropdownPipe.transform(this.data, this.selectedFilters());

    // Then apply the search filter
    filtered = filterPipe.transform(filtered, this.searchTerm());

    // Emit the filtered results
    this.filteredDataChange.emit(filtered);
    return filtered;
  });

  // Remove the filteredData computed signal and use pipes in template instead
  onFilterChange(key: string, event: Event) {
    const selectElement = event.target as HTMLSelectElement;
    const value = selectElement.value;
    this.selectedFilters.update(filters => ({
      ...filters,
      [key]: value === '' ? null : value
    }));
    // Emit the filtered data after filter change
    const filtered = this.data
      .filter(item => {
        return Object.entries(this.selectedFilters()).every(([key, value]) => {
          return value === null || value === '- Select -' || String(item[key]) === String(value);
        });
      })
      .filter(item => {
        const searchTerm = this.searchTerm().toLowerCase().trim();
        return !searchTerm || (item.batchName && item.batchName.toString().toLowerCase().includes(searchTerm));
      });
    this.filteredDataChange.emit(filtered);
  }

  onSearchChange() {
    this.searchTermChange.emit(this.searchTerm());
    // Emit the filtered data after search change
    const filtered = this.data
      .filter(item => {
        return Object.entries(this.selectedFilters()).every(([key, value]) => {
          return value === null || value === '- Select -' || String(item[key]) === String(value);
        });
      })
      .filter(item => {
        const searchTerm = this.searchTerm().toLowerCase().trim();
        return !searchTerm || (item.batchName && item.batchName.toString().toLowerCase().includes(searchTerm));
      });
    this.filteredDataChange.emit(filtered);
  }
}
