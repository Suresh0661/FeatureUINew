import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddFeatureComponent } from './add-feature/add-feature.component';
import { EditFeatureComponent } from './edit-feature/edit-feature.component';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  { path: '', redirectTo: 'Feature/List', pathMatch: 'full'},
  { path: 'Feature/List', component: HomeComponent },
  { path: 'Feature/Create', component: AddFeatureComponent },
  { path: 'Feature/:featureId', component: EditFeatureComponent } 
];
  

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }