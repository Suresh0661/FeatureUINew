import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AddFeatureComponent } from './add-feature.component';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpProviderService } from '../service/http-provider.service';
import { ToastrService } from 'ngx-toastr';
import { of } from 'rxjs';
import { FeatureForm } from '../models/feature-form';
import { NgForm } from '@angular/forms';

describe('AddFeatureComponent', () => {
  let component: AddFeatureComponent;
  let fixture: ComponentFixture<AddFeatureComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddFeatureComponent ],
      imports: [RouterTestingModule],
      providers: [
        { provide: HttpProviderService, useValue: { saveFeature: () => of() } },
        { provide: ToastrService, useValue: { success: () => {}, error: () => {} } }
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddFeatureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the form', () => {
    expect(component.addFeatureForm).toBeDefined();
    expect(component.addFeatureForm.name).toBe('');
    expect(component.addFeatureForm.description).toBe('');
    expect(component.addFeatureForm.enabled).toBe(false);
  });

  it('should validate the form', () => {
    const featureForm = component.FeatureForm;
    expect(featureForm.valid).toBeFalsy();

    // Enter a name and description.
    component.addFeatureForm.name = 'Test Feature';
    component.addFeatureForm.description = 'This is a test feature.';
    expect(featureForm.valid).toBeTruthy();

    // Clear the name.
    component.addFeatureForm.name = '';
    expect(featureForm.valid).toBeFalsy();

    // Enter an invalid name.
    component.addFeatureForm.name = 'Test';
    expect(featureForm.valid).toBeFalsy();
  });

  it('should submit the form', () => {
    spyOn(TestBed.inject(HttpProviderService), 'saveFeature').and.returnValue(of());
    spyOn(TestBed.inject(ToastrService), 'success');
    spyOn(TestBed.inject(ToastrService), 'error');
    spyOn(TestBed.inject(RouterTestingModule), 'navigate');

    // Submit the form without entering any data.
    component.CreateFeature(false);
    expect(component.isSubmitted).toBeTruthy();
    expect(TestBed.inject(ToastrService).error).toHaveBeenCalled();

    // Submit the form with valid data.
    component.addFeatureForm.name = 'Test Feature';
    component.addFeatureForm.description = 'This is a test feature.';
    component.CreateFeature(true);
    expect(TestBed.inject(HttpProviderService).saveFeature).toHaveBeenCalled();
    expect(TestBed.inject(ToastrService).success).toHaveBeenCalled();
    expect(TestBed.inject(RouterTestingModule).navigate).toHaveBeenCalledWith(['/Feature/List']);
  });
});
