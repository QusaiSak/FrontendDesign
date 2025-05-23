import { Pipe, PipeTransform } from '@angular/core';
import { EnvelopeData } from '../component/env.interface';

@Pipe({
  name: 'filter',
  standalone: true
})
export class FilterPipe implements PipeTransform {

  transform(Product:EnvelopeData[], searchItem: string): EnvelopeData[] {
    if (!searchItem) {
      return Product;
    }
    searchItem = searchItem.toLowerCase();
    return Product.filter((item: EnvelopeData) => {
      return item.batchName?.toLowerCase().includes(searchItem);
    });
  }

}
