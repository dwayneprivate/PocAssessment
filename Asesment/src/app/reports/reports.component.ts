import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { Employee } from 'src/Classes/employee';

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.scss']
})
export class ReportsComponent implements OnInit {

  //Variables
  employeeData : any = [];
  headElements = ["Employee Number","Name", "Surname","Birthdate","Salary"]
  Managers: any = [];
  Employees: any = [];
  Trainees: any = [];
  ManagersIncome : number = 0;
  EmployeesIncome : number = 0;
  TraineesIncome : number = 0;
  TotalIncome : number = 0;
  AverageIncome : number = 0;
  temp : any;

  //Highest Earner attributes
  hempNumber : number;
  hempName : string;
  hempSurname : string;
  hempSalary : number;
  hempBirthDate : Date;
  hempRoleDesc : string;
  hempReportLine : number;


  constructor(public dataService : DataService) { }

  async ngOnInit() {
    await this.dataService.RetrieveEmployees().toPromise().then(data => {
      this.employeeData = data
    })

    //Sorts the Managers/employees/trainees into respective arrays
    for (var i = 0; i < this.employeeData.length;i++){
      console.log(this.employeeData[i].empRoleDesc);
      if (this.employeeData[i].empRoleDesc == "Manager"){
        this.Managers.push(this.employeeData[i]);
        this.ManagersIncome = this.ManagersIncome + this.employeeData[i].empSalary;
      }
      else if (this.employeeData[i].empRoleDesc == "Employee"){
        this.Employees.push(this.employeeData[i]);
        this.EmployeesIncome = this.EmployeesIncome + this.employeeData[i].empSalary;
      }
      else if (this.employeeData[i].empRoleDesc == "Trainee"){
        this.Trainees.push(this.employeeData[i]);
        this.TraineesIncome = this.TraineesIncome + this.employeeData[i].empSalary;
      }
    }//for
    
    //Calculations
    this.TotalIncome = this.ManagersIncome + this.EmployeesIncome + this.TraineesIncome;
    this.AverageIncome = this.TotalIncome/this.employeeData.length;

    //Sorting each array in descending order according to salary
    this.Managers.sort(function(a,b){
      return b.empSalary - a.empSalary;
    });
    this.Employees.sort(function(a,b){
      return b.empSalary - a.empSalary;
    });
    this.Trainees.sort(function(a,b){
      return b.empSalary - a.empSalary;
    });

    //Finding the highest earner
    this.employeeData.sort(function(a,b){
      return b.empSalary - a.empSalary;
    });
    this.hempNumber = this.employeeData[0].empNumber;
    this.hempName = this.employeeData[0].empName;
    this.hempSurname = this.employeeData[0].empSurname;
    this.hempSalary = this.employeeData[0].empSalary;
    this.hempBirthDate = this.employeeData[0].empBirthDate.substring(0,10);
    this.hempRoleDesc = this.employeeData[0].empRoleDesc;
  
  }

}
