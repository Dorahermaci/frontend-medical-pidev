import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-addclaim',
  templateUrl: './addclaim.component.html',
  styleUrls: ['./addclaim.component.css']
})
export class AddclaimComponent implements OnInit{
  claims: any[] = [];
  currentClaim: any;
  claimForm: FormGroup;

  constructor(private http: HttpClient, private formBuilder: FormBuilder,private router: Router) {
    this.claimForm = this.formBuilder.group({
      description: ['', Validators.required],
      date: ['', Validators.required],
      status: ['', Validators.required],
      comments: [''],
      appUser: ['', Validators.required] // add appUser form control with Validators.required
    });
  }
  ngOnInit(): void {
    
    this.currentClaim = { id: null };
  } 

  addClaim(form: FormGroup) {
    const appUser = parseInt(form.get('appUser')?.value);
    const claim = { ...this.claimForm.value };
    delete claim.appUser; // remove appUser property from claim object
    console.log(claim);
    this.http.post(`http://localhost:8091/claims/${appUser}`, claim).subscribe((data: any) => {
      form.reset();
    });
    this.router.navigate(['/front/home']);
  }

  
  
  
  
}
