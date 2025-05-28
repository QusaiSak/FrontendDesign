# 🌟 Angular Concepts Application

This project is an Angular application designed to demonstrate modern Angular concepts, including:

- ⚙️ **Standalone Components**
- 🔁 **Signal-Based State Management**
- 🎨 **Tailwind CSS for Styling**
- 🧩 **Reusable UI Components** (like dynamic table & filter search)

It emphasizes **modularity**, **responsiveness**, and **clarity** in frontend design patterns.

---

## 📁 Project Structure Overview

```text
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
│   ├── app.component.*         # Root component files
│   ├── app.config.ts           # App-level providers and config
│   ├── app.routes.ts           # Application routing configuration
│   ├── component/  
│   │   ├── Barcode             
│   │   │   ├── batch/
│   │   │   ├── envelope/
│   │   │   ├── student/
│   │   ├── status/
│   │   └── shared/             # Common UI elements (e.g., table, filter   search)
│   ├── guard/                  # Route guards (if any)
│   ├── interceptor/            # HTTP interceptors (e.g., auth tokens)
│   ├── pipe/                   # Custom pipes for transformation/filtering
│   └── service/                # API communication services
├── index.html
├── main.ts
└── styles.css
````

---

## 🔍 Key Folder Highlights

* **`component/`** — Self-contained, standalone Angular components using **Signals**.
* **`pipe/`** — Custom pipes like `filter.pipe.ts`, `filter-bydropdown.pipe.ts` for filtering logic.
* **`service/`** — Centralized services for API communication using Angular’s `HttpClient`.
* **`public/`** — Static assets like images and icons.

---

## 🔁 Frontend Data Flow

All component-level state is managed using **Angular Signals** (reactive primitives).
Currently, data is **locally initialized** via signals, with no backend interaction.
Each component handles its own state **independently** and **reactively**.

---

## 🌐 Backend Integration Guide

Integrate your backend API in 4 easy steps:

### 1️⃣ Define Interfaces

Ensure backend responses align with your TypeScript interfaces.

```ts
export interface BatchData {
  id: number;
  name: string;
  // ...other properties
}
```

### 2️⃣ Create Services (`src/app/service/`)

```ts
// src/app/service/batch.service.ts
import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface BatchData {
  id: number;
  name: string;
}

@Injectable({
  providedIn: 'root'
})
export class BatchService {
  private apiUrl = 'YOUR_BACKEND_API_URL/batches';

  constructor(private http: HttpClient) {}

  getBatches(): Observable<BatchData[]> {
    return this.http.get<BatchData[]>(this.apiUrl);
  }

  // Add POST, PUT, DELETE methods as needed
}
```

### 3️⃣ Enable `HttpClient` in `app.config.ts`

```ts
// src/app/app.config.ts
import { provideHttpClient } from '@angular/common/http';

export const appConfig: ApplicationConfig = {
  providers: [
    provideHttpClient() // Enables HttpClient throughout the app
  ]
};
```

### 4️⃣ Inject Service in Component

```ts
// src/app/component/batch/batch.component.ts
import { Component, OnInit, signal } from '@angular/core';
import { BatchService, BatchData } from '../../service/batch.service';

@Component({
  selector: 'app-batch',
  standalone: true,
  templateUrl: './batch.component.html',
  styleUrls: ['./batch.component.css']
})
export class BatchComponent implements OnInit {
  batchData = signal<BatchData[]>([]);

  constructor(private batchService: BatchService) {}

  ngOnInit(): void {
    this.fetchBatchData();
  }

  fetchBatchData(): void {
    this.batchService.getBatches().subscribe({
      next: (data) => this.batchData.set(data),
      error: (err) => console.error('Failed to fetch batch data', err)
    });
  }
}
```

---

## 🧩 Component Reusability

* `table.component.ts` and `filtersearch.component.ts` are **generic, reusable components**.
* If your backend data aligns with expected formats, no modifications are needed.
* If not, **transform data** in the service or component before assigning it to signals.

---

## ⚙️ Development Setup

To run this app locally:

```bash
# 1. Clone the repository
git clone https://github.com/QusaiSak/FrontendDesign.git
cd concepts

# 2. Install dependencies
npm install

# 3. Run the Angular application
ng serve
```

🔗 Access the app at: [http://localhost:4200](http://localhost:4200)

---

## 🛠️ Tech Stack

| Tech            | Purpose                          |
| --------------- | -------------------------------- |
| Angular         | Framework for SPA development    |
| Angular Signals | State management (reactive)      |
| Tailwind CSS    | Styling framework                |
| RxJS            | Reactive streams and observables |
| TypeScript      | Typed JavaScript for robustness  |

---
