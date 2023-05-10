import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ClaimService } from 'src/app/services/claim.service';
import { HttpClient } from '@angular/common/http';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { ToastrService } from 'ngx-toastr';



@Component({
  selector: 'app-edit-claim',
  templateUrl: './edit-claim.component.html',
  styleUrls: ['./edit-claim.component.css']
})
export class EditClaimComponent implements OnInit {
  claimForm: FormGroup;
  currentClaim: any;
  claims: any[] = [];
  

  constructor(
    private http: HttpClient,
    private claimService: ClaimService,
    private router: Router,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private messageService: MessageService,
    private toastr: ToastrService
  ) {
    this.claimForm = this.formBuilder.group({
      
      status: ['', Validators.required],
      comments: ['', Validators.required]
      
    });
  }

  ngOnInit(): void {
    const claimId = Number(this.route.snapshot.paramMap.get('id'));
    this.claimService.getClaimById(claimId).subscribe((data: any) => {
      console.log(data)
      this.currentClaim = data; // Assign currentClaim

      this.claimForm.patchValue({
        
        status: data.status,
        comments: data.comments
        
      });
    });
  }

  submitForm() {
    const claim = {
      status: this.claimForm.get('status')?.value,
      comments: this.claimForm.get('comments')?.value,
    };
    
    console.log(claim);
    this.http.put(`http://localhost:8091/claims/${this.currentClaim.id}`, {}, { params: claim }).subscribe((data: any) => {
      const index = this.claims.findIndex(claim => claim.id === data.id);
      this.claims[index] = data;
      this.currentClaim = null;
      this.toastr.success('Claim updated successfully.', 'Success', {
        positionClass: 'toast-center'
      });
      
        this.router.navigate(['/back/Claims'], {
          queryParams: { status: 'success' },
        });
      },
      (error) => {
        console.log(error);

    });
  }

  cancel() {
    this.router.navigate(['/back/Claims']);
  }
  showToast() {
    this.messageService.add({
      severity: 'success',
      summary: 'Claim updated successfully!',
      detail: '',
      life: 3000,
      closable: true,
      
      styleClass: 'my-toast'
    });
  }
  
  

}
