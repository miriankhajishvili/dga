import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { BrowserModule } from '@angular/platform-browser';
import { FilmsService } from '../../core/services/films.service';
import { FilmsInterceptor } from '../../core/interceptors/films.interceptor';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule, MatLabel } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButton, MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatSort, Sort, MatSortModule } from '@angular/material/sort';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { IFilm } from '../../core/interfaces/films.interface';

export interface PeriodicElement {
  position: number;
  title: string;
  year: number;
  titleType: string;
}

@Component({
  selector: 'app-task-2',
  standalone: true,
  imports: [
    MatCardModule,
    HttpClientModule,
    CommonModule,
    MatLabel,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    FormsModule,
    MatTableModule,
    MatSortModule,
  ],
  providers: [
    FilmsService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: FilmsInterceptor,
      multi: true,
    },
  ],
  templateUrl: './task-2.component.html',
  styleUrl: './task-2.component.scss',
})
export class Task2Component implements OnInit, AfterViewInit {
  films: IFilm[] = [];
  filteredFilms: IFilm[] = [];
  searchTerm!: string;
  displayedColumns: string[] = [
    'position',
    'image',
    'title',
    'year',
    'titleType',
  ];
  dataSource = new MatTableDataSource<PeriodicElement>();

  @ViewChild(MatSort) sort!: MatSort;
  constructor(
    private _liveAnnouncer: LiveAnnouncer,
    private filmsService: FilmsService
  ) {}

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
  }
  ngOnInit(): void {
    this.getFilms();
  }

  getFilms() {
    this.filmsService.getAllFilm({ search: 'dog' }).subscribe({
      next: (data) => {
        this.films = data.results;
        console.log(data.results);
      },
      error: (error) => {
        console.error('Error fetching films', error);
      },
    });
  }

  getFilterFilm(filterInput: string) {
    if (!filterInput.trim()) {
      // Clear the table data if input is empty
      this.dataSource.data = [];
      return;
    }
    this.filmsService.getAllFilm({ search: filterInput }).subscribe({
      
      next: (data) => {
          const periodicElements = data.results.map(
            (data: IFilm, index: number) => ({
              position: index + 1,
              title: data.title,
              year: data.year,
              titleType: data.titleType,
              image: data.image?.url || '',
            })
          );
          this.dataSource.data = periodicElements;
        
      },
      error: (error) => {
        console.error('Error fetching films', error);
      },
    });
  }
  announceSortChange(sortState: Sort) {
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }
}
