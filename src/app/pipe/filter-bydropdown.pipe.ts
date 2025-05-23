import { Pipe, PipeTransform } from '@angular/core';
import { EnvelopeData } from '../component/env.interface'; // Import the interface

@Pipe({
  name: 'filterBydropdown',
  standalone: true
})
export class FilterBydropdownPipe implements PipeTransform {

  transform(data: EnvelopeData[], filters: { [key: string]: string | null }): EnvelopeData[] {
    if (!data || !filters) {
      return data;
    }

    // Get the keys from the filters object that have non-null values
    const activeFilters = Object.keys(filters).filter(key => filters[key] !== null);

    if (activeFilters.length === 0) {
      return data; // No active filters, return original data
    }

    return data.filter((item: EnvelopeData) => { // Add type annotation for item
      // Check if the item matches all active filters
      return activeFilters.every(key => {
        // Ensure the item has the property and its value matches the filter value
        // Using 'as any' to explicitly allow dynamic property access
        return (item as any).hasOwnProperty(key) && (item as any)[key] === filters[key];
      });
    });
  }
}
