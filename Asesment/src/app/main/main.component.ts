import { Component, OnInit } from '@angular/core';
import {MatTreeNestedDataSource} from '@angular/material/tree';
import {NestedTreeControl} from '@angular/cdk/tree';
import { DataService } from '../data.service';
import { observable, of as observableOf } from 'rxjs';


interface FileNode {
  children?: FileNode[];
  empRoleDesc : string;
  empNumber : number;
  empName : string;
  empSurname : string;
  empBirthDate : string;
  empSalary : number;
  empReportLine : number;
}


@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {

  treeControl = new NestedTreeControl<FileNode>(node => node.children);
  dataSource = new MatTreeNestedDataSource<FileNode>();

  constructor(public dataService : DataService) { 
    dataService.RetrieveTreeView().toPromise().then((x: any) => {
      this.dataSource.data = x;
    })
  }

  private _getChildren = (node: FileNode) => {return observableOf(node.children);};

  hasChild = (_: number, node: FileNode) => !!node.children && node.children.length > 0;

  ngOnInit() {
  }

}
