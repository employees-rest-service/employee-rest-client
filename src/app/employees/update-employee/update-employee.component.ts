import {Component, OnInit} from '@angular/core';
import {EmployeeService} from "../../services/employee.service";
import {ActivatedRoute, Router} from "@angular/router";
import {Employee} from "../../models/employee";

@Component({
  selector: 'app-update-employee',
  templateUrl: './update-employee.component.html',
  styleUrls: ['./update-employee.component.css']
})
export class UpdateEmployeeComponent implements OnInit{
  id = this.actRoute.snapshot.params['id']
  employeeData: any = {};
  constructor(private employeeService: EmployeeService,
  public actRoute: ActivatedRoute,
  public router: Router) {}

  ngOnInit(): void {
    this.employeeService.getEmployee(this.id).subscribe((data: {}) => {
      this.employeeData = data
    });
  }
  update(name:string, surname:string, email:string, salary:string, department:string) {
    this.employeeData = {
      id: this.id,
      name: name,
      surname: surname,
      email: email,
      salary: Number(salary),
      department: department
    };
    this.employeeService.update(this.id, this.employeeData).subscribe(() => {
      this.router.navigate([''])
    });
  }
}
