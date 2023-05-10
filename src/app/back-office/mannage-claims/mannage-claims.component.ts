import { Component, OnInit} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { trigger } from '@angular/animations';



@Component({
  selector: 'app-mannage-claims',
  templateUrl: './mannage-claims.component.html',
  styleUrls: ['./mannage-claims.component.css'],
  animations: [
    trigger('flyInOut', [
      
    ])
  ]
})
export class MannageClaimsComponent implements OnInit {
  claims: any[] = [];
  currentClaim: any;

  constructor(private http: HttpClient, private router: Router,private toastr: ToastrService) {}

  ngOnInit(): void {
    this.fetchClaims();
    this.currentClaim = { id: null };
    

  }

  fetchClaims() {
    this.http.get<any[]>('http://localhost:8091/claims').subscribe((data: any[]) => {
      this.claims = data;
    });
  }

  archiveClaim(id: number) {
    this.http.put(`http://localhost:8091/claims/archive/${id}`, { status: 'COMPLETED' }).subscribe(() => {
      this.toastr.success('Claim archived successfully.');
      
    });
  }
  updateClaim() {
    this.http.put(`http://localhost:8091/claims/${this.currentClaim.id}`, this.currentClaim).subscribe(() => {
      this.toastr.success('Claim updated successfully.');
      this.currentClaim = { id: null };
      this.fetchClaims();
    });
  }
  

  setEditClaim(claim: any) {
    this.router.navigate(['/back/edit-claim', claim.id]);
  }
  goToDashboard() {
    this.router.navigate(['/back/dashbordClaim']);
  }
}
