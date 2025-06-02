import { CommonModule } from '@angular/common';
import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { heroMagnifyingGlass } from '@ng-icons/heroicons/outline';
import { firstValueFrom } from 'rxjs';
import { DataService } from '../../../service/data.service';
import { DropdownConfig, FilterData, FilterOption, StudentRecord } from '../../env.interface';
import { TableComponent } from "../../table/table.component";

@Component({
  selector: 'app-student',
  standalone: true,
  imports: [CommonModule,NgIcon,FormsModule, TableComponent],
  templateUrl: './student.component.html',
  styleUrl: './student.component.css',
  viewProviders: [provideIcons({ heroMagnifyingGlass })]
})

export class StudentComponent implements OnInit {
  private dataService = inject(DataService);
  filteredData = signal<StudentRecord[]>([])
  initialData = signal<StudentRecord[]>([]);
  isLoading = signal<boolean>(false);

  columns = [
    { key: 'vertical_name', label: 'Vertical Name' },
    { key: 'hubName', label: 'Hub Name' },
    { key: 'courseName', label: 'Course Name' },
    { key: 'catName', label: 'Category Name' },
    { key: 'batch_code', label: 'Batch Name' },
    { key: 'semester', label: 'Semester' },
    { key: 'examCatType', label: 'Exam Category Type' },
    { key: 'examType', label: 'Exam Type' },
    { key: 'schedule', label: 'Date/Time' },
    { key: 'download', label: 'Download' }
  ];

  dropdownConfigs: DropdownConfig[] = [
    { label: 'Vertical', key: 'vertical_name', idKey: 'verticalId' },
    { label: 'Hub', key: 'hubName', idKey: 'hubId', parentKey: 'vertical_name' },
    { label: 'Course', key: 'courseName', idKey: 'courseId', parentKey: 'hubName' },
    { label: 'Batch', key: 'batch_code', idKey: 'batchId', parentKey: 'courseName' },
    { label: 'Semester', key: 'semesterName', parentKey: 'batch_code' },
  ];

  // { label: 'Subject', key: 'catName', parentKey: 'semesterName' },
  // { label: 'Exam Type', key: 'examType', parentKey: 'catName' }
  searchTerm = signal<string>('');
  selectedFilters = signal<FilterData>({});
  dropdownOptions = signal<{ [key: string]: FilterOption[] }>({});

  disabledState = computed(() => {
    const disabled: { [key: string]: boolean } = {};
    this.dropdownConfigs.forEach((config) => {
      if (config.parentKey) {
        const parentSelectedValue = this.selectedFilters()[config.parentKey];
        disabled[config.key] = !parentSelectedValue;
      } else {
        disabled[config.key] = false;
      }
    });
    return disabled;
  });

  ngOnInit() {
    const initialOptions: { [key: string]: FilterOption[] } = {};
    this.dropdownConfigs.forEach(config => {
      initialOptions[config.key] = [];
    });
    this.dropdownOptions.set(initialOptions);
    this.loadInitialDropdown();
    this.filteredData.set([]);
  }


  private async loadInitialDropdown() {
    const firstConfig = this.dropdownConfigs.find(config => !config.parentKey);
    if (firstConfig) {
      await this.loadOptionsForDropdown(firstConfig.key);
    }
  }

  async onFilterChange(key: string, selectedValue: string | null) {
    const firstDropdownKey = this.dropdownConfigs.find(c => !c.parentKey)?.key;
    if (key !== firstDropdownKey && this.disabledState()[key]) {
        return;
    }

    this.isLoading.set(true);

    const numericIdValue = (selectedValue && selectedValue !== 'null') ? Number(selectedValue) : null;

    this.selectedFilters.update(current => ({
      ...current,
      [key]: numericIdValue
    }));

    const currentIndex = this.dropdownConfigs.findIndex(c => c.key === key);

    for (let i = currentIndex + 1; i < this.dropdownConfigs.length; i++) {
      const dependentKey = this.dropdownConfigs[i].key;
      this.selectedFilters.update(current => ({ ...current, [dependentKey]: null }));
      this.dropdownOptions.update(current => ({ ...current, [dependentKey]: [] }));
    }

    if (numericIdValue !== null && currentIndex < this.dropdownConfigs.length - 1) {
      const nextConfig = this.dropdownConfigs[currentIndex + 1];
      if (nextConfig && nextConfig.parentKey === key) {
         await this.loadOptionsForDropdown(nextConfig.key, numericIdValue);
      }
    }
    this.isLoading.set(false);
  }

  async loadOptionsForDropdown(keyToLoad: string, parentIdValue?: number) {
    this.isLoading.set(true);
    let options: FilterOption[] = [];
    const config = this.dropdownConfigs.find(c => c.key === keyToLoad);

    if (!config) {
      this.isLoading.set(false);
      console.error(`BatchComponent: Config not found for dropdown key: ${keyToLoad}`);
      this.dropdownOptions.update(current => ({ ...current, [keyToLoad]: [] })); // Clear options for this key
      return;
    }

    try {
      if (keyToLoad === 'vertical_name') {
        const verticals = await firstValueFrom(this.dataService.getVerticalData());
        if (Array.isArray(verticals)) {
          options = verticals.map(v => ({ id: v.verticalId, name: v.vertical_name }));
        } else {
          console.warn(`BatchComponent: Expected array for verticals, received:`, verticals);
        }
      } else if (keyToLoad === 'hubName' && parentIdValue != null) {
        const hubs = await firstValueFrom(this.dataService.getHubData(parentIdValue));
        if (Array.isArray(hubs)) {
          options = hubs.map(h => ({ id: h.hubId, name: h.hubName }));
        } else {
          console.warn(`BatchComponent: Expected array for hubs (parentId: ${parentIdValue}), received:`, hubs);
        }
      } else if (keyToLoad === 'courseName' && parentIdValue != null) {
        const courses = await firstValueFrom(this.dataService.getCoursesFromHub(parentIdValue));
        if (Array.isArray(courses)) {
          options = courses.map(c => ({
            id: c.courseId,
            name: `${c.courseName}${c.courseCode ? ' - ' + c.courseCode : ''}`
          }));
        } else {
          console.warn(`BatchComponent: Expected array for courses (parentId: ${parentIdValue}), received:`, courses);
        }
      } else if (keyToLoad === 'batch_code' && parentIdValue != null) { // parentIdValue is courseId
        const selectedHubId = this.selectedFilters()['hubName'] as number | undefined;

        if (selectedHubId != null) {
          console.log(`BatchComponent: Loading batches for hubId: ${selectedHubId} (courseId: ${parentIdValue})`);
          const rawBatches = await firstValueFrom(this.dataService.getBatchesFromCourseHub(selectedHubId));

          if (Array.isArray(rawBatches)) {
            options = rawBatches
              .filter(b => b && b.batchId != null && b.batch_code != null) // Ensure item and properties exist
              .map(b => ({
                id: b.batchId,
                name: b.batch_code
              }));

          } else {
            console.warn(`BatchComponent: Expected an array of batches for hubId ${selectedHubId}, but received:`, rawBatches);
          }
        } else {
          console.warn("BatchComponent: Cannot load batches because Hub ID is missing from selected filters.");
        }
      } else if (keyToLoad === 'semesterName' && parentIdValue != null) {
        const selectedBatchId = parentIdValue;
        const semesters = await firstValueFrom(this.dataService.getSemesterData(selectedBatchId));
        if (Array.isArray(semesters)) {
          options = semesters.map((s) => ({
            id: s.examId,
            name: s.semester
          }));
        } else {
          console.warn(`BatchComponent: Expected array for semesters (parentId: ${selectedBatchId}), received:`, semesters);
        }
      } else if (keyToLoad === 'catName' && parentIdValue != null) {
        const currentSelectedFilters = this.selectedFilters();
        const verticalId = currentSelectedFilters['vertical_name'];
        const hubId = currentSelectedFilters['hubName'];
        const courseId = currentSelectedFilters['courseName'];
        const batchId = currentSelectedFilters['batch_code'];
        const semester = this.dropdownOptions()['semesterName'].find(opt => opt.id === currentSelectedFilters['semesterName'])?.name;
        if (courseId !== null && courseId !== undefined && batchId !== null && batchId !== undefined && verticalId !== null && verticalId !== undefined && hubId !== null && hubId !== undefined && semester !== null && semester !== undefined){
          const rawData = await firstValueFrom<any[]>(
            this.dataService.getfilterSubject(verticalId, hubId, courseId, batchId, semester)
          );
          if (Array.isArray(rawData)) {
            options = rawData.map(item => ({
              id: item.subjectId,
              name: `${item.subjectName} ${item.subjectCode || ''}`
            }));
          } else {
            console.warn(`BatchComponent: Expected an array of subjects for courseId ${courseId}, but received:`, rawData);
          }
        } else {
          console.warn("BatchComponent: Cannot load subjects because some required filters are missing.");
        }

      }

      // Add other 'else if' blocks here for other dropdowns if needed
``
      this.dropdownOptions.update(current => ({
        ...current,
        [keyToLoad]: options // options will be empty if issues occurred
      }));
    } catch (error) {
      console.error(`BatchComponent: Error loading options for ${keyToLoad} (parentIdValue: ${parentIdValue}):`, error);
      this.dropdownOptions.update(current => ({ ...current, [keyToLoad]: [] })); // Set to empty on error
    } finally {
      this.isLoading.set(false);
    }
  }

  async applyFilters() {
    this.isLoading.set(true);
    this.filteredData.set([]);

    try {
      const currentSelectedFilters = this.selectedFilters();
      const courseId = currentSelectedFilters['courseName'];
      const batchId = currentSelectedFilters['batch_code'];
      // const subjectId = currentSelectedFilters['catName'];
      const verticalId = currentSelectedFilters['vertical_name'];
      const hubId = currentSelectedFilters['hubName'];
      const semester = this.dropdownOptions()['semesterName'].find(opt => opt.id === currentSelectedFilters['semesterName'])?.name;


      const filtersToEmit: FilterData = {
        ...currentSelectedFilters,
        examType: 1
      };

      if (courseId !== null && courseId !== undefined && batchId !== null && batchId !== undefined && verticalId !== null && verticalId !== undefined && hubId !== null && hubId !== undefined && semester !== null && semester !== undefined)  {

        const rawData = await firstValueFrom<any[]>(
          this.dataService.getpdfdata(verticalId, hubId, courseId, batchId, semester)
        );

        console.log('BatchComponent: Received raw data:', rawData);

        const processedTableData: StudentRecord[] = rawData.map(item => {
          // Construct catName
          let constructedCatName = '';
          if (item.subjectName && item.subjectCode) {
            constructedCatName = `${item.subjectName} ${item.subjectCode}`;
          } else if (item.subjectName) {
            constructedCatName = item.subjectName;
          } else if (item.subjectCode) {
            constructedCatName = item.subjectCode;
          }

          // Construct schedule
          let constructedSchedule = '';
          if (item.examDate && item.fromTime && item.toTime) {
            constructedSchedule = `${item.examDate} ${item.fromTime} - ${item.toTime}`;
          } else if (item.examDate && item.fromTime) {
            constructedSchedule = `${item.examDate} ${item.fromTime}`;
          } else if (item.examDate) {
            constructedSchedule = item.examDate;
          }

          return {
            vertical_name: item.verticalName || item.vertical_name,
            hubName: item.hubName,
            courseName: item.courseName,
            batch_code: item.batchCode || item.batch_code,
            semester: item.semesterName || item.semester,
            examType: item.examType,
            examCatType: item.examCatType,
            catName: constructedCatName || item.catName || '',
            schedule: constructedSchedule || item.schedule || '',
            subjectName: item.subjectName,
            subjectCode: item.subjectCode,
            examDate: item.examDate,
            fromTime: item.fromTime,
            toTime: item.toTime
          };
        });

        this.filteredData.set(processedTableData);
      }
    } catch (error) {
      console.error('Error during applyFilters or PDF generation:', error);
      this.filteredData.set([]);
    } finally {
      this.isLoading.set(false);
    }
  }


  async clearAll() {
    this.searchTerm.set('');
    this.selectedFilters.set({});
    this.filteredData.set([]);

    const initialOptions: { [key: string]: FilterOption[] } = {};
    this.dropdownConfigs.forEach(config => {
      initialOptions[config.key] = [];
    });
    this.dropdownOptions.set(initialOptions);

    await this.loadInitialDropdown();
  }
  onFilteredDataChange(event: { data: StudentRecord[], filters: any, search: string }) {

    if (event && Array.isArray(event.data) && event.data.length > 0) {
      const processedData = event.data.map((item, index) => {

        // Construct catName
        let constructedCatName = '';
        if (item.subjectName && item.subjectCode) {
          constructedCatName = `${item.subjectName} ${item.subjectCode}`;
        } else if (item.subjectName) {
          constructedCatName = item.subjectName;
        } else if (item.subjectCode) {
          constructedCatName = item.subjectCode;
        }

        let constructedSchedule = '';
        if (item.examDate && item.fromTime) {
          constructedSchedule = `${item.examDate} ${item.fromTime}`;
        } else if (item.examDate && item.fromTime) { // Fallback if toTime is missing
            constructedSchedule = `${item.examDate} ${item.fromTime}`;
        } else if (item.examDate) { // Fallback if only date is present
          constructedSchedule = item.examDate;
        }

        const processedItem = {
          ...item,
          catName: constructedCatName || item.catName || '',
          schedule: constructedSchedule || item.schedule || ''
        };

        return processedItem;
      });
      this.filteredData.set(processedData);
    } else {
      this.filteredData.set([]);
    }
  }
}
