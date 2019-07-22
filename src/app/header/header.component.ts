import { Component, OnInit } from '@angular/core';
import { DataService } from '../content/services/data.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private dataService: DataService) { }

  ngOnInit() {
  }

  onGenTestData() {
    this.dataService.fillTestData();
  }

}
