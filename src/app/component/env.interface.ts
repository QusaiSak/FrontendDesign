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
  courseId?: number;
  courseName?: string;
  batchId?: number;
  batch_code?: string;
  semester?: string;
  examType?: string;
}



export interface User {
  id:number;
  username: string;
  email: string;
  password: string;
  repassword: string;
  token: string;
}
