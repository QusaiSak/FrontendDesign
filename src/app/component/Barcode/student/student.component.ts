import { CommonModule } from '@angular/common';
import { Component, signal } from '@angular/core';
import { StudentData, TitleItem } from '../../env.interface';
import { FiltersearchComponent } from '../../filtersearch/filtersearch.component';

@Component({
  selector: 'app-student',
  standalone: true,
  imports: [CommonModule, FiltersearchComponent],
  templateUrl: './student.component.html',
  styleUrl: './student.component.css'
})
export class StudentComponent {
  filteredData = signal<StudentData[]>([]);
  dataSt = signal<StudentData[]>([
    {
      verticalName: 'Healthcare - HC',
      hubName: 'Sterling College of Paramedical Education (Unit of Amiya Medical Education Trust) - HC0467',
      courseName: 'BSc in Medical Laboratory Technology - HCC167',
      catName: 'Functional English - GEA 1.1 - 15683',
      batchName: 'HC0346/C167/B01/S25',
      semester: '1',
      examCatType: 'Main',
      examType: 'Written/Online',
      schedule: new Date('2024-01-12T15:30:00'),
      download: 'download'
    },
    {
      verticalName: 'Healthcare - HC',
      hubName: 'Sterling College of Paramedical Education (Unit of Amiya Medical Education Trust) - HC0467',
      courseName: 'BSc in Medical Laboratory Technology - HCC167',
      catName: 'Computing Skills and Digital Literacy - GEA 1.2 - 15684',
      batchName: 'HC0346/C167/B01/S25',
      semester: '1',
      examCatType: 'Main',
      examType: 'Project',
      schedule: new Date('2024-01-15T11:00:00'),
      download: 'download'
    },
    {
      verticalName: 'Healthcare - HC',
      hubName: 'Sterling College of Paramedical Education (Unit of Amiya Medical Education Trust) - HC0467',
      courseName: 'BSc in Medical Laboratory Technology - HCC167',
      catName: 'Anatomy I - MLT 1.1 - 15685',
      batchName: 'HC0346/C167/B01/S25',
      semester: '1',
      examCatType: 'Main',
      examType: 'Written/Online',
      schedule: new Date('2024-01-12T10:00:00'),
      download: 'download'
    },
    {
      verticalName: 'Healthcare - HC',
      hubName: 'Sterling College of Paramedical Education (Unit of Amiya Medical Education Trust) - HC0467',
      courseName: 'BSc in Medical Laboratory Technology - HCC167',
      catName: 'Physiology I and Laboratory Skills I - MLT 1.2 - 15686',
      batchName: 'HC0346/C167/B01/S25',
      semester: '1',
      examCatType: 'Main',
      examType: 'Written/Online',
      schedule: new Date('2024-01-20T10:00:00'),
      download: 'download'
    },
    {
      verticalName: 'Healthcare - HC',
      hubName: 'Sterling College of Paramedical Education (Unit of Amiya Medical Education Trust) - HC0467',
      courseName: 'BSc in Medical Laboratory Technology - HCC167',
      catName: 'Soft Training - MT 1.3T - 15688',
      batchName: 'HC0346/C167/B01/S25',
      semester: '1',
      examCatType: 'Main',
      examType: 'Practical',
      schedule: new Date('2024-01-20T10:00:00'),
      download: 'download'
    }
  ]);

  title: TitleItem[] = [
    { key: 'verticalName', label: 'Vertical Name' },
    { key: 'hubName', label: 'Hub Name' },
    { key: 'courseName', label: 'Course Name' },
    { key: 'catName', label: 'Category Name' },
    { key: 'batchName', label: 'Batch Name' },
    { key: 'semester', label: 'Semester' },
    { key: 'examCatType', label: 'Exam Category Type' },
    { key: 'examType', label: 'Exam Type' },
    { key: 'schedule', label: 'Date/Time' },
    { key: 'download', label: 'Download' }
  ];

  dropdownConfigs = [
    { label: 'Vertical', key: 'verticalName' },
    { label: 'Hub', key: 'hubName' },
    { label: 'Course', key: 'courseName' },
    { label: 'Batch', key: 'batchName' },
    { label: 'Semester', key: 'semester' },
    { label: 'Subject', key: 'catName' },
    { label: 'Exam Type', key: 'examType' },
  ];

  onFilteredDataChange(data: StudentData[]) {
    this.filteredData.set(data);
  }
}
