import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { WelcomeComponent } from './content/welcome/welcome.component';
import { AboutComponent } from './content/about/about.component';
import { DecisionInputComponent } from './content/decision-input/decision-input.component';
import { OptionsFactorsInputComponent } from './content/options-factors-input/options-factors-input.component';
import { OptionsFactorsMatrixComponent } from './content/options-factors-matrix/options-factors-matrix.component';
import { RecommendationsComponent } from './content/recommendations/recommendations.component';
import { DataGuard } from './guards/data.guard';


const routes: Routes = [
  { path: '', redirectTo: '/welcome', pathMatch: 'full' },
  { path: 'welcome', component: WelcomeComponent },
  { path: 'about', component: AboutComponent },
  { path: 'decision', component: DecisionInputComponent },
  { path: 'options-n-factors', component: OptionsFactorsInputComponent, canActivate: [DataGuard] },
  { path: 'matrix', component: OptionsFactorsMatrixComponent, canActivate: [DataGuard] },
  { path: 'recommendations', component: RecommendationsComponent, canActivate: [DataGuard] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
