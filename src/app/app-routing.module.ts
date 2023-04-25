import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {GetEmployeeComponent} from "./employees/get-employee/get-employee.component";
import {UpdateEmployeeComponent} from "./employees/update-employee/update-employee.component";
import {ViewAddDeleteComponent} from "./employees/view-add-delete/view-add-delete.component";
import {AppComponent} from "./app.component";

const routes: Routes = [
  // { path: '', component: AppComponent},
  { path: '', component: ViewAddDeleteComponent },
  { path: 'update-employee/:id', component: UpdateEmployeeComponent },
  { path: 'get-employee/:id', component: GetEmployeeComponent }
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
