import { Component, OnInit, HostListener, ViewChild, ChangeDetectorRef } from '@angular/core';
import { MdbTablePaginationComponent, MdbTableDirective } from 'angular-bootstrap-md';
import { DataService } from '../data.service';

@Component({
  selector: 'app-search-employees',
  templateUrl: './search-employees.component.html',
  styleUrls: ['./search-employees.component.scss']
})
export class SearchEmployeesComponent implements OnInit {

  //Pagination
  @ViewChild(MdbTablePaginationComponent, { static: true }) mdbTablePagination: MdbTablePaginationComponent;
  @ViewChild(MdbTableDirective, { static: true }) mdbTable: MdbTableDirective

  //Variables
  employeeData : any = [];
  Empty = false;
  headElements = ["Employee Number","Name", "Surname","Birthdate","Role Description","Salary"]
  previous: any = [];
  searchText: string = '';
  previousString: string;
  updateData : any = [];

  constructor(public dataService : DataService, public cdRef: ChangeDetectorRef) { }

  //Listner for search input
  @HostListener('input') oninput() {
    this.searchItems();
  }
 
  //Filters table according to search input
  searchItems() {
    const prev = this.mdbTable.getDataSource();

    if (!this.searchText) {
      this.mdbTable.setDataSource(this.previous);
      this.employeeData = this.mdbTable.getDataSource();
    }

    if (this.searchText) {
      this.employeeData = this.mdbTable.searchLocalDataBy(this.searchText);
      this.mdbTable.setDataSource(prev);
    }
  }

  //Pagination
  ngAfterViewInit() {
   
    this.mdbTablePagination.setMaxVisibleItemsNumberTo(10);

    this.mdbTablePagination.calculateFirstItemIndex();
    this.mdbTablePagination.calculateLastItemIndex();
    this.cdRef.detectChanges();
  }


  ngOnInit() {
    this.loadTable();
  }
  
  //Function called to load table with initial data
  async loadTable(){
    await this.dataService.RetrieveEmployees().toPromise().then(data => {
      this.employeeData = data;
      
      if (this.employeeData.length == 0) {
        this.Empty = true;
      }
    })
    console.log(this.employeeData);
    this.mdbTable.setDataSource(this.employeeData);
    this.employeeData = this.mdbTable.getDataSource();
    this.previous = this.mdbTable.getDataSource();
  }

}

