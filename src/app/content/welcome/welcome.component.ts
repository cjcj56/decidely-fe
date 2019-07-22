import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

import { ServerService } from '../services/server.service';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']
})
export class WelcomeComponent implements OnInit {

  constructor(private server: ServerService, private router: Router, private http: HttpClient) { }

  ngOnInit() {
  }

  onSubmit(form: NgForm) {
    const decisionId = form.value.decisionId;
    
  }

  onNewDecision() {
    this.router.navigate(['/decision']);
  }

}
