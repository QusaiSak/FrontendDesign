import { CommonModule } from '@angular/common';
import { Component, computed, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { FilterBydropdownPipe } from '../../pipe/filter-bydropdown.pipe';
import { FilterPipe } from '../../pipe/filter.pipe';
import { StatusData, TitleItem } from '../env.interface';


@Component({
  selector: 'app-status',
  imports: [CommonModule, FormsModule, FilterPipe, FilterBydropdownPipe],
  templateUrl: './status.component.html',
  styleUrl: './status.component.css'
})
export class StatusComponent {
  searchTerm = signal('');
  dataSt = signal<StatusData[]>([
    {
      verticalName: 'Healthcare - HC',
      hubName: 'Sterling College of Paramedical Education (Unit of Amiya Medical Education Trust) - HC0467',
      courseName: 'BSc in Medical Laboratory Technology - HCC167',
      catName: 'Functional English - GEA 1.1 - 15683',
      batchName: 'HC0346/C167/B01/S25',
      semester: '1',
      examType: 'Main',
      examCatType: 'Written/Online',
      schedule: new Date('2024-01-12T15:30:00'),
      questionPaperStatus: 'Uploaded',
      envelopeReceived: 'Yes',
      zipUploadCount: 40,
      examinerId: 'EXM1001',
      examinerName: 'Dr. A. Sharma',
      paperCheckingStatus: '0/40'
    },
    {
      verticalName: 'Healthcare - HC',
      hubName: 'Sterling College of Paramedical Education (Unit of Amiya Medical Education Trust) - HC0467',
      courseName: 'BSc in Medical Laboratory Technology - HCC167',
      catName: 'Computing Skills and Digital Literacy - GEA 1.2 - 15684',
      batchName: 'HC0346/C167/B01/S25',
      semester: '1',
      examType: 'Main',
      examCatType: 'Project',
      schedule: new Date('2024-01-15T11:00:00'),
      questionPaperStatus: 'Pending',
      envelopeReceived: 'No',
      zipUploadCount: 0,
      examinerId: 'EXM1002',
      examinerName: 'Prof. R. Gupta',
      paperCheckingStatus: '0/40'
    },
    {
      verticalName: 'Healthcare - HC',
      hubName: 'Sterling College of Paramedical Education (Unit of Amiya Medical Education Trust) - HC0467',
      courseName: 'BSc in Medical Laboratory Technology - HCC167',
      catName: 'Anatomy I - MLT 1.1 - 15685',
      batchName: 'HC0346/C167/B01/S25',
      semester: '1',
      examType: 'Main',
      examCatType: 'Written/Online',
      schedule: new Date('2024-01-12T10:00:00'),
      questionPaperStatus: 'Uploaded',
      envelopeReceived: 'Yes',
      zipUploadCount: 35,
      examinerId: 'EXM1003',
      examinerName: 'Dr. S. Verma',
      paperCheckingStatus: '5/40'
    },
    {
      verticalName: 'Healthcare - HC',
      hubName: 'Sterling College of Paramedical Education (Unit of Amiya Medical Education Trust) - HC0467',
      courseName: 'BSc in Medical Laboratory Technology - HCC167',
      catName: 'Physiology I and Laboratory Skills I - MLT 1.2 - 15686',
      batchName: 'HC0346/C167/B01/S25',
      semester: '1',
      examType: 'Main',
      examCatType: 'Written/Online',
      schedule: new Date('2024-01-20T10:00:00'),
      questionPaperStatus: 'Uploaded',
      envelopeReceived: 'Yes',
      zipUploadCount: 40,
      examinerId: 'EXM1004',
      examinerName: 'Dr. M. Khan',
      paperCheckingStatus: '10/40'
    },
    {
      verticalName: 'Healthcare - HC',
      hubName: 'Sterling College of Paramedical Education (Unit of Amiya Medical Education Trust) - HC0467',
      courseName: 'BSc in Medical Laboratory Technology - HCC167',
      catName: 'Soft Training - MT 1.3T - 15688',
      batchName: 'HC0346/C167/B01/S25',
      semester: '1',
      examType: 'Main',
      examCatType: 'Practical',
      schedule: new Date('2024-01-20T10:00:00'),
      questionPaperStatus: 'Pending',
      envelopeReceived: 'No',
      zipUploadCount: 0,
      examinerId: 'EXM1005',
      examinerName: 'Ms. T. Roy',
      paperCheckingStatus: '0/40'
    }
  ]);


  title: TitleItem[] = [
    { key: 'verticalName', label: 'Vertical Name' },
    { key: 'hubName', label: 'Hub Name' },
    { key: 'courseName', label: 'Course Name' },
    { key: 'catName', label: 'Category Name' },
    { key: 'batchName', label: 'Batch Name' },
    { key: 'semester', label: 'Semester' },
    { key: 'examType', label: 'Exam Type' },
    { key: 'examCatType', label: 'Exam Category' },
    { key: 'schedule', label: 'Date/Time' },
    { key: 'questionPaperStatus', label: 'Question Paper Status ' },
    { key: 'envelopeReceived', label: 'Envelope Received' },
    { key: 'zipUploadCount', label: 'ZIP Upload Count' },
    { key: 'examinerId', label: 'Examiner ID' },
    { key: 'examinerName', label: 'Examiner Name' },
    { key: 'paperCheckingStatus', label: 'Paper Checking Status' }
  ];


  dropdownConfigs: any[] = [
    { label: 'Vertical', key: 'verticalName' },
    { label: 'Hub', key: 'hubName' },
    { label: 'Course', key: 'courseName' },
    { label: 'Batch', key: 'batchName' },
    { label: 'Semester', key: 'semester' },
    { label: 'Category', key: 'catName' },
    { label: 'Exam Type', key: 'examType' },
    { label: 'Exam Category', key: 'examCatType' },
    { label: 'Question Paper Status', key: 'questionPaperStatus' },
    { label: 'Envelope Received', key: 'envelopeReceived' },
    { label: 'Examiner Name', key: 'examinerName' },
    { label: 'Examiner ID', key: 'examinerId' }
  ];


  // Signal to hold selected filter values dynamically
  selectedFilters = signal<{ [key: string]: string | null }>({});

  // Computed signal to generate unique options dynamically based on configs and other selected filters
  dynamicUniqueOptions = computed(() => {
    const uniqueOptions: { [key: string]: (string | number)[] } = {};
    const currentData = this.dataSt();
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
