import { Component, OnInit } from '@angular/core';
import { GlobalService } from './global.service';
import { DataService } from './data.service';
import { Employee } from 'src/Classes/employee';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'Assessment';

  constructor(public dataservice : DataService, public globals : GlobalService) { }

  ngOnInit() {
  }
}
