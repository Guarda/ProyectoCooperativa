import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AgenteContratoFormularioComponent } from './agente-contrato-formulario.component';

describe('AgenteContratoFormularioComponent', () => {
  let component: AgenteContratoFormularioComponent;
  let fixture: ComponentFixture<AgenteContratoFormularioComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AgenteContratoFormularioComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AgenteContratoFormularioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
