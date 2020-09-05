import { Component, OnInit, Input, Directive, Output, EventEmitter, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GetDataService } from '../services/get-data.service';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-district-wise',
  templateUrl: './district-wise.component.html',
  styleUrls: ['./district-wise.component.css']
})

export class DistrictWiseComponent implements OnInit {
  result=[];
  temproary:any;
  statecodeString:any;
  testResult=[];

  constructor(private activatedRoute: ActivatedRoute,
    private serve:GetDataService) { }
    statecode:any;
    stateTested:any;

    ngOnInit(): void {
      this.activatedRoute.params.subscribe((params)=>{
      this.statecode=params;
      var tn=JSON.stringify(this.statecode);
      this.statecodeString= JSON.parse(tn);

      this.getData(this.statecodeString);
    });

    this.serve.getTestData().subscribe((data)=>{
      this.stateTested=data;
      this.getDistrictWisedata()
    }); 

  }
  
 
  getData(statecode){
    this.serve.getStateWiseData().subscribe((data)=>{
      for(var key in data)
      {
        if(key==='statewise'){
          this.temproary=data[key];
          this.getStateData(this.temproary);
        }      
      }
    })

    this.serve.getDistrictWiseData().
    subscribe((data)=>{
      for(var key in data)
      {
        if(data[key].statecode===this.statecodeString.statecode){
          this.result=data[key].districtData;
          // console.log(this.result)
        }
      };
    });
  }

  getStateData(state:any){
    for(var key in state)
    {
      if(state[key].statecode===this.statecodeString.statecode){
        this.temproary=state[key];
      }
    }
  }

  getDistrictWisedata(){
    for(var key in this.stateTested)
    {
      if(key===this.statecode.statecode){
        this.testResult=this.stateTested[key].districts;
        console.log(this.testResult)
        this.sortData(this.testResult);
      }
    }
  }
  sortByName(a,b) {
    if (a.total.confirmed < b.total.confirmed)
    return -1;
    if (a.total.confirmed > b.total.confirmed)
    return 1;
    return 0;
    }

  sortData(temp){
    Object.entries(temp).filter((a,b) =>{
      JSON.parse(JSON.stringify(a)).forEach((p,q)=>{
        console.log(p,q)
      })
        // console.log(JSON.parse(JSON.stringify(p)))
    
        // if (a.total.confirmed < b.total.confirmed)
        //     return -1;
        // if (a.total.confirmed > b.total.confirmed)
        //     return 1;
        // return 0;
    })
    }
  }

