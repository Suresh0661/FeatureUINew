import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { HttpProviderService } from '../service/http-provider.service';

@Component({
  selector: 'app-add-feature',
  templateUrl: './add-feature.component.html',
  styleUrls: ['./add-feature.component.scss']
})
export class AddFeatureComponent implements OnInit {
  addFeatureForm: FeatureForm = new FeatureForm();

  @ViewChild("FeatureForm")
  FeatureForm!: NgForm;

  isSubmitted: boolean = false;

  constructor(private router: Router, private httpProvider: HttpProviderService, private toastr: ToastrService) { }

  ngOnInit(): void {
  }

  CreateFeature(isValid: any) {
    this.isSubmitted = true;
    if (isValid) {
      console.log("Create Feature Data",this.addFeatureForm)
      this.httpProvider.saveFeature(this.addFeatureForm).subscribe(async data => {
        if (data != null && data.body != null) {
          if (data != null && data.body != null) {
            var resultData = data.body;
            if (resultData != null && resultData) {
              this.toastr.success(resultData.message);
              setTimeout(() => {
                this.router.navigate(['/Feature/List']);
              }, 500);
            }
          }
        }
      },
        async error => {
          this.toastr.error(error.message);
          setTimeout(() => {
            this.router.navigate(['/Feature/List']);
          }, 500);
        });
    }
  }

}

export class FeatureForm {
  Title: string = "";
  Description: string = "";
  EstimatedComplexity: string = "";
  Status: string = "";
  TargetCompletionDate: Date | undefined;
  ActualCompletionDate:Date | undefined;
}