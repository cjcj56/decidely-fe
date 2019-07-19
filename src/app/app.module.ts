import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { FooterComponent } from './footer/footer.component';
import { ContentComponent } from './content/content.component';
import { DecisionInputComponent } from './content/decision-input/decision-input.component';
import { OptionsFactorsInputComponent } from './content/options-factors-input/options-factors-input.component';
import { OptionsFactorsMatrixComponent } from './content/options-factors-matrix/options-factors-matrix.component';
import { RecommendationsComponent } from './content/recommendations/recommendations.component';
import { WelcomeComponent } from './content/welcome/welcome.component';
import { AboutComponent } from './content/about/about.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    SidebarComponent,
    FooterComponent,
    ContentComponent,
    DecisionInputComponent,
    OptionsFactorsInputComponent,
    OptionsFactorsMatrixComponent,
    RecommendationsComponent,
    WelcomeComponent,
    AboutComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
