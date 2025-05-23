import { Pipe, PipeTransform } from '@angular/core';

// Define a base interface for common properties

@Pipe({
  name: 'filterBydropdown',
  standalone: true
})
export class FilterBydropdownPipe implements PipeTransform {
  transform(data: any[], filters: { [key: string]: string | null }): any[] {
    if (!data || !filters) {
      return data;
    }

    // Get the keys from the filters object that have non-null values
    const activeFilters = Object.entries(filters)
      .filter(([_, value]) => value !== null && value !== '- Select -')
      .map(([key]) => key);

    if (activeFilters.length === 0) {
      return data; // No active filters, return original data
    }

    return data.filter(item =>
      activeFilters.every(key =>
        item[key] === filters[key]
      )
    );
  }
}
