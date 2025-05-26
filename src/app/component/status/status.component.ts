import { CommonModule } from '@angular/common';
import { Component, computed, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { StatusData, TitleItem } from '../env.interface';
import { FiltersearchComponent } from '../filtersearch/filtersearch.component';
import { TableComponent } from '../table/table.component';

@Component({
  selector: 'app-status',
  standalone: true,
  imports: [CommonModule, FormsModule, FiltersearchComponent, TableComponent],
  templateUrl: './status.component.html',
  styleUrl: './status.component.css'
})
export class StatusComponent {
  filteredData = signal<StatusData[]>([]);
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

  onFilteredDataChange(data: StatusData[]) {
    this.filteredData.set(data);
  }
}
