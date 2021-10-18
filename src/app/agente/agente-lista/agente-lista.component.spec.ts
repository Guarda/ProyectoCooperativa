import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AgenteListaComponent } from './agente-lista.component';

describe('AgenteListaComponent', () => {
  let component: AgenteListaComponent;
  let fixture: ComponentFixture<AgenteListaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AgenteListaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AgenteListaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
