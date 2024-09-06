import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditFeatureComponent } from './edit-feature.component';
import { HttpProviderService } from '../service/http-provider.service';

import { Component, Input, OnInit, Type, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { NgForm } from '@angular/forms';


describe('EditFeatureComponent', () => {
  let component: EditFeatureComponent;
  let fixture: ComponentFixture<EditFeatureComponent>;

  it('should assign the router parameter to the router instance variable', () => {
    const router = new Router();
    const modalService = new NgbModal();
    const toastr = new ToastrService();
    const httpProvider = new HttpProviderService();
    const route = new ActivatedRoute();
    const component = new HomeComponent(router, modalService, toastr, httpProvider, route);
    expect(component.router).toBe(router);
  });

  it('should assign the modalService parameter to the modalService instance variable', () => {
    const router = new Router();
    const modalService = new NgbModal();
    const toastr = new ToastrService();
    const httpProvider = new HttpProviderService();
    const route = new ActivatedRoute();
    const component = new HomeComponent(router, modalService, toastr, httpProvider, route);
    expect(component.modalService).toBe(modalService);
  });

  it('should assign the toastr parameter to the toastr instance variable', () => {
    const router = new Router();
    const modalService = new NgbModal();
    const toastr = new ToastrService();
    const httpProvider = new HttpProviderService();
    const route = new ActivatedRoute();
    const component = new HomeComponent(router, modalService, toastr, httpProvider, route);
    expect(component.toastr).toBe(toastr);
  });

  it('should assign the httpProvider parameter to the httpProvider instance variable', () => {
    const router = new Router();
    const modalService = new NgbModal();
    const toastr = new ToastrService();
    const httpProvider = new HttpProviderService();
    const route = new ActivatedRoute();
    const component = new HomeComponent(router, modalService, toastr, httpProvider, route);
    expect(component.httpProvider).toBe(httpProvider);
  });

  it('should assign the route parameter to the route instance variable', () => {
    const router = new Router();
    const modalService = new NgbModal();
    const toastr = new ToastrService();
    const httpProvider = new HttpProviderService();
    const route = new ActivatedRoute();
    const component = new HomeComponent(router, modalService, toastr, httpProvider, route);
    expect(component.route).toBe(route);
  });
});

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditFeatureComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditFeatureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // Test to make sure that the feature ID is being passed through correctly from the route parameters and that the getFeature() method is called with the correct ID.
describe('FeatureDetailsComponent', () => {
  let component: FeatureDetailsComponent;
  let fixture: ComponentFixture<FeatureDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FeatureDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FeatureDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should retrieve the feature ID from the route parameters', () => {
    const featureId = '1234';
    const activatedRouteStub = { snapshot: { params: { featureId } } };

    spyOn(TestBed.get(ActivatedRoute), 'snapshot').and.returnValue(activatedRouteStub);
    expect(component.featureId).toEqual(featureId);
  });

  it('should call the getFeature() method with the correct feature ID', () => {
    const featureId = '1234';
    const activatedRouteStub = { snapshot: { params: { featureId } } };
    const featureServiceSpy = jasmine.createSpyObj('FeatureService', ['getFeature']);

    TestBed.overrideProvider(FeatureService, { useValue: featureServiceSpy });
    spyOn(TestBed.get(ActivatedRoute), 'snapshot').and.returnValue(activatedRouteStub);

    component.ngOnInit();
    expect(featureServiceSpy.getFeature).toHaveBeenCalledWith(featureId);
  });
});



  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // Test to check if the delete confirmation modal is displayed when the user clicks on the delete button
it('should display the delete confirmation modal when the user clicks on the delete button', () => {
  // Open the delete confirmation modal by clicking on the delete button
  component.deleteConfirmation();

  // Check if the modal is open
  expect(component.modalService.open).toHaveBeenCalledWith(MODALS['deleteModal'], {
    ariaLabelledBy: 'modal-basic-title'
  });
});

// Test to check if the deleteFeature method is called when the user confirms the deletion of the feature
it('should call the deleteFeature method when the user confirms the deletion of the feature', () => {
  // Open the delete confirmation modal and confirm the deletion
  component.deleteConfirmation();
  component.modalService.open(MODALS['deleteModal'], {
    ariaLabelledBy: 'modal-basic-title'
  }).result.then((result: any) => {
    expect(component.deleteFeature).toHaveBeenCalled();
  });
});

it('should delete a feature and redirect to the list page', () => {
  // Arrange
  const featureId = 1;
  const httpProviderMock = jasmine.createSpyObj('HttpProvider', ['deleteFeatureById']);
  const toastrMock = jasmine.createSpyObj('Toastr', ['success']);
  const routerMock = jasmine.createSpyObj('Router', ['navigate']);
  const component = new FeatureDetailPage(httpProviderMock as HttpProvider, toastrMock as Toastr, routerMock as Router);
  component.featureId = featureId;

  // Act
  component.deleteFeature();

  // Assert
  expect(httpProviderMock.deleteFeatureById).toHaveBeenCalledWith(featureId);
  expect(toastrMock.success).toHaveBeenCalled();
  expect(routerMock.navigate).toHaveBeenCalledWith(['/Feature/List']);
});

// This test validates that the UpdateFeature method is called when the form is valid and submits the form data to the server.
it('should call UpdateFeature method when form is valid', () => {
  const isValid = true;
  component.UpdateFeature(isValid);
  expect(component.isSubmitted).toBe(true);
});

// This test validates that an error message is displayed when the form is invalid and does not submit the form data to the server.
it('should display error message when form is invalid', () => {
  const isValid = false;
  component.UpdateFeature(isValid);
  expect(component.isSubmitted).toBe(false);
});

// This test validates that the httpProvider.saveFeature method is called when the form is valid and submits the form data to the server.
it('should call httpProvider.saveFeature method when form is valid', () => {
  const isValid = true;
  spyOn(httpProvider, 'saveFeature').and.callThrough();
  component.UpdateFeature(isValid);
  expect(httpProvider.saveFeature).toHaveBeenCalled();
});

// This test validates that the toastr.success method is called when the response from the server is successful and displays a success message.
it('should call toastr.success method when response is successful', () => {
  const isValid = true;
  spyOn(toastr, 'success').and.callThrough();
  component.UpdateFeature(isValid);
  expect(toastr.success).toHaveBeenCalled();
});

// This test validates that the router.navigate method is called after a successful response from the server and navigates to the Feature List page.
it('should call router.navigate method after successful response', () => {
  const isValid = true;
  spyOn(router, 'navigate').and.callThrough();
  component.UpdateFeature(isValid);
  expect(router.navigate).toHaveBeenCalledWith(['/Feature/List']);
});

// This test validates that the toastr.error method is called when there is an error in the response from the server and displays an error message.
it('should call toastr.error method when there is an error in the response', () => {
  const isValid = true;
  spyOn(toastr, 'error').and.callThrough();
  component.UpdateFeature(isValid);
  expect(toastr.error).toHaveBeenCalled();
});

// This test validates that the router.navigate method is called after an error in the response from the server and navigates to the Feature List page.
it('should call router.navigate method after error in response', () => {
  const isValid = true;
  spyOn(router, 'navigate').and.callThrough();
  component.UpdateFeature(isValid);
  expect(router.navigate).toHaveBeenCalledWith(['/Feature/List']);
});

});
