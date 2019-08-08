import { Component, OnInit } from '@angular/core';

import { ServerService } from '../services/server.service';
import { Option } from '../entities.model';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-recommendations',
  templateUrl: './recommendations.component.html',
  styleUrls: ['./recommendations.component.css']
})
export class RecommendationsComponent implements OnInit {

  constructor(private server: ServerService, private data: DataService) {}

  results: Option[] = [];
  isFetching = true;
  error = null;

  ngOnInit() {
    this.server.getResults(this.data.decision.id).subscribe(response => {
      this.results = response as Option[];
      this.isFetching = false;
    }, errorResponse => {
      this.error = errorResponse;
      this.isFetching = false;
      console.log(errorResponse);
    });
  }

  onHandleError() {
    this.error = null;
  }

}
