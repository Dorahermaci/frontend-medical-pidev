import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Certificate } from '../../../models/certificate';
import { CertificateService } from '../../../services/certificate/certificate.service';


@Component({
  selector: 'app-update-certificate',
  templateUrl: './update-certificate.component.html',
  styleUrls: ['./update-certificate.component.css']
})
export class UpdateCertificateComponent {
  certificate: Certificate = new Certificate();
  id!: number;

  constructor(
    private certificateService: CertificateService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

   ngOnInit(): void {
    // Retrieve the training course ID from the URL parameter
    const idString = this.route.snapshot.paramMap.get('id');
    if (idString) {
      this.id = +idString;
      const id = Number(idString);

      // Retrieve the training course details from the server
      this.certificateService.getCertificateById(id).subscribe((data: Certificate) => {
        this.certificate = data;
      });
    } else {
      // Handle the case where the ID is null
      console.error('Training course ID is null!');
    }
  }

  update(formData: any) {
    // Populate the trainingCourse object with the form data
    this.router.navigateByUrl('/list-certificatee');
    this.certificate.title = formData.title;
    this.certificate.studentName = formData.studentName;
    this.certificate.description = formData.description;
    this.certificate.expirationDate = formData.expirationDate;

    // Update the training course on the server
    this.certificateService.updateCertificate(this.id ,this.certificate).subscribe(() => {
      console.log('Training course updated successfully!');
      this.router.navigateByUrl('/list-certificate');
    });
  }
}

