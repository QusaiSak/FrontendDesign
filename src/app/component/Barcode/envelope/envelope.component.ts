import { CommonModule } from '@angular/common';
import { Component, computed, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { FilterBydropdownPipe } from '../../../pipe/filter-bydropdown.pipe';
import { FilterPipe } from '../../../pipe/filter.pipe';
 // Import the new pipe


@Component({
  selector: 'app-envelope',
  standalone: true,
  imports: [CommonModule, FormsModule, FilterPipe, FilterBydropdownPipe], // Add the new pipe here
  templateUrl: './envelope.component.html',
  styleUrl: './envelope.component.css'
})
export class EnvelopeComponent {
  searchTerm = signal('');
  data = signal<any[]>([
    {
      verticalName: 'Healthcare - HC',
      hubName: 'Iqraa Academy of Iqraa International Hospital and Research Centre - HC0421',
      courseName: 'BSc In Dialysis Technology - HCC193',
      batchName: 'HC0421/C193/B02/S25',
      semester: '1',
      examType: 'Main',
      view: 'View'
    },
    {
      verticalName: 'Healthcare - HC',
      hubName: 'Iqraa Academy of Iqraa International Hospital and Research Centre - HC0421',
      courseName: 'BSc In Dialysis Technology - HCC193',
      batchName: 'HC0421/C193/B02/S25',
      semester: '1',
      examType: 'Supplementary 1',
      view: 'View'
    },
     { // Added another sample data point with different values
      verticalName: 'Engineering',
      hubName: 'Tech University Hub',
      courseName: 'B.Tech Computer Science',
      batchName: 'TU/CS/B01/S25',
      semester: '2',
      examType: 'Main',
      view: 'View'
    }
  ]);

  // Define the configuration for your dropdowns
  dropdownConfigs: any[] = [
    { label: 'Vertical', key: 'verticalName' },
    { label: 'Hub', key: 'hubName' },
    { label: 'Course', key: 'courseName' },
    { label: 'Batch', key: 'batchName' },
    { label: 'Semester', key: 'semester' },
    { label: 'Exam Type', key: 'examType' },
    // Add configurations for any other properties you want dropdowns for
  ];

  // Signal to hold selected filter values dynamically
  selectedFilters = signal<{ [key: string]: string | null }>({});

  // Computed signal to generate unique options dynamically based on configs and other selected filters
  dynamicUniqueOptions = computed(() => {
    const uniqueOptions: { [key: string]: (string | number)[] } = {};
    const currentData = this.data();
    const currentFilters = this.selectedFilters();

    this.dropdownConfigs.forEach(config => {
      // Filter the data based on *other* selected filters
      const filteredData = currentData.filter(item => {
        return Object.keys(currentFilters).every(filterKey => {
          // Apply filter only if it's not the current dropdown's key and has a value
          if (filterKey !== config.key && currentFilters[filterKey] !== null) {
            return (item as any)[filterKey] === currentFilters[filterKey];
          }
          return true; // Don't filter by the current dropdown's key or if filter is null
        });
      });

      // Get unique values for the current dropdown's key from the filtered data
      const values = filteredData.map(item => (item as any)[config.key]);
      uniqueOptions[config.key] = [...new Set(values)];
    });

    return uniqueOptions;
  });

  // Computed signal for the combined filters (used for the table)
  currentFilters = this.selectedFilters.asReadonly();

  // Method to update a specific filter value
  onFilterChange(key: string, event: Event) {
    const value = (event.target as HTMLSelectElement).value;
    // Set to null if the "- Select -" option is chosen
    this.selectedFilters.update(filters => ({
      ...filters,
      [key]: value === '- Select -' ? null : value
    }));
  }
}
