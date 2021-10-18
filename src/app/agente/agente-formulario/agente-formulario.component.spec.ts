import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AgenteFormularioComponent } from './agente-formulario.component';

describe('AgenteFormularioComponent', () => {
  let component: AgenteFormularioComponent;
  let fixture: ComponentFixture<AgenteFormularioComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AgenteFormularioComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AgenteFormularioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
