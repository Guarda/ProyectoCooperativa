import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AfiliadoFormularioComponent } from './afiliado-formulario.component';

describe('AfiliadoFormularioComponent', () => {
  let component: AfiliadoFormularioComponent;
  let fixture: ComponentFixture<AfiliadoFormularioComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AfiliadoFormularioComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AfiliadoFormularioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
