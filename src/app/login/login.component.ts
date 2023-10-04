import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder} from '@angular/forms';
import { AuthenticationService } from '../services/authentication.service';
import { first } from 'rxjs/operators';
import { ActivatedRoute, Router } from '@angular/router';
@Component({
  selector: 'app-root',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
 signupForm: any;
 submitted = false;
 loading = false;
 returnUrl: string;
 error = '';
 constructor(private auth:AuthenticationService, 
  private formBuilder: FormBuilder,
  private route: ActivatedRoute,
  private router: Router,){

 }
  ngOnInit(): void {
    this.signupForm = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    })

    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';

  }


  get f() { return this.signupForm.controls; }
login() {
  this.submitted = true;

  // stop here if form is invalid
  if (this.signupForm.invalid) {
      return;
  }

  this.loading = true;
  this.auth.login(this.signupForm.value)
      .pipe(first())
      .subscribe(
          data => {
            if(data.isadmin){
              this.router.navigate(['/dashboard']);
            }else{
              this.router.navigate(['/home'])
            }
          },
          error => {
              this.error = error;
              this.loading = false;
          });
}
}


