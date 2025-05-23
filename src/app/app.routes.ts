import { Routes } from '@angular/router';
import { BatchComponent } from './component/Barcode/batch/batch.component';
import { EnvelopeComponent } from './component/Barcode/envelope/envelope.component';
import { StudentComponent } from './component/Barcode/student/student.component';

export const routes: Routes = [
  { path: 'envelope', component: EnvelopeComponent },
  { path: 'batch', component: BatchComponent },
  { path: 'student', component: StudentComponent },
  { path: '', redirectTo: '/envelope', pathMatch: 'full' }
];
