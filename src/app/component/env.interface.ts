export interface FilterOption {
  id: number;
  name: string;
}

export interface FilterData {
  [key: string]: number | null;
}

export interface TitleItem {
  key: string ;
  label: string;
}

export interface DropdownConfig {
  label: string;
  key: string;
  idKey?: string;
  parentKey?: string;
}


export interface StudentRecord {
  verticalId?: number;
  verticalName?: string;
  hubId?: number;
  hubName?: string;
  courseId?: number;
  courseName?: string;
  batchId?: number;
  batchName?: string;
  semester?: string;
  examCatType?: string;
  examType?: string;
  download?: string;
  subjectName?: string;
  subjectCode?: string;
  catName?: string;
  examDate?: string;
  fromTime?: string;
  toTime?: string;
  schedule?: string;
}

export interface EnvelopeRecord {
  verticalId?: number;
  verticalName?: string;
  hubId?: number;
  hubName?: string;
  courseId?: number;
  courseName?: string;
  batchId?: number;
  batch_code?: string;
  semester?: string;
  examType?: string;
  view?: string;
}

export interface BatchRecord {
  verticalId?: number;
  vertical_name?: string;
  hubId?: number;
  hubName?: string;
  hubCode?: string;
  courseId?: number;
  courseName?: string;
  batchId?: number;
  batch_code?: string;
  semester?: string;
  examType?: string;
}


export interface StatusRecord {
  verticalId?: string;
  vertical_name?: string;
  hubId?: string;
  hubName?: string;
  hubCode?: string;
  courseId?: string;
  courseName?: string;
  catName?: string;
  batchId?: string;
  batch_code: string;
  semester?: string;
  examType?: string;
  examCatType?: string;
  schedule?: Date;
  questionPaperStatus?: string;
  envelopeReceived?: string;
  zipUploadCount?: number;
  examinerId?: string;
  examinerName?: string;
  paperCheckingStatus?: string;
}

export interface StudentRecNew {
  studentCode: string;
  studentName: string;
  serialNo?: number;
}

export interface MetaData {
  verticalName: string;
  hubName: string;
  examName: string;
  batchName: string;
}

export interface UploadResponse {
  status: number;
  message: string;
  data?: {
    metaData: MetaData;
    uploadedStudents: StudentRecNew[];
    studentsNotFound: StudentRecNew[];
  };
}

export interface User {
  id:number;
  username: string;
  email: string;
  password: string;
  repassword: string;
  token: string;
}
