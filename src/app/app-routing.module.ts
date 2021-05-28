import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CreateClientsComponent } from './Components/create-clients/create-clients.component';
import { ListClientsComponent } from './Components/list-clients/list-clients.component';


const routes: Routes = [
  {path: '', redirectTo: 'list-client', pathMatch: 'full'},
  {path: 'list-client', component: ListClientsComponent},
  {path: 'create-client', component: CreateClientsComponent},
  {path: 'edit-client/:id', component: CreateClientsComponent},
  {path: '**', redirectTo: 'list-client', pathMatch: 'full'},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
