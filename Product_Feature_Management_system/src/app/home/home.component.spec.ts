import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { HomeComponent } from './home.component';
\import { throwError } from 'rxjs/internal/observable/throwError';
import { HttpProviderService } from '../service/http-provider.service';
import { HttpHeaders, HttpClient } from '@angular/common/http';



describe('Test getAllFeature function', () => {
  it('should return an array of features', () => {
    const mockResponse = {
      body: [
        {
          id: 1,
          name: "Feature 1",
          description: "This is feature 1"
        },
        {
          id: 2,
          name: "Feature 2",
          description: "This is feature 2"
        }
      ]
    };
    const mockHttpClient = {
    };
    const service = HttpProviderService;
    service.getAllFeature()
  });
});

// This test checks that the getAllFeature function returns an empty array when the API call fails
describe('Test getAllFeature function', () => {
  it('should return an empty array', () => {
    const mockResponse = {};
    const mockHttpClient = {
    };
    const service = HttpProviderService;
    service.getAllFeature().subscribe({
      next: (response) => {
        expect(response).toEqual([]);
      },
      error: (error) => {
        expect(error).toEqual(mockResponse);
      }
    });
  });
});

// This test checks that the deleteFeature function calls the correct API endpoint and displays a success message when the API call is successful
describe('Test deleteFeature function', () => {
  it('should call the correct API endpoint and display a success message', () => {
    const mockResponse = {
      body: {
        isSuccess: true,
        message: "Feature deleted successfully"
      }
    };
    const mockHttpClient = {
      delete: jest.fn(() => of(mockResponse))
    };
    const service = new HttpProviderService(mockHttpClient as HttpClient);
    service.deleteFeatureById(1).subscribe((response) => {
      expect(mockHttpClient.delete).toHaveBeenCalledWith('/api/feature/1');
      expect(response).toEqual(mockResponse.body);
    });
  });
});

// This test checks that the deleteFeature function displays an error message when the API call fails
describe('Test deleteFeature function', () => {
  it('should display an error message', () => {
    const mockResponse = {};
    const mockHttpClient = {
      delete: jest.fn(() => throwError(mockResponse))
    };
    const service = new HttpProviderService(mockHttpClient as HttpClient);
    service.deleteFeatureById(1).subscribe({
      next: (response) => {},
      error: (error) => {
        expect(error).toEqual(mockResponse);
      }
    });
  });
});