import { Component } from '@angular/core';
import { DataService } from '../content/services/data.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {

  constructor(private data: DataService) { }

  onGenTestData() {
    this.data.fillTestData();
  }

}
