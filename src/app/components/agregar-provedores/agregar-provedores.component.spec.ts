import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AgregarProvedoresComponent } from './agregar-provedores.component';

describe('AgregarProvedoresComponent', () => {
  let component: AgregarProvedoresComponent;
  let fixture: ComponentFixture<AgregarProvedoresComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AgregarProvedoresComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AgregarProvedoresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
