import { Component, Input, OnInit, Type, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { HttpProviderService } from '../service/http-provider.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'ng-modal-confirm',
  template: `
  <div class="modal-header">
    <h5 class="modal-title" id="modal-title">Delete Confirmation</h5>
   
  </div>
  <div class="modal-body">
    <p>Are you sure you want to delete?</p>
  </div>
  <div class="modal-footer">
    <button type="button" class="btn btn-outline-secondary" (click)="modal.dismiss('cancel click')">CANCEL</button>
    <button type="button" ngbAutofocus class="btn btn-success" (click)="modal.close('Ok click')">OK</button>
  </div>
  `,
})
export class NgModalConfirm {
  constructor(public modal: NgbActiveModal) { }
}

const MODALS: { [name: string]: Type<any> } = {
  deleteModal: NgModalConfirm,
};
@Component({
  selector: 'app-edit-feature',
  templateUrl: './edit-feature.component.html',
  styleUrls: ['./edit-feature.component.scss']
})
export class EditFeatureComponent implements OnInit {
  editFeatureForm:  FeatureForm = new FeatureForm();


  @ViewChild("FeatureForm")
  FeatureForm!: NgForm;

  isSubmitted: boolean = false;
  featureId: any;
  featureData : any

  constructor(private router: Router, private modalService: NgbModal,
    private toastr: ToastrService, private httpProvider : HttpProviderService, private route: ActivatedRoute) { }

  // constructor(private toastr: ToastrService, private route: ActivatedRoute, private router: Router,
  //   private httpProvider: HttpProviderService) { }

  ngOnInit(): void {
    this.featureId = this.route.snapshot.params['featureId'];
    this.getFeature(this.featureId)
    console.log(this.featureId, this.featureData);
  }

  async getFeature(id: any) {
    this.httpProvider.getFeatureById(id).subscribe((data : any) => {
      if (data != null && data.body != null) {
        var resultData = data.body;
        if (resultData) {
          console.log("resultData", resultData[id-1])
          this.featureData = resultData[id-1]  
          this.editFeatureForm = this.featureData

        }
      }
    },
    (error : any)=> {
        if (error) {
          if (error.status == 404) {
            if(error.error && error.error.message){
              this.featureData = [];
            }
          }
        }
      });
  }


  UpdateFeature(isValid: any) {
    this.isSubmitted = true;
    if (isValid) {
      console.log("Updated Data", this.editFeatureForm);
      this.httpProvider.saveFeature(this.editFeatureForm).subscribe(async data => {
        if (data != null && data.body != null) {
          var resultData = data.body;
          if (resultData != null && resultData) {
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
  deleteConfirmation() {
    this.modalService.open(MODALS['deleteModal'],
      {
        ariaLabelledBy: 'modal-basic-title'
      }).result.then((result: any) => {
        this.deleteFeature();
      },
        (reason: any) => {});
  }

  deleteFeature() {
    this.httpProvider.deleteFeatureById(this.featureId).subscribe((data : any) => {
      if (data != null && data.body != null) {
        var resultData = data.body;
        if (resultData != null && resultData) {
          this.toastr.success(resultData.message);
          this.router.navigate(['/Feature/List']);
        }
      }
    },
    (error : any) => {this.router.navigate(['/Feature/List'])});
  }
}


export class FeatureForm {
  Id: number = 0;
  Title: string = "";
  Description: string = "";
  EstimatedComplexity: string = "";
  Status: string = "";
  TargetCompletionDate: Date | undefined;
  ActualCompletionDate:Date | undefined;
}
