import { Component, OnInit } from '@angular/core';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-options-factors-matrix',
  templateUrl: './options-factors-matrix.component.html',
  styleUrls: ['./options-factors-matrix.component.css']
})
export class OptionsFactorsMatrixComponent implements OnInit {

  constructor(private dataService: DataService) { }

  ngOnInit() {
  }

}
