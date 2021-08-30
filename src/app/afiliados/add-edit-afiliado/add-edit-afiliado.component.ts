import { Component, OnInit, Input } from '@angular/core';
import { AfiliadoService } from 'src/app/services/afiliado.service';

@Component({
  selector: 'app-add-edit-afiliado',
  templateUrl: './add-edit-afiliado.component.html',
  styleUrls: ['./add-edit-afiliado.component.css']
})
export class AddEditAfiliadoComponent implements OnInit {

  constructor(private service: AfiliadoService) { }

  @Input() afiliado: any;

  ngOnInit(): void {
  }

}
