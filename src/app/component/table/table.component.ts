import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { TitleItem } from '../env.interface';

@Component({
  selector: 'app-table',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './table.component.html',
  styleUrl: './table.component.css'
})
export class TableComponent {
  @Input() cellPadding: string = 'px-4 py-2';
  @Input() cellMargin: string = 'm-0';
  @Input() data: any[] = [];
  @Input() title: TitleItem[] = [];
  @Input() maxHeight?: string;
  @Input() minWidth?: string = '150px';
  @Output() rowClick = new EventEmitter<any>();

  onRowClick(item: any) {
    this.rowClick.emit(item);
  }

  // Add this helper method
  isLinkColumn(key: string): boolean {
    return key === 'download' || key === 'view';
  }
}
