import { InvoiceFormComponent } from './../invoices/components/invoice-form/invoice-form.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClientsComponent } from '../invoices/components/clients/clients.component';
import { InvoiceListingComponent } from '../invoices/components/invoice-listing/invoice-listing.component';
import { InvoiceComponent } from './invoice/invoice.component';
import { MainContentComponent } from './main-content/main-content.component';
import { Invoice } from '../invoices/models/invoice';
import { RegisterComponent } from '../invoices/auth/register/register.component';
import { LoginComponent } from '../invoices/auth/login/login.component';

const routes: Routes = [

  
  {
    path:'',
    component:InvoiceComponent,
    children: [
      {
        path:'invoices',
        component:InvoiceListingComponent,
      },
      {
        path:'clients',
        component:ClientsComponent
      },
      {
        path:'invoices/new',
        component:InvoiceFormComponent
      },
      {
        path:'invoices/:id',
        component:InvoiceFormComponent
      },
      {
        path:"register",
        component:RegisterComponent
      },
      {
        path:'login',
        component:LoginComponent
      },
      {
        path:'**',
        redirectTo:'invoices'
      }

      

    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
