import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ServicioListaComponent } from './servicio-lista.component';

describe('ServicioListaComponent', () => {
  let component: ServicioListaComponent;
  let fixture: ComponentFixture<ServicioListaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ServicioListaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ServicioListaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
