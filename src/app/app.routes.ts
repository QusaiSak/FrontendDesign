import { Routes } from '@angular/router';
import { BatchComponent } from './component/Barcode/batch/batch.component';
import { EnvelopeComponent } from './component/Barcode/envelope/envelope.component';
import { StudentComponent } from './component/Barcode/student/student.component';
import { LoginComponent } from './component/login/login.component';
import { StatusComponent } from './component/PostExam/status/status.component';
import { authGuard } from './guard/auth.guard';

export const routes: Routes = [
  { path: 'envelope', component: EnvelopeComponent, canActivate: [authGuard] },
  { path: 'batch', component: BatchComponent, canActivate: [authGuard] },
  { path: 'student', component: StudentComponent, canActivate: [authGuard] },
  { path: 'status', component: StatusComponent, canActivate: [authGuard] },
  { path: 'login', component: LoginComponent, canActivate: [authGuard] },
  { path: '', redirectTo: '/envelope', pathMatch: 'full' }
];
