import { CommonModule } from '@angular/common';
import { Component, computed, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { EnvelopeData, TitleItem } from '../../env.interface';
import { FiltersearchComponent } from "../../filtersearch/filtersearch.component";

@Component({
  selector: 'app-envelope',
  standalone: true,
  imports: [CommonModule, FormsModule, FiltersearchComponent],
  templateUrl: './envelope.component.html',
  styleUrl: './envelope.component.css'
})
export class EnvelopeComponent {
  filteredData = signal<EnvelopeData[]>([]);
  title :TitleItem[] = [
    { key: 'verticalName', label: 'Vertical Name' },
    { key: 'hubName', label: 'Hub Name' },
    { key: 'courseName', label: 'Course Name' },
    { key: 'batchName', label: 'Batch Name' },
    { key: 'semester', label: 'Semester' },
    { key: 'examType', label: 'Exam Type' },
    { key: 'view', label: 'View' }
  ];
  // Rename data to dataSt for consistency
  dataEn = signal<EnvelopeData[]>([
    {
      verticalName: 'Healthcare - HC',
      hubName: 'Iqraa Academy of Iqraa International Hospital and Research Centre - HC0421',
      courseName: 'BSc In Dialysis Technology - HCC193',
      batchName: 'HC0421/C193/B02/S25',
      semester: '1',
      examType: 'Main',
      view: 'View'
    },
    {
      verticalName: 'Healthcare - HC',
      hubName: 'Iqraa Academy of Iqraa International Hospital and Research Centre - HC0421',
      courseName: 'BSc In Dialysis Technology - HCC193',
      batchName: 'HC0421/C193/B02/S25',
      semester: '1',
      examType: 'Supplementary 1',
      view: 'View'
    },
     { // Added another sample data point with different values
      verticalName: 'Engineering',
      hubName: 'Tech University Hub',
      courseName: 'B.Tech Computer Science',
      batchName: 'TU/CS/B01/S25',
      semester: '2',
      examType: 'Main',
      view: 'View'
    }
  ]);

  // Define the configuration for your dropdowns
  dropdownConfigs: any[] = [
    { label: 'Vertical', key: 'verticalName' },
    { label: 'Hub', key: 'hubName' },
    { label: 'Course', key: 'courseName' },
    { label: 'Batch', key: 'batchName' },
    { label: 'Semester', key: 'semester' },
    { label: 'Exam Type', key: 'examType' },
    // Add configurations for any other properties you want dropdowns for
  ];

  onFilteredDataChange(data: EnvelopeData[]) {
    this.filteredData.set(data);
  }
}
