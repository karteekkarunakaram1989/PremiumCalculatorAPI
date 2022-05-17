import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { CustomerDetailsComponent } from './customer-details/customer-details.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

const routes: Routes = [{ path: 'customerdetails', component: CustomerDetailsComponent },
  { path: '',  redirectTo: '/customerdetails', pathMatch: 'full' },
  { path: '**', component: PageNotFoundComponent }]

@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(routes, {preloadingStrategy: PreloadAllModules})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
