import {Component, OnInit} from '@angular/core';
import {Employee} from "../../models/employee";
import {EmployeeService} from "../../services/employee.service";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-get-employee',
  templateUrl: './get-employee.component.html',
  styleUrls: ['./get-employee.component.css']
})
export class GetEmployeeComponent implements OnInit{
  id = this.actRoute.snapshot.params['id']
  employeeData: any = {};
  constructor(private employeeService: EmployeeService,
              public actRoute: ActivatedRoute,
              public router: Router) {}

  ngOnInit(): void {
    this.employeeService.getEmployee(this.id).subscribe((data: {}) => {
      this.employeeData = data;
    });
  }
}
