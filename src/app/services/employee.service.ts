import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Employee } from '../interfaces/employee';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

   //constante de la url de la api
   private apiServerUrl = environment.apiBaseUrl;

  constructor(private httpCliente: HttpClient) { 

  }

  public getEmployees(): Observable<Employee[]> {
    return this.httpCliente.get<Employee[]>(`${this.apiServerUrl}/employee/all`);
  }

  public addEmployee(employee: Employee): Observable<Employee> {
    return this.httpCliente.post<Employee>(`${this.apiServerUrl}/employee/add`, employee);
  }

  public updateEmployee(employee: Employee): Observable<Employee> {
    return this.httpCliente.put<Employee>(`${this.apiServerUrl}/employee/update`, employee);
  }

  public deleteEmployee(employeeId: number): Observable<void> {
    return this.httpCliente.delete<void>(`${this.apiServerUrl}/employee/delete/${employeeId}`);
  }

}
