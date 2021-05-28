import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ClientsService } from 'src/app/Services/clients.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-create-clients',
  templateUrl: './create-clients.component.html',
  styleUrls: ['./create-clients.component.css'],
})
export class CreateClientsComponent implements OnInit {
  createClient: FormGroup;
  createDireccion: FormGroup;
  submited = false;
  id: string | null;
  title = 'Agregar Cliente';
  direcciones: any[] = [];
  submitDir = '';

  constructor(
    private fb: FormBuilder,
    private service: ClientsService,
    private router: Router,
    private toastr: ToastrService,
    private route: ActivatedRoute
  ) {
    this.createClient = this.fb.group({
      Cliente_nombre: ['', Validators.required],
      Empresa_nombre: ['', Validators.required]
    });

    this.createDireccion = this.fb.group({
      client_id: '',
      direccion_Cliente: ['', Validators.required],
      direccion_id: '',
    });

    this.id = this.route.snapshot.paramMap.get('id');
  }

  ngOnInit(): void {
    this.getCliente();
    this.getDirecciones();
  }

  agregarEditarCliente() {
    this.submited = true;

    if (this.createClient.invalid) {
      return;
    }
    if (this.id === null) {
      this.agregarCliente();
    } else {
      this.editCliente(this.id);
      this.direcciones.forEach(dir => {
        let obj = {
          direccion_Cliente: dir.direccion_Cliente
        }
        if (dir.direccion_id === '') {
          this.agregarDireccion(obj, this.id);
        } else {
          this.editarDireccion(obj, dir.direccion_id);
        }
      });
    }
  }

  agregarCliente() {
    this.submited = true;

    if (this.createClient.invalid) {
      return;
    }
    const cliente: any = {
      Cliente_nombre: this.createClient.value.Cliente_nombre,
      Empresa_nombre: this.createClient.value.Empresa_nombre,
    };

    this.service._Agregar_Cliente(cliente).then((resp) => {

      this.direcciones.forEach(dir => {
        let obj = {
          direccion_Cliente: dir.direccion_Cliente
        }
          this.agregarDireccion(obj, resp.id);

      });
      this.toastr.success('El cliente fue agregado correctamente');
      this.router.navigate(['/list-client']);
    });
  }

  getCliente() {
    this.title = 'Editar Cliente';
    if (this.id !== null) {
      this.service._Get_Client(this.id).subscribe((resp) => {
        this.createClient.setValue({
          Cliente_nombre: resp.payload.data()['Cliente_nombre'],
          Empresa_nombre: resp.payload.data()['Empresa_nombre']
        });
      });
    }
  }

  editCliente(id: string) {
    const cliente: any = {
      Cliente_nombre: this.createClient.value.Cliente_nombre,
      Empresa_nombre: this.createClient.value.Empresa_nombre
    };

    this.service._Editar_Client(id, cliente).then(() => {
      this.toastr.success('El cliente fue editado correctamente');
      this.router.navigate(['/list-client']);
    });
  }

  agregarDireccion(dir, idcliente) {
    this.service._Agregar_Direccion(dir, idcliente).then(() => {

    });
  }



  getDirecciones() {
    if (this.id !== null) {
      this.service._Get_Direccion(this.id).subscribe((resp) => {
        this.direcciones = resp;
      });
    }
  }

  cargarDireccion(i: number) {
    this.submitDir = '';
    if (i >= 0) {
      this.createDireccion.patchValue(this.direcciones[i]);
    }
  }

  editarDireccion(dir , id: string) {
    this.service._Editar_Direccion(dir, this.id, id).then(() => {
      this.toastr.success('La dirección fue editada correctamente');
    });
  }

  addDireccion() {
    this.submited = true;
    if (this.createDireccion.invalid) {
      return;
    }
    if (this.createDireccion.value.direccion_id === '') {
      this.direcciones.push(this.createDireccion.value);

    } else {
    let index = this.direcciones.findIndex(x => x.direccion_id ===  this.createDireccion.value.direccion_id)
    if (index > -1) {
      this.direcciones[index] = this.createDireccion.value;
    }
    }
    this.submitDir = 'modal';
    this.resetForm();
  }

  eliminarDireccion(i) {
    this.service._Eliminar_Direccion(this.id, this.direcciones[i].direccion_id).then(() => {
      this.toastr.success('Direccion eliminada correctamente');
    })
  }

  resetForm() {
    this.submited = false;
    this.createDireccion.patchValue({
      direccion_Cliente: ''
    })
  }

}
