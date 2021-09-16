import { Component, OnInit } from '@angular/core';
import { AfiliadoService } from 'src/app/services/afiliado.service';


// #region Prueba

export interface Afiliados {
  idAfiliado: Number;
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
  selector: 'app-show-afiliado',
  templateUrl: './show-afiliado.component.html',
  styleUrls: ['./show-afiliado.component.css']
})
export class ShowAfiliadoComponent implements OnInit {
  listaAfiliado:any = [];

  constructor(private service: AfiliadoService) {


  this.cargarLista();
   }

  displayedColumns: string[] = ['Id Afiliado', 'Id Referente', 'Nombre Afiliado', 'Apellido Afiliado','Celular','Telefono Fijo','Correo electronico','Cedula','Dirección 1','Dirección 2','fecha_inscripcion','Estado','Cargo'];
  // dataSource = ELEMENT_DATA;


  AfiliadoList: any = [];
  ModalTitle: string = "";
  ActivateAddEditAfiliado: boolean = false;
  afiliado: any;



  async cargarLista(){
    const resultado = await this.service.get().toPromise();
    console.log(resultado.dato);
    this.listaAfiliado = resultado.dato;
  }

  ngOnInit(): void {
    this.refreshAfiliadoList();
  }

  addClick() {
    this.afiliado = {
      Nombre_del_Afiliado: "",
      Apellido_del_Afiliado: "",
      Cedula: "",
      Direccion_1: "",
      IDAReferente: 0
    }
    this.ModalTitle = "Inscribir afiliado";
    this.ActivateAddEditAfiliado = true;
  }

  closeClick() {
    this.ActivateAddEditAfiliado = false;
    this.refreshAfiliadoList();
  }

  refreshAfiliadoList() {
    // this.service.getAfiliadoList().subscribe(data => {
    //   this.AfiliadoList = data;
    // })
  }

}
