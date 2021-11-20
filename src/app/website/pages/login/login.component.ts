import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '@service/auth.service';

@Component( {
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: [ './login.component.scss' ]
} )
export class LoginComponent implements OnInit {

  myForm: FormGroup = this.fb.group( {
    email: [ 'admin@hotmail.com', [ Validators.required ] ],
    password: [ '12345678', [ Validators.required ] ]
  } );

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit (): void {
  }

  handleSubmit () {
    console.log( this.myForm.value );
    this.authService.login( this.myForm.get( 'email' )?.value, this.myForm.get( 'password' )?.value ).subscribe( resp => {
      this.router.navigateByUrl( "/admin/tramites" );
    } );
  }
}
