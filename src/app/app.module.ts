import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { DataComponent } from './data/data.component';
import { AppRoutingModule } from './routing/app-routing.module';
import { GetDataService } from './services/get-data.service';
import { DistrictWiseComponent } from './district-wise/district-wise.component';
import { OrderrByPipe } from './shared/sorting.pipe';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HighchartsChartModule } from 'highcharts-angular';



@NgModule({
  declarations: [
    AppComponent,
    DataComponent,
    DistrictWiseComponent,
    OrderrByPipe,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HighchartsChartModule
  ],
  providers: [GetDataService],
  bootstrap: [AppComponent]
})
export class AppModule { }
