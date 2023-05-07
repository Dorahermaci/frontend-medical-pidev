import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Certificate } from '../../../models/certificate';
import { CertificateService } from '../../../services/certificate/certificate.service';

@Component({
  selector: 'app-list-certificate',
  templateUrl: './list-certificate.component.html',
  styleUrls: ['./list-certificate.component.css']
})
export class ListCertificateComponent {
  certificates: Certificate[]=[];

  constructor(private certificateService: CertificateService, private router: Router) { }
  ngOnInit() {
    this.getCertificates();
  }
  addCertif() {
    console.log('im here');
    this.router.navigateByUrl('/add-certificate');
  }

  getCertificates() {
    this.certificateService.getAllCertificates().subscribe(
      data => {
        this.certificates = data;
      },
      error => {
        console.log(error);
      }
    );
  }
  updateCertif(certif: Certificate) {
    this.router.navigateByUrl(`/update-certificate/${certif.idCertificate}`);
  }


  deleteCertif(certif: Certificate) {
    if (confirm(`Are you sure you want to delete ${certif.title}?`)) {
      this.certificateService.deleteCertificate(certif.idCertificate).subscribe(() => {
        console.log(`${certif.title} deleted successfully!`);
        this.getCertificates();
      });
    }
  }
}
