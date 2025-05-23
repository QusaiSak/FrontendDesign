import { Routes } from '@angular/router';
import { BatchComponent } from './component/Barcode/batch/batch.component';
import { EnvelopeComponent } from './component/Barcode/envelope/envelope.component';
import { StudentComponent } from './component/Barcode/student/student.component';
import { StatusComponent } from './component/status/status.component';

export const routes: Routes = [
  { path: 'envelope', component: EnvelopeComponent },
  { path: 'batch', component: BatchComponent },
  { path: 'student', component: StudentComponent },
  { path: 'status', component: StatusComponent },
  { path: '', redirectTo: '/envelope', pathMatch: 'full' }
];
