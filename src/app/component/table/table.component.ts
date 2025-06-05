import { CommonModule } from '@angular/common';
import { Component, computed, EventEmitter, Input, Output, signal } from '@angular/core';
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
  @Input() set data(value: any[]) {
    this.tableData.set(value || []);
  }
  @Input() title: TitleItem[] = [];
  @Input() maxHeight?: string;
  @Input() minWidth?: string = '150px';
  @Output() rowClick = new EventEmitter<any>();
  @Input() columns: any[] = [];
  @Output() actionClicked = new EventEmitter<{action: string, item: any}>();

  tableData = signal<any[]>([]);
  showTable = signal<boolean>(false);

  hasData = computed(() => this.tableData().length > 0);

  onRowClick(item: any) {
    this.rowClick.emit(item);
  }

  // Helper method to identify action columns
  isActionColumn(key: string): boolean {
    return key === 'download' || key === 'view';
  }

  // Method to handle click on action buttons
  onActionClick(item: any, columnKey: string, event: Event): void {
    event.preventDefault();
    this.actionClicked.emit({ action: columnKey, item });
  }

  // Add this method to handle filter changes
  onFilterChange() {
    this.showTable.set(true);
  }
}
