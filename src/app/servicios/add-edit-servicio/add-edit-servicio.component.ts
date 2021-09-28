import { Component, OnInit, Input } from '@angular/core';
import { ServicioService } from 'src/app/services/servicio.service';

@Component({
  selector: 'app-add-edit-servicio',
  templateUrl: './add-edit-servicio.component.html',
  styleUrls: ['./add-edit-servicio.component.css']
})
export class AddEditServicioComponent implements OnInit {

  constructor(private service: ServicioService) { }

  @Input() servicio: any;

  ngOnInit(): void {
  }

}
