import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { ClientsService } from 'src/app/Services/clients.service';

@Component({
  selector: 'app-list-clients',
  templateUrl: './list-clients.component.html',
  styleUrls: ['./list-clients.component.css']
})
export class ListClientsComponent implements OnInit {

  cliente: any[] =[];
  constructor(private service: ClientsService, private toastr: ToastrService) {
   }

  ngOnInit(): void {
    this.GetEmpleado();
  }

  GetEmpleado() {
    this.service._Listado_Cliente().subscribe(resp => {
      this.cliente = [];
      resp.forEach(element => {
        this.cliente.push({
          id: element.payload.doc.id,
          ...element.payload.doc.data() //sprit operator
        });
      });

    })
  }

  eliminarCliente(id: string) {
    this.service._Eliminar_Client(id).then(() => {
      this.toastr.success('Cliente eliminado correctamente');
    })
  }

}
