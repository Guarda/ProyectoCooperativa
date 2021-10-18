import { MediaMatcher } from '@angular/cdk/layout';
import { ChangeDetectorRef, Component, OnDestroy, ViewEncapsulation, OnInit, ViewChild, AfterViewInit, AfterContentInit, AfterViewChecked } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { Router } from '@angular/router';


/** @title  sidenav */
@Component({
  selector: 'app-side-nav',
  templateUrl: 'side-nav.component.html',
  styleUrls: ['side-nav.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class SideNavComponent implements OnDestroy, OnInit, AfterViewInit {
  mobileQuery: MediaQueryList;
  public nombrePersonal: string = "Cargando...";
  public permisoCargado: Boolean;

  @ViewChild('snav', { static: false }) snav: MatSidenav;


  listaMenuAcceder: any = [];

  listaMenu: any = [

    {
      "nombre": "Administración de afiliados",
      "icono": "supervised_user_circle",
      "listaHijo": [
        {
          "url": "/afiliados",
          "nombre": "Listar todos los afiliados",
          "permiso": "ACCEDER_ROL",
          "icono": "supervisor_account"
        },
        {
          "url": "/agente",
          "nombre": "Listar todos los Agentes",
          "permiso": "ACCEDER_USUARIO",
          "icono": "verified_user"
        },
        {
          "url": "/Sistema/Usuario",
          "nombre": "Afiliados que no tienen asignado agente",
          "permiso": "ACCEDER_USUARIO",
          "icono": "person_pin_circle"
        },
        {
          "url": "/Sistema/Usuario",
          "nombre": "Listar Carteras de agentes",
          "permiso": "ACCEDER_USUARIO",
          "icono": "attach_money"
        },
        {
          "url": "/Sistema/Usuario",
          "nombre": "Mis Afiliados",
          "permiso": "ACCEDER_USUARIO",
          "icono": "assignment_ind"
        },
        {
          "url": "/Sistema/Usuario",
          "nombre": "Actualizar información personal",
          "permiso": "ACCEDER_USUARIO",
          "icono": "mode_edit"
        },
        {
          "url": "/Sistema/Usuario",
          "nombre": "Darse de baja",
          "permiso": "ACCEDER_USUARIO",
          "icono": "close"
        },
      ]
    },
    {
      "nombre": "Servicios",
      "icono": "monetization_on",
      "listaHijo": [
        {
          "url": "/servicio",
          "nombre": "Listar todos los servicios",
          "permiso": "ACCEDER_SOCIO_NEGOCIO",
          "icono": "work"
        },
        {
          "url": "/servicio",
          "nombre": "Contratos",
          "permiso": "ACCEDER_CLIENTE",
          "icono": "list_alt"

        },
        {
          "url": "/servicio",
          "nombre": "Estados de cuenta de afiliados",
          "permiso": "ACCEDER_CLIENTE",
          "icono": "payment"
        },
        {
          "url": "/servicio",
          "nombre": "Registrar pagos",
          "permiso": "ACCEDER_CLIENTE",
          "icono": "payments"
        },
        {
          "url": "/servicio",
          "nombre": "Cuenta Personal",
          "permiso": "ACCEDER_CLIENTE",
          "icono": "savings"
        },
        {
          "url": "/servicio",
          "nombre": "Comisiones por inscripción",
          "permiso": "ACCEDER_CLIENTE",
          "icono": "attribution"
        },
        {
          "url": "/servicio",
          "nombre": "Mis contratos",
          "permiso": "ACCEDER_HISTORIAL_CONTACTENOS",
          "icono": "history"
        },        
      ]
    },   
    {
      "nombre": "Informes",
      "icono": "work",
      "listaHijo": [
        {
          "url": "/Sistema/MisUsuarios",
          "nombre": "Informes de servicios",
          "permiso": "ACCEDER_USUARIO_SOCIO_NEGOCIO",
          "icono": "supervisor_account"
        },
        {
          "url": "/Sistema/MisUsuarios",
          "nombre": "Cuentas a pagar",
          "permiso": "ACCEDER_USUARIO_SOCIO_NEGOCIO",
          "icono": "supervisor_account"
        },
        {
          "url": "/Sistema/MisUsuarios",
          "nombre": "Reporte de afiliados",
          "permiso": "ACCEDER_USUARIO_SOCIO_NEGOCIO",
          "icono": "supervisor_account"
        },
        {
          "url": "/Sistema/MisUsuarios",
          "nombre": "Reporte de agentes",
          "permiso": "ACCEDER_USUARIO_SOCIO_NEGOCIO",
          "icono": "supervisor_account"
        },
        {
          "url": "/Sistema/MisUsuarios",
          "nombre": "Reporte de comisiones",
          "permiso": "ACCEDER_USUARIO_SOCIO_NEGOCIO",
          "icono": "supervisor_account"
        },
        {
          "url": "/Sistema/MisUsuarios",
          "nombre": "Servicios contratados por afiliados",
          "permiso": "ACCEDER_USUARIO_SOCIO_NEGOCIO",
          "icono": "supervisor_account"
        }, {
          "url": "/Sistema/MisUsuarios",
          "nombre": "Próximas cuotas a ser pagadas",
          "permiso": "ACCEDER_USUARIO_SOCIO_NEGOCIO",
          "icono": "supervisor_account"
        },
        {
          "url": "/Sistema/MisUsuarios",
          "nombre": "Mi estado de cuenta",
          "permiso": "ACCEDER_USUARIO_SOCIO_NEGOCIO",
          "icono": "supervisor_account"
        }, {
          "url": "/Sistema/MisUsuarios",
          "nombre": "Informe de servicios contratados",
          "permiso": "ACCEDER_USUARIO_SOCIO_NEGOCIO",
          "icono": "supervisor_account"
        },
        {
          "url": "/Sistema/MisUsuarios",
          "nombre": "Saldos pendientes",
          "permiso": "ACCEDER_USUARIO_SOCIO_NEGOCIO",
          "icono": "supervisor_account"
        },
        {
          "url": "/Sistema/MisUsuarios",
          "nombre": "Reporte de saldo de cuenta",
          "permiso": "ACCEDER_USUARIO_SOCIO_NEGOCIO",
          "icono": "supervisor_account"
        },
      ]
    }
  ];
private _mobileQueryListener: () => void;

  constructor(
    changeDetectorRef: ChangeDetectorRef,
    media: MediaMatcher,
    private router: Router,
  ) {
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
    this.permisoCargado = false;

  }


  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }


  async cerrarSesion() {

    // const dialogRef = this.dialog.open(ConfirmacionComponent, {
    //   data: {
    //     titulo: 'Cerrar sesión',
    //     mensaje: '¿Esta seguro que desea realizar esta acción?'
    //   }
    // });

    // dialogRef.afterClosed().subscribe(async result => {
    //   if (result) {
    //     this.service.cerrarSesion();
    //     this.mensajeService.generarToastr(1, "Éxito", "Se ha cerrado la sesión del usuario");
    //     this.router.navigate(['/']);
    //   }
    // });
  }

  ngAfterViewInit() {
    setTimeout(() => {
      this.snav.toggle();
    }, 200);
  }

  async ngOnInit() {
    //const resultado = await this.usuarioService.ObtenerPermisoUsuario().toPromise();

    
      this.permisoCargado = true;
      // sessionStorage.setItem("ListaPermiso", JSON.stringify(resultado.dato)); this.nombrePersonal = sessionStorage.getItem('NombrePersonal');
      this.listaMenu.forEach((menu: any) => {
        if (menu.listaHijo) {
          let menuActual = {
            nombre: menu.nombre,
            icono: menu.icono,
            listaHijo: []
          };

          this.obtenerHijo(menuActual, menu);

          if (menuActual.listaHijo.length > 0) {
            this.listaMenuAcceder.push(menuActual);
          }

        } else {
          const tienePermiso = true
          if (tienePermiso || menu.permiso === '')
            this.listaMenuAcceder.push(menu);
        }
      });
    
  }

  obtenerHijo(menuActual: any, menu: any) {
    menu.listaHijo.forEach((menuHijo: any ) => {
      if (menuHijo.listaHijo) {

        let menuActualHijo = {
          nombre: menu.nombre,
          icono: menu.icono,
          listaHijo: []
        };

        const tienePermiso = true;
        if (tienePermiso)
          menuActual.listaHijo.push(menuHijo);

        this.obtenerHijo(menuActualHijo, menuHijo);

        if (menuActualHijo.listaHijo.length > 0) {
          menuActual.listaHijo.push(menuHijo);
        }
      }
      else {
        const tienePermiso = true;

        if (tienePermiso)
          menuActual.listaHijo.push(menuHijo);
      }
    });
  }
}

