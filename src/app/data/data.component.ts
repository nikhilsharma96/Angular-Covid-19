import { Component, OnInit } from '@angular/core';
import { GetDataService } from '../services/get-data.service';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';
import * as Highcharts from "highcharts/highstock";
import { Options } from "highcharts/";
import IndicatorsCore from "highcharts/indicators/indicators";
import IndicatorZigzag from "highcharts/indicators/zigzag";
// import { type } from 'os';

IndicatorsCore(Highcharts);
IndicatorZigzag(Highcharts);


@Component({
  selector: 'app-data',
  templateUrl: './data.component.html',
  styleUrls: ['./data.component.css']
})
export class DataComponent implements OnInit {
  
  title:any;
  temp1:any;
  decide=false;
  district:any;
  totalTesting:any;
  testedTotal:any;
  testedState:any;
  append:any[]=[];
  testingCharts:any[]=[];
  prevSortedBy = null;
  asc = true;
  testArray=[]

  Highcharts: typeof Highcharts = Highcharts;
  chartOptions: Options;

  constructor(private serve:GetDataService,
    private router:Router){}        

  ngOnInit():void{
  this.serve.getStateWiseData().subscribe((data)=>{
    this.title=data;
    this.comeOn();
  });
  this.serve.getTestData()
  .subscribe((data)=>{  this.testedState=data;
    
    for (let item in this.testedState){
      this.testArray.push({
        "statecode":item,
        "tested":this.testedState[item].total.tested
      })
    }
    console.log(this.testedState,this.testArray);
  //  this.sortByTests('abcd')
  });
  
}

sortBy(value) {
   if (this.prevSortedBy === value) {
     this.asc = !this.asc;
   } else {
     this.asc = true;
   }
   this.prevSortedBy = value;
   this.sortByTests(value);
 }

 sortByField(value) {
   var nameA:any;
   var nameB:any;
   if (this.asc) {
      this.title.statewise.sort(function (a, b) {
      if (value=='state'){
        nameA = a[value].toLowerCase();
        nameB = b[value].toLowerCase();
      }
      else{
        nameA = +a[value];
        nameB = +b[value];
      }
       if (nameA < nameB)
         return -1
       if (nameA > nameB)
         return 1
       return 0;
     })
   } else{
      this.title.statewise.sort(function (a, b) {
        if (value=='state'){
          nameA = a[value].toLowerCase();
          nameB = b[value].toLowerCase();
        }
        else{
          nameA = +a[value];
          nameB = +b[value];
        }
       if (nameA < nameB)
         return 1
       if (nameA > nameB)
         return -1
       return 0;
     })
   }
 }
 value:string;
 sortByTests(value){

  if (this.asc){
    this.testArray.sort(function(a,b){
      if (a.tested > b.tested) {
        return -1;
      }
      if (a.tested<b.tested) {
        return 1;
      }
      return 0;
    })
  }
  else{
    this.testArray.sort(function(a,b){
      if (a.tested > b.tested) {
        return 1;
      }
      if (a.tested<b.tested) {
        return -1;
      }
      return 0;
    })
  }
  console.log(this.testArray)

  // console.log(this.temp,value);
 }
  comeOn(){

    this.temp1=this.title.statewise;
    this.totalTesting = this.title.tested;
    this.testedTotal= this.totalTesting[this.totalTesting.length-1];
    // this.title.cases_time_series.forEach(element => {
    //      if (new Date(element.date)>=new Date('13 March'))
    //         this.append.push(+element.dailyconfirmed)
    // });
    // this.title.tested.forEach(element => {
    //   //  if(+element.samplereportedtoday>0)
    //      this.testingCharts.push(+element.samplereportedtoday)
    // });
  }

 
  
  expandMe(data){
    this.router.navigate(['state',data]);
  }

  
}
