import { CommonModule } from '@angular/common';
import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { heroMagnifyingGlass } from '@ng-icons/heroicons/outline';
import { firstValueFrom } from 'rxjs';
import { DataService } from '../../../service/data.service';
import { BatchRecord, DropdownConfig, FilterData, FilterOption } from '../../env.interface';
import { TableComponent } from "../../table/table.component";

@Component({
  selector: 'app-batch',
  standalone: true,
  imports: [CommonModule, FormsModule, NgIcon, TableComponent],
  templateUrl: './batch.component.html',
  styleUrl: './batch.component.css',
  viewProviders: [provideIcons({ heroMagnifyingGlass })]
})
export class BatchComponent implements OnInit {
  private dataService = inject(DataService);
  filteredData = signal<BatchRecord[]>([]);
  initialData = signal<BatchRecord[]>([]);
  isLoading = signal<boolean>(false);

  columns = [
    { key: 'vertical_name', label: 'Vertical Name' },
    { key: 'hubName', label: 'Hub Name' },
    { key: 'courseName', label: 'Course Name' },
    { key: 'batch_code', label: 'Batch Name' },
    { key: 'semester', label: 'Semester' },
    { key: 'download', label: 'Download' }
  ];

  dropdownConfigs: DropdownConfig[] = [
    { label: 'Vertical', key: 'vertical_name', idKey: 'verticalId' },
    { label: 'Hub', key: 'hubName', idKey: 'hubId', parentKey: 'vertical_name' },
    { label: 'Course', key: 'courseName', idKey: 'courseId', parentKey: 'hubName' },
    { label: 'Batch', key: 'batch_code', idKey: 'batchId', parentKey: 'courseName' },
    { label: 'Semester', key: 'semesterName', parentKey: 'batch_code' },
  ];

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
      this.dropdownOptions.update(current => ({ ...current, [keyToLoad]: [] }));
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
          options = hubs.map(h => ({ id: h.hubId, name: `${h.hubName} (${h.hubCode ?  h.hubCode : ''})` }));
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
      } else if (keyToLoad === 'batch_code' && parentIdValue != null) {
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
      }
      this.dropdownOptions.update(current => ({
        ...current,
        [keyToLoad]: options
      }));
    } catch (error) {
      console.error(`BatchComponent: Error loading options for ${keyToLoad} (parentIdValue: ${parentIdValue}):`, error);
      this.dropdownOptions.update(current => ({ ...current, [keyToLoad]: [] })); // Set to empty on error
    } finally {
      this.isLoading.set(false);
    }
  }

  async applyFilters() {
    this.filteredData.set([]);

    try {
      const currentSelectedFilters = this.selectedFilters();
      const verticalId = currentSelectedFilters['vertical_name'];
      const hubId = currentSelectedFilters['hubName'];
      const courseId = currentSelectedFilters['courseName'];
      const batchId = currentSelectedFilters['batch_code'];
      const semester = this.dropdownOptions()['semesterName'].find(opt => opt.id === currentSelectedFilters['semesterName'])?.name;

      if (courseId !== null && courseId !== undefined && batchId !== null && batchId !== undefined && verticalId !== null && verticalId !== undefined && hubId !== null && hubId !== undefined && semester !== null && semester !== undefined)  {

        const rawData = await firstValueFrom<any[]>(
          this.dataService.getfilterdata(verticalId, hubId, courseId, batchId, semester)
        );

        const processedTableData: BatchRecord[] = rawData.map(item => ({
          vertical_name: item.verticalName || item.vertical_name,
          hubName: item.hubName,
          courseName: item.courseName,
          batch_code: item.batchCode || item.batch_code,
          semester: item.semesterName || item.semester,
        }));

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


}
