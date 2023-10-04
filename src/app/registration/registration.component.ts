import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from '../services/authentication.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {
  regesterForm:any;
  submitted = false;
  loading = false;
  error = '';
  constructor(private auth:AuthenticationService, 
    private formBuilder: FormBuilder,
    private router: Router,){
  
   }
  ngOnInit(): void {
    this.regesterForm = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
      first_name: ['', Validators.required],
      last_name: ['', Validators.required],
      isadmin:[false, Validators.required],
    })


  }


  get f() { return this.regesterForm.controls; }

  onSubmit(){
    this.submitted = true;

    // stop here if form is invalid
    if (this.regesterForm.invalid) {
        return;
    }
  
    this.loading = true;
    this.auth.register(this.regesterForm.value).subscribe(
            data => {
              if(data.status == 'Success')
                this.router.navigate(['/login']);
            },
            error => {
                this.error = error;
                this.loading = false;
            });
  }
  }
