import { HttpErrorResponse } from '@angular/common/http';
import { Component,OnChanges,OnInit, SimpleChanges } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Employee } from './interfaces/employee';
import { EmployeeService } from './services/employee.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnChanges{
  cargando = false;
  [x: string]: any;
  public employees: Employee[] = [];
  public editEmployee!: Employee;
  public deleteEmployee!: Employee;
  public search: string = '';
  public valorSearch: string = '';
  public mensaje: string = "Espere, por favor";

  constructor(private employeeService: EmployeeService) { }


  ngOnChanges(changes: SimpleChanges): void {
    this.getEmployees();
  }
  

  ngOnInit(): void {
    this.getEmployees();
  }

  //Metodo principal para listar desde la api
  public getEmployees(): void{
    this.employeeService.getEmployees().subscribe(
       (response: Employee[]) => {
        this.employees = response;
        this.cargando = true;
        this.mensaje = "¡La información ya cargo!"
       }, 
       (error: HttpErrorResponse) => {
        //alert(error.message);
       }
    );
  }

  //Metodo para abrir una ventana modal 
  public onOpenModal(employee: Employee, mode: string): void {
    const container = document.getElementById('main-container');
    const button = document.createElement('button');
    button.type = 'button';
    button.style.display = 'none';
    button.setAttribute('data-bs-toggle', 'modal');
   
    if(mode === 'edit'){
      this.editEmployee = employee;
      button.setAttribute('data-bs-target', '#updateEmployeeModal')
    }

    if(mode === 'delete'){
      this.deleteEmployee = employee;
      button.setAttribute('data-bs-target', '#deleteEmployeeModal')
    }
    container?.appendChild(button);   
    button.click(); 
  }

  //Metodo para abrir una ventana modal 
  public onOpenModalAdd(mode: string): void {
    const container = document.getElementById('main-container');
    const button = document.createElement('button');
    button.type = 'button';
    button.style.display = 'none';
    button.setAttribute('data-bs-toggle', 'modal');
    if(mode === 'add'){
      button.setAttribute('data-bs-target', '#addEmployeeModal')
    }
    container?.appendChild(button);   
    button.click(); 
  }

  public onAddEmloyee(addForm: NgForm): void {
    document.getElementById('add-employee-form')?.click();
    this.employeeService.addEmployee(addForm.value).subscribe(
      (response: Employee) => {
          //Todo: Esto no es buena practica, buscar manera de no recargar la pagina
          location.reload();
      }, 
      (error: HttpErrorResponse) => {
        alert(error.message)
      }
    );
  }

  public onUpdateEmloyee(employee: Employee){
    this.employeeService.updateEmployee(employee).subscribe(
      (response: Employee) => {
          location.reload();
      },(error: HttpErrorResponse) => {
        alert(error.message)
      }
    );
  }

  
  public onDeleteEmployee(employeeId: number){
    this.employeeService.deleteEmployee(employeeId).subscribe(
      (response: any) => {
          console.log(response);
          this.getEmployees();
          location.reload();
      },(error: HttpErrorResponse) => {
        //alert(error.message)
        this.getEmployees();
        location.reload();
      }
    );
  }


  public onSearchEmployee(_search:string):void {
    this.search = _search;
    console.log(this.search);
    const results: Employee[] = [];
    for(const employee of this.employees){
      if(employee.name.toLowerCase().indexOf(this.search.toLowerCase())!= -1
      || employee.email.toLowerCase().indexOf(this.search.toLowerCase())!= -1
      || employee.phone.toLowerCase().indexOf(this.search.toLowerCase())!= -1
      || employee.jobTitle.toLowerCase().indexOf(this.search.toLowerCase())!= -1
      ){
        results.push(employee);
      }
    }
    this.employees = results;
    if(results.length === 0 || !this.search){
      this.getEmployees();
    }
  }
  
  public clearSearch():void{
    if(this.search.length >= 0){
      this.valorSearch = '';
      this.search = '';
      this.getEmployees();
    }
    
  }
}
