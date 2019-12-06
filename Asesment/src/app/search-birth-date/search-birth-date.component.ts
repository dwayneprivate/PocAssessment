import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { DataService } from '../data.service';

@Component({
  selector: 'app-search-birth-date',
  templateUrl: './search-birth-date.component.html',
  styleUrls: ['./search-birth-date.component.scss']
})
export class SearchBirthDateComponent implements OnInit {

  //Alert message
  @ViewChild('alert', { static: true }) alert: ElementRef;

  //Variables
  headElements = ["Employee Number","Name", "Surname","Birthdate","Role Description","Salary"]
  employeeData : any = [];
  filteredEmployees : any = [];
  beforeAfter = "Before";
  datePicked : Date;

  constructor(public dataService : DataService) { }

  ngOnInit() {
    this.dataService.RetrieveEmployees().subscribe(data => {
      this.employeeData = data
      console.log(this.employeeData);
    })
  }
  //Alert message
  closeAlert() {
    this.alert.nativeElement.classList.remove('show');
  }
  //Alert message
  showAlert() {
    this.alert.nativeElement.classList.add('show');
  }
  //Filter employees accroding to date selected
  filterEmployees() {
    this.filteredEmployees = [];
    if (this.datePicked){
      if (this.beforeAfter == "Before"){
        for (var i = 0; i < this.employeeData.length;i++){
          if (this.employeeData[i].empBirthDate < this.datePicked){
            this.filteredEmployees.push(this.employeeData[i]);
          }
        }
      }
      else if (this.beforeAfter == "After"){
        for (var i = 0; i < this.employeeData.length;i++){
          if (this.employeeData[i].empBirthDate > this.datePicked){
            this.filteredEmployees.push(this.employeeData[i]);            
          }
        }
      }
    }
    else if (!this.datePicked) {
      this.showAlert();
    }
  }
}

