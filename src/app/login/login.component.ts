import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  
  public today: number = Date.now();
  nombreUsuarioControl = new FormControl('');
  contrasenaUsuarioControl = new FormControl('');

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  onSubmit(){
    this.router.navigate(['/page']);
  }

}
