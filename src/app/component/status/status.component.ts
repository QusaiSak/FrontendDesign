import { CommonModule } from '@angular/common';
import { Component, signal } from '@angular/core';
import { TableComponent } from '../table/table.component';

interface StatusData {
  verticalId: string;
  verticalName: string;
  hubId: string;
  hubName: string;
  courseId: string;
  courseName: string;
  catName: string;
  batchId: string;
  batchName: string;
  semester: string;
  examType: string;
  examCatType: string;
  schedule: Date;
  questionPaperStatus: string;
  envelopeReceived: string;
  zipUploadCount: number;
  examinerId: string;
  examinerName: string;
  paperCheckingStatus: string;
}

@Component({
  selector: 'app-status',
  standalone: true,
  imports: [CommonModule, TableComponent],
  templateUrl: './status.component.html',
  styleUrl: './status.component.css'
})
export class StatusComponent {
  filteredData = signal<StatusData[]>([]);
  initialData = signal<StatusData[]>([]);
  isLoading = signal<boolean>(false);

  columns = [
    { key: 'vertical_name', label: 'Vertical Name' },
    { key: 'hubName', label: 'Hub Name' },
    { key: 'courseName', label: 'Course Name' },
    { key: 'catName', label: 'Category Name' },
    { key: 'batch_code', label: 'Batch Name' },
    { key: 'semester', label: 'Semester' },
    { key: 'examType', label: 'Exam Type' },
    { key: 'examCatType', label: 'Exam Category' },
    { key: 'examDate', label: 'Date/Time' },
    { key: 'questionPaperStatus', label: 'Question Paper Status' },
    { key: 'envelopeReceived', label: 'Envelope Received' },
    { key: 'zipUploadCount', label: 'ZIP Upload Count' },
    { key: 'examinerId', label: 'Examiner ID' },
    { key: 'examinerName', label: 'Examiner Name' },
    { key: 'paperCheckingStatus', label: 'Paper Checking Status' }
  ];

  dropdownConfigs = [
    { label: 'Vertical', key: 'vertical_name', idKey: 'verticalId' },
    { label: 'Hub', key: 'hubName', idKey: 'hubId', parentKey: 'vertical_name' },
    { label: 'Course', key: 'courseName', idKey: 'courseId', parentKey: 'hubName' },
    { label: 'Batch', key: 'batch_code', idKey: 'batchId', parentKey: 'courseName' },
    { label: 'Semester', key: 'semesterName', parentKey: 'batch_code' },
    { label: 'Exam Type', key: 'examType', parentKey: 'semesterName' },
    { label: 'Category', key: 'catName', parentKey: 'semesterName' }
  ];



  onFilteredDataChange(event: { data: StatusData[], filters: any, search: string }) {
    if (event && Array.isArray(event.data)) {
      this.filteredData.set(event.data);
    } else {
      this.filteredData.set([]);
    }
  }
}
