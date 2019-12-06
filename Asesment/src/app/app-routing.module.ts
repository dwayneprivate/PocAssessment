import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainComponent } from './main/main.component';
import { SearchEmployeesComponent } from './search-employees/search-employees.component';
import { SearchBirthDateComponent } from './search-birth-date/search-birth-date.component';
import { ReportsComponent } from './reports/reports.component';


const routes: Routes = [
  {path: '', component : MainComponent},
  {path: 'searchEmployees', component : SearchEmployeesComponent},
  {path: 'searchBirthDate', component : SearchBirthDateComponent},
  {path: 'report', component : ReportsComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
