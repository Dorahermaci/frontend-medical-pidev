import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Certificate } from '../../../models/certificate';
import { CertificateService } from '../../../services/certificate/certificate.service';

@Component({
  selector: 'app-add-certificate',
  templateUrl: './add-certificate.component.html',
  styleUrls: ['./add-certificate.component.css']
})
export class AddCertificateComponent {
  certificate: Certificate = new Certificate();
  constructor(private certificateService: CertificateService, private router: Router) { }

  ngOnInit(): void {

  }


  addcertif(formData: any) {
    this.router.navigateByUrl('/list-certificatee');

    this.certificateService.addCertificate(this.certificate).subscribe(() => {
      console.log('certificate  added successfully!');
      console.log(formData);

    });
  }
}
