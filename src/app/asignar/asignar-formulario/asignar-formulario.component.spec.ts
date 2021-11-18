import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AsignarFormularioComponent } from './asignar-formulario.component';

describe('AsignarFormularioComponent', () => {
  let component: AsignarFormularioComponent;
  let fixture: ComponentFixture<AsignarFormularioComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AsignarFormularioComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AsignarFormularioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
