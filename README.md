# Angular Concepts Application

This project is an Angular application designed to demonstrate various concepts, including standalone components, signal-based state management, and Tailwind CSS for styling. It features reusable components like a dynamic table and a filter search.

## Project Structure Overview

```
.angular/
.editorconfig
.gitignore
.postcssrc.json
README.md
angular.json
package-lock.json
package.json
public/
src/
├── app/
│   ├── app.component.css
│   ├── app.component.html
│   ├── app.component.spec.ts
│   ├── app.component.ts
│   ├── app.config.ts
│   ├── app.routes.ts
│   ├── component/       # Contains reusable UI components (e.g., table, filtersearch, batch, envelope, status, student)
│   └── pipe/            # Contains standalone pipes for data transformation and filtering
├── index.html
├── main.ts
└── styles.css
tsconfig.app.json
tsconfig.json
tsconfig.spec.json
```

### Key Directories and Their Purpose:

*   `src/app/`: Contains the main application logic.
    *   `src/app/component/`: Houses all standalone Angular components. Each component is self-contained and manages its own state, often using Angular Signals.
    *   `src/app/pipe/`: Contains standalone Angular pipes used for data manipulation and filtering (e.g., `filter.pipe.ts`, `filter-bydropdown.pipe.ts`).
*   `public/`: Static assets like images and favicons.

## Frontend Data Flow (Current State)

Currently, data within the application is managed client-side using Angular Signals. Components like `batch`, `envelope`, `status`, and `student` hold their respective data in local signals. There is no direct integration with a backend API in the current setup.

## Backend Integration Guide

To integrate this frontend application with a backend API, follow these steps:

1.  **Define Data Interfaces**: Ensure your backend API's data structures align with the TypeScript interfaces used in the frontend (e.g., `TitleItem`, `StatusData`, `BatchData`, `EnvelopeData`, `StudentData`). If they differ, you will need to implement data mapping.

2.  **Create Angular Services for API Calls**:
    *   For each major data entity (e.g., batches, envelopes, students), create a dedicated Angular service. These services will be responsible for making HTTP requests to your backend API using Angular's `HttpClient`.
    *   **Recommended Location**: Create a new folder `src/app/services/`.
    *   **Example (`src/app/services/batch.service.ts`):**

    ```typescript
    import { Injectable, signal } from '@angular/core';
    import { HttpClient } from '@angular/common/http';
    import { Observable } from 'rxjs';

    export interface BatchData {
      id: number;
      name: string;
      // ... other properties matching your backend response
    }

    @Injectable({
      providedIn: 'root'
    })
    export class BatchService {
      private apiUrl = 'YOUR_BACKEND_API_URL/batches'; // **Update this with your actual backend endpoint**

      constructor(private http: HttpClient) { }

      getBatches(): Observable<BatchData[]> {
        return this.http.get<BatchData[]>(this.apiUrl);
      }

      // Add methods for POST, PUT, DELETE operations as needed
    }
    ```

3.  **Enable `HttpClient` in `app.config.ts`**:
    *   Ensure that `provideHttpClient()` is added to the `providers` array in `src/app/app.config.ts` to make `HttpClient` available application-wide.

    ```typescript
    // src/app/app.config.ts
    import { provideHttpClient } from '@angular/common/http';

    export const appConfig: ApplicationConfig = {
      providers: [
        // ... existing providers ...
        provideHttpClient() // Add this line
      ]
    };
    ```

4.  **Integrate Services into Components**:
    *   Inject the relevant service into the component that needs to fetch data (e.g., `BatchService` into `batch.component.ts`).
    *   Replace the current client-side data initialization with calls to the service's methods.
    *   Update the component's signals with the data received from the backend.
    *   **Example (`src/app/component/batch/batch.component.ts`):**

    ```typescript
    // src/app/component/batch/batch.component.ts
    import { Component, OnInit, signal } from '@angular/core';
    import { BatchService, BatchData } from '../../services/batch.service'; // Adjust path as needed

    @Component({
      selector: 'app-batch',
      standalone: true,
      imports: [], // Add necessary imports like CommonModule, etc.
      templateUrl: './batch.component.html',
      styleUrl: './batch.component.css'
    })
    export class BatchComponent implements OnInit {
      batchData = signal<BatchData[]>([]); // Existing signal

      constructor(private batchService: BatchService) { }

      ngOnInit(): void {
        this.fetchBatchData();
      }

      fetchBatchData(): void {
        this.batchService.getBatches().subscribe({
          next: (data) => {
            this.batchData.set(data); // Update the signal with data from backend
          },
          error: (err) => {
            console.error('Error fetching batches:', err);
            // Implement user-friendly error handling (e.g., display a message)
          }
        });
      }
    }
    ```

5.  **Table and Filter Components**: The `table.component.ts` and `filtersearch.component.ts` are designed to be generic. As long as the data provided to them (via inputs) conforms to the expected interfaces, they will display and filter the backend data without requiring significant changes themselves.

    *   **Data Transformation**: If your backend API returns data in a format that doesn't directly match the frontend interfaces, perform the necessary transformations within your Angular services or components before updating the signals that feed into the table/filter.

## Development Setup

1.  **Clone the repository**:
    ```bash
    git clone https://github.com/QusaiSak/concepts.git
    cd concepts
    ```
2.  **Install dependencies**:
    ```bash
    npm install
    ```
3.  **Run the application**:
    ```bash
    ng serve
    ```
    The application will be available at `http://localhost:4200/`.

Feel free to reach out if you have any questions regarding the frontend integration.
