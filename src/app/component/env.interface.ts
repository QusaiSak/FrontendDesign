export interface EnvelopeData {
  verticalName: string | null;
  hubName: string | null;
  courseName: string | null;
  batchName: string | null;
  semester: string | null;
  examType: string | null;
  view: string | null;
}
export interface BatchData {
  verticalName: string | null;
  hubName: string | null;
  courseName: string | null;
  batchName: string | null;
  semester: string | null;
  examType: string | null;
  download: string | null;
}
export interface StudentData {
  verticalName: string | null;
  hubName: string | null;
  courseName: string | null;
  catName: string | null;
  batchName: string | null;
  semester: string | null;
  examCatType: string | null;
  examType: string | null;
  schedule: Date | null;
  download: string | null;
}
export interface StatusData {
  verticalName: string | null;
  hubName: string | null;
  courseName: string | null;
  catName: string | null;
  batchName: string | null;
  semester: string | null;
  examCatType: string | null;
  examType: string | null;
  schedule: Date | null;
  questionPaperStatus?: 'Uploaded' | 'Pending';
  envelopeReceived?: 'Yes' | 'No';
  zipUploadCount?: number;
  examinerId?: string | null;
  examinerName?: string | null;
  paperCheckingStatus?: string | null;
}


export interface TitleItem {
  key: string | null;
  label: string | null;
}
