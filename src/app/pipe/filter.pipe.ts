import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter',
  standalone: true
})
export class FilterPipe implements PipeTransform {
  transform(items: any[], searchText: string): any[] {
    if (!items) {
      return [];
    }
    if (!searchText) {
      return items;
    }

    searchText = searchText.toLowerCase();

    // Filter items based on batchName only
    return items.filter(item =>
      item.batchName && item.batchName.toString().toLowerCase().includes(searchText)
    );
  }
}
