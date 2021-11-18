import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AsignarListaComponent } from './asignar-lista.component';

describe('AsignarListaComponent', () => {
  let component: AsignarListaComponent;
  let fixture: ComponentFixture<AsignarListaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AsignarListaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AsignarListaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
