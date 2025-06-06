import { CommonModule } from '@angular/common';
import { Component, computed, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { firstValueFrom } from 'rxjs';
import { DataService } from '../../../service/data.service';
import { TableComponent } from '../../table/table.component';


@Component({
  selector: 'app-upload',
  standalone: true,
  imports: [CommonModule, FormsModule, TableComponent],
  templateUrl: './upload.component.html'
})
export class UploadComponent {
  // Services
  private dataService = inject(DataService);
  private snackBar = inject(MatSnackBar);

  // UI State
  selectedZip: File | null = null;
  savingInProgress = signal<boolean>(false);
  showDataSection = signal<boolean>(false);
  message = signal<string>('');

  // Table configuration
  studentColumns = [
    { key: 'serialNo', label: 'S/N' },
    { key: 'studentCode', label: 'Student Code' },
    { key: 'studentName', label: 'Student Name' }
  ];

  // Metadata configuration
  metadataFields = [
    { key: 'verticalName', label: 'Vertical' },
    { key: 'hubName', label: 'Hub' },
    { key: 'batchCode', label: 'Batch' },
    { key: 'courseName', label: 'Course' },
    { key: 'subjectName', label: 'Subject' },
    { key: 'subjectCode', label: 'Subject Code' }
  ];

  // Data signals
  studentsMapped = signal<any>({
    verticalName: '',
    hubName: '',
    batchCode: '',
    courseName: '',
    subjectName: '',
    subjectCode: ''
  });

  private _studentsList = signal<any[]>([]);
  private _studentsMissed = signal<any[]>([]);

  // Computed values for tables with serial numbers
  studentsListWithSerial = computed(() =>
    this._studentsList().map((student, index) => ({
      ...student,
      serialNo: index + 1
    }))
  );

  studentsMissedWithSerial = computed(() =>
    this._studentsMissed().map((student, index) => ({
      ...student,
      serialNo: index + 1
    }))
  );

  public seletedZipFile(event: Event): void {
    const target = event.target as HTMLInputElement;
    if (target.files && target.files.length > 0) {
      this.selectedZip = target.files[0];

      if (!this.selectedZip.name.endsWith('.zip')) {
        this.snackBar.open('Please select a valid ZIP file', 'Close', {
          duration: 3000,
          panelClass: ['error-snackbar']
        });
        this.selectedZip = null;
        return;
      }

      this.message.set(`Selected file: ${this.selectedZip.name}`);
      this.resetData();
    }
  }

  private resetData(): void {
    this.showDataSection.set(false);
    this.studentsMapped.set({
      verticalName: '',
      hubName: '',
      batchCode: '',
      courseName: '',
      subjectName: '',
      subjectCode: ''
    });
    this._studentsList.set([]);
    this._studentsMissed.set([]);
    this.message.set('');
  }

  async submit(): Promise<void> {
    try {
      if (!this.selectedZip) {
        this.message.set('Please select a zip file to upload.');
        this.snackBar.open(this.message(), 'Close', {
          duration: 3000,
          panelClass: ['error-snackbar']
        });
        return;
      }

      this.savingInProgress.set(true);
      const formData = new FormData();
      formData.append('file', this.selectedZip);

      const response: any = await firstValueFrom(
        this.dataService.uploadZipFile(formData)
      );

      this.message.set(response.message);

      if (response.status === 200 && response.data) {
        this.handleSuccessResponse(response);
      } else if (response.status === 500) {
        this.handleServerError(response);
      } else {
        this.handleErrorResponse(response);
      }
    } catch (error) {
      this.handleError(error as Error);
    } finally {
      this.savingInProgress.set(false);
    }
  }

  private handleSuccessResponse(response: any): void {
    if (response.data) {
      this.showDataSection.set(true);
      this.studentsMapped.set(response.data.metaData);
      this._studentsList.set(response.data.uploadedStudents);
      this._studentsMissed.set(response.data.studentsNotFound);

      this.snackBar.open('Upload successful', 'Close', {
        duration: 3000,
        panelClass: ['success-snackbar']
      });
    }
  }

  private handleServerError(response: any): void {
    this.showDataSection.set(false);
    this.snackBar.open(response.message || 'Server error occurred', 'Close', {
      duration: 3000,
      panelClass: ['error-snackbar']
    });
  }

  private handleErrorResponse(response: any): void {
    this.showDataSection.set(false);
    this.snackBar.open(response.problem || response.message, 'Close', {
      duration: 3000,
      panelClass: ['error-snackbar']
    });
  }

  private handleError(error: Error): void {
    this.showDataSection.set(false);
    this.message.set(`Error: ${error.message}`);
    this.snackBar.open(this.message(), 'Close', {
      duration: 3000,
      panelClass: ['error-snackbar']
    });
  }
}
