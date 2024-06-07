import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { EmployeeFormComponent } from "./employee-form/employee-form.component";

@Component({
    selector: 'app-root',
    standalone: true,
    templateUrl: './app.component.html',
    styleUrl: './app.component.css',
    imports: [RouterOutlet, EmployeeFormComponent]
})
export class AppComponent {
  title = 'form-unit-testing';
}
