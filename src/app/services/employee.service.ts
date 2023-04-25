import { Injectable } from '@angular/core';
import {HttpBackend, HttpClient, HttpHeaders, HttpResponse, HttpStatusCode} from "@angular/common/http";
import {Employee} from "../models/employee";
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  SERVER_API = "http://localhost:8080/api/employees/";
  responseStatus: any;
  constructor(private http: HttpClient) {
  }
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };

  getAll(): Observable<any> {
    return this.http.get(this.SERVER_API);
  }

  save(name:string, surname:string, email:string, salary:number, department:string): Observable<any>{
    const employee: Employee = {
      name: name,
      surname: surname,
      email: email,
      salary: salary,
      department: department
    };
    return this.http.post(this.SERVER_API, employee);
  }

  update(id:any, employee:any): Observable<Employee> {
    const urlUpdate:string = this.SERVER_API;
    return this.http
      .put<Employee>(urlUpdate, JSON.stringify(employee), this.httpOptions)
      .pipe(retry(1), catchError(this.handleError));
  }

  getEmployee(id:number): Observable<Employee>{
    const urlGet:string = this.SERVER_API + id;
    this.http.get(urlGet, {observe: 'response'});
      return this.http
        .get<Employee>(urlGet)
        .pipe(retry(1), catchError(this.handleError));
  }

  delete(id: number): Observable<any> {
    const urlDelete:string = this.SERVER_API + id;
    return this.http.delete<Employee>(urlDelete, this.httpOptions);
  }

  handleError(error: any) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      errorMessage = error.error.message;
    } else {
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    window.alert(errorMessage);
    return throwError(() => {
      return errorMessage;
    });
  }
}
