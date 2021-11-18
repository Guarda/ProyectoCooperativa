import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AfiliadoAgenteFormularioComponent } from './afiliado-agente-formulario.component';

describe('AfiliadoAgenteFormularioComponent', () => {
  let component: AfiliadoAgenteFormularioComponent;
  let fixture: ComponentFixture<AfiliadoAgenteFormularioComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AfiliadoAgenteFormularioComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AfiliadoAgenteFormularioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
