import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowAfiliadoComponent } from './show-afiliado.component';

describe('ShowAfiliadoComponent', () => {
  let component: ShowAfiliadoComponent;
  let fixture: ComponentFixture<ShowAfiliadoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShowAfiliadoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowAfiliadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
