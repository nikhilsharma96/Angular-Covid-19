import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DataComponent } from '../data/data.component';
import { DistrictWiseComponent } from '../district-wise/district-wise.component';


const routes: Routes = [
  {path:'home', component:DataComponent},
  {path:'',redirectTo:'/home',pathMatch:'full'},
  {path:'state/:statecode',component:DistrictWiseComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
