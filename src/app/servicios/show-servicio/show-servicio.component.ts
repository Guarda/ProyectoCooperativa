import { Component, OnInit } from '@angular/core';
import { ServicioService } from 'src/app/services/servicio.service';


// #region Prueba

export interface Servicios {
  idServicio: Number;
  idReferente: Number;
  nombre: string;
  apellido: string;
  celular: Number;
  telefono: Number;
  correo: string;
  cedula: string;
  dir1: string;
  dir2: string;
  fechaInscripcion: string;
  estado: Number;
  cargo: Number;
}


//#endregion

@Component({
  selector: 'app-show-servicio',
  templateUrl: './show-servicio.component.html',
  styleUrls: ['./show-servicio.component.css']
})
export class ShowServicioComponent implements OnInit {
  listaServicio:any = [];

  constructor(private service: ServicioService) {


  this.cargarLista();
   }

  displayedColumns: string[] = ['Id Servicio', 'Id Referente', 'Nombre Servicio', 'Apellido Servicio','Celular','Telefono Fijo','Correo electronico','Cedula','Dirección 1','Dirección 2','fecha_inscripcion','Estado','Cargo'];
  // dataSource = ELEMENT_DATA;


  ServicioList: any = [];
  ModalTitle: string = "";
  ActivateAddEditServicio: boolean = false;
  servicio: any;



  async cargarLista(){
    const resultado = await this.service.get().toPromise();
    console.log(resultado.dato);
    this.listaServicio = resultado.dato;
  }

  ngOnInit(): void {
    this.refreshservicioList();
  }

  addClick() {
    this.servicio = {
      Nombre_del_Servicio: "",
      Apellido_del_Servicio: "",
      Cedula: "",
      Direccion_1: "",
      IDAReferente: 0
    }
    this.ModalTitle = "Inscribir servicio";
    this.ActivateAddEditServicio = true;
  }

  closeClick() {
    this.ActivateAddEditServicio = false;
    this.refreshservicioList();
  }

  refreshservicioList() {
    // this.service.getservicioList().subscribe(data => {
    //   this.servicioList = data;
    // })
  }

}
