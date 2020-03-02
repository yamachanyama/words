import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContactListComponent } from './contacts/contact-list/contact-list.component';
import { ContactDetailsComponent} from './contacts/contact-details/contact-details.component';

const routes: Routes = [
  { path: "", component: ContactListComponent },
  { path: "detail/:id", component: ContactDetailsComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }