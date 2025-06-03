import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../../environments/environment';

// Define interfaces for the raw API response structures
interface ApiVertical {
  verticalId: number;
  vertical_code: string;
  vertical_name: string;
  status: number;
}

interface ApiHub {
  hubId: number;
  verticalId: number;
  hub_code: string;
  hubName: string; // This one is already camelCase in the example
}

// Assuming similar structures for Courses and Batches from API
interface ApiCourse {
  courseId: number; // Assuming
  course_code: string; // Assuming
  courseName: string; // Assuming
}

interface ApiBatch {
  batchId: number;  // Assuming
  batch_code: string; // Assuming
}

interface ApiSemester{
  examId: number;
  semester: string;
}

// Component-facing interfaces (camelCase)
export interface VerticalData {
  verticalId: number;
  verticalCode: string;
  vertical_name: string;
  status: number;
}

export interface HubData {
  hubId: number;
  verticalId: number;
  hubCode: string;
  hubName: string;
}

export interface CourseData {
  courseId: number;
  courseCode: string;
  courseName: string;
}

export interface BatchData {
  batchId: number;
  batch_code: string;
}

export interface SemesterData {
  examId: number;
  semester: string;
}

// For the filter payload
export interface FilterData {
  [key: string]: number | null;
}


@Injectable({
  providedIn: 'root'
})
export class DataService {
  private http = inject(HttpClient);
  private baseUrl = environment.apiUrl;
  // http://192.168.0.137:5002/api
  // https://tiss.offee.in/integration
  constructor() { }

  getVerticalData(): Observable<VerticalData[]> {
    return this.http.get<{ status: number; message: string; data: ApiVertical[] }>(
      `${this.baseUrl}/verticals/getAllVerticals`
    ).pipe(
      map(response => response.data.map(apiV => ({
        verticalId: apiV.verticalId,
        verticalCode: apiV.vertical_code,
        vertical_name: apiV.vertical_name,
        status: apiV.status
      })))
    );
  }

  getHubData(verticalId: number): Observable<HubData[]> {
    return this.http.get<{ status: number; message: string; data: ApiHub[] }>(
      `${this.baseUrl}/hubs/getHubsFromVertical?verticalId=${verticalId}`
    ).pipe(
      map(response => response.data.map(apiH => ({
        hubId: apiH.hubId,
        verticalId: apiH.verticalId,
        hubCode: apiH.hub_code,
        hubName: apiH.hubName
      })))
    );
  }

  getCoursesFromHub(hubId: number): Observable<CourseData[]> {
    return this.http.get<{ status: number; message: string; data: ApiCourse[] }>(
      `${this.baseUrl}/courses/getCoursesFromVertical?hubId=${hubId}`
    ).pipe(
      map(response => response.data.map(apiC => ({
        courseId: apiC.courseId,
        courseCode: apiC.course_code,
        courseName: apiC.courseName
      })))
    );
  }

  getBatchesFromCourseHub(hubId: number): Observable<BatchData[]> {
    return this.http.get<{ status: number; message: string; data: ApiBatch[] }>(
      `${this.baseUrl}/batches/getBatchesFromCourseHub?hubId=${hubId}`
    ).pipe(
      map(response => response.data.map(apiB => ({
        batchId: apiB.batchId,
        batch_code: apiB.batch_code,
      })))
    );
  }

  getSemesterData(batchId: number): Observable<SemesterData[]> {
    return this.http.get<{ status: number; message: string; data: ApiSemester[] }>(
      `${this.baseUrl}/courses/getSemesterFromBatch?batchId=${batchId}`
    ).pipe(
      map(response => response.data.map(apiS => ({
        examId: apiS.examId,
        semester: apiS.semester
      })))
    );
  }


  getfilterSubject(verticalId:number,hubId:number,courseId:number,batchId:number,semester:string): Observable<any> {
    return this.http.get<{ status: number; message: string; data: any[] }>(
      `${this.baseUrl}/courses/GetSubjects4Filter?verticalId=${verticalId}&hubId=${hubId}&courseId=${courseId}&batchId=${batchId}&semester=${semester}`
    ).pipe(
      map(response => response.data)
    );
  }

  getfilterdata(verticalId:number,hubId:number,courseId:number,batchId:number,semester:string): Observable<any> {
    return this.http.get<{ status: number; message: string; data: any[] }>(
      `${this.baseUrl}/courses/GetEnvelopeData?verticalId=${verticalId}&hubId=${hubId}&courseId=${courseId}&batchId=${batchId}&semester=${semester}`
    ).pipe(
      map(response => response.data)
    );
  }

  

  // getfilteredStudentData(verticalId:number,hubId:number,courseId:number,batchId:number,semester:string,subjectId:number): Observable<any> {
  //   return this.http.get<{ status: number; message: string; data: any[] }>(
  //     `${this.baseUrl}/courses/?courseId=${courseId}&batchId=${batchId}&subjectId=${subjectId}`
  //   ).pipe(
  //     map(response => response.data)
  //   );
  // }

  // getXLSstudentData(courseId:number,batchId:number,subjectId:number): Observable<any> {
  //   return this.http.get<{ status: number; message: string; data: any[] }>(
  //     `${this.baseUrl}/courses/GetStudentsXls?courseId=${courseId}&batchId=${batchId}&subjectId=${subjectId}`
  //   ).pipe(
  //     map(response => response.data)
  //   );
  // }

  // getXLSbatchdata(verticalId:number,hubId:number,courseId:number): Observable<any> {
  //   return this.http.get<{ status: number; message: string; data: any[] }>(
  //     `${this.baseUrl}/courses/GetBatchesXls?verticalId=${verticalId}&hubId=${hubId}&courseId=${courseId}`
  //   ).pipe(
  //     map(response => response.data)
  //   );
  // }

  getpdfdata(verticalId:number,hubId:number,courseId:number,batchId:number,semester:string): Observable<any> {
    return this.http.get<{ status: number; message: string; data: any[] }>(
      `${this.baseUrl}/courses/GetSubjects4PDF?verticalId=${verticalId}&hubId=${hubId}&courseId=${courseId}&batchId=${batchId}&semester=${semester}`
    ).pipe(
      map(response => response.data)
    );
  }

  makepdf(data: any): Observable<Blob> {
    return this.http.post(`${this.baseUrl}/generate-pdf`, { forms: data }, { responseType: 'blob' });
  }

}
