import {Component, OnInit} from '@angular/core';
import {Employee} from "../../models/employee";
import {EmployeeService} from "../../services/employee.service";
import {Router} from "@angular/router";
import {HttpStatusCode} from "@angular/common/http";

@Component({
  selector: 'app-view-add-delete',
  templateUrl: './view-add-delete.component.html',
  styleUrls: ['./view-add-delete.component.css']
})
export class ViewAddDeleteComponent implements OnInit {
  employees: Employee[] = [];

  constructor(private employeeService: EmployeeService, public router: Router) {
  }

  ngOnInit(): void {
    this.employeeService.getAll()
      .subscribe(data => {
        this.employees = data;
      });
  }

  save(name: string, surname: string, email: string, salary: string, department: string) {
    let salaryInNumber: number = Number(salary);
    this.employeeService.save(name, surname, email, salaryInNumber, department)
      .subscribe(data => {
        this.employees.push(data);
      });
  }

  delete(employee: Employee, index: number) {
    if (employee.id != null) {
      this.employeeService.delete(employee.id).subscribe(()=>(""));
      this.employees.splice(index, 1);
    }
  }
}
