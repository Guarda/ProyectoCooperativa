import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditAfiliadoComponent } from './add-edit-afiliado.component';

describe('AddEditAfiliadoComponent', () => {
  let component: AddEditAfiliadoComponent;
  let fixture: ComponentFixture<AddEditAfiliadoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddEditAfiliadoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddEditAfiliadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
