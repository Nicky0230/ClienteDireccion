import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ClientsService {

  constructor(private firestore: AngularFirestore) { }

  _Listado_Cliente(): Observable<any> {
    return this.firestore.collection('cliente').snapshotChanges();
  }

  _Agregar_Cliente(cliente: any): Promise<any> {
    return this.firestore.collection('cliente').add(cliente);
  }

  _Editar_Client(id: string, data:any): Promise<any>{
    return this.firestore.collection('cliente').doc(id).update({"Cliente_nombre": data.Cliente_nombre, "Empresa_nombre": data.Empresa_nombre });
  }

  _Eliminar_Client(id: string): Promise<any> {
    return this.firestore.collection('cliente').doc(id).delete();
  }

  _Get_Client(id: string): Observable<any> {
    return this.firestore.collection('cliente').doc(id).snapshotChanges();
  }

  _Get_Direccion(id: string): Observable<any> {
    return this.firestore.collection('cliente').doc(id).collection('direcciones').snapshotChanges().pipe(
      map( snapshot => snapshot.map( doc => ({
        direccion_id: doc.payload.doc.id,
        ...doc.payload.doc.data() as any
        })
      )
    )
  );
  }

  _Agregar_Direccion(direccion: any,cliente_id: string): Promise<any> {
    // return this.firestore.collection('direccion').doc(`${ cliente_id }`).collection('items').add(direccion);
    return this.firestore.doc(`cliente/${ cliente_id }`)
    .collection('direcciones')
    .add({ ...direccion  });
  }

  _Editar_Direccion(direccion: any,cliente_id: string, id_direccion: string): Promise<any> {
    // return this.firestore.collection('direccion').doc(`${ cliente_id }`).collection('items').add(direccion);
    return this.firestore.collection('cliente').doc(cliente_id).collection('direcciones')
    .doc(id_direccion)
    .update({ ...direccion  });
  }

  _Eliminar_Direccion(cliente_id: string, id_direccion: string): Promise<any> {
    return this.firestore.collection('cliente').doc(cliente_id).collection('direcciones')
    .doc(id_direccion)
    .delete();
  }

}
