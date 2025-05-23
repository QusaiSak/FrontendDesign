import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter',
  standalone: true
})
export class FilterPipe implements PipeTransform {
  transform<T>(items: T[], searchText: string): T[] {
    if (!items || !searchText) {
      return items;
    }

    searchText = searchText.toLowerCase();
    return items.filter(item =>
      Object.values(item as object)
        .some(value =>
          value?.toString().toLowerCase().includes(searchText)
        )
    );
  }
}
