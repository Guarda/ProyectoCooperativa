import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AfiliadoAñadirFormularioComponent } from './afiliado-añadir-formulario.component';

describe('AfiliadoAñadirFormularioComponent', () => {
  let component: AfiliadoAñadirFormularioComponent;
  let fixture: ComponentFixture<AfiliadoAñadirFormularioComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AfiliadoAñadirFormularioComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AfiliadoAñadirFormularioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
