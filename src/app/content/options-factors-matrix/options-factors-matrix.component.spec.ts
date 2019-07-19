import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OptionsFactorsMatrixComponent } from './options-factors-matrix.component';

describe('OptionsFactorsMatrixComponent', () => {
  let component: OptionsFactorsMatrixComponent;
  let fixture: ComponentFixture<OptionsFactorsMatrixComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OptionsFactorsMatrixComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OptionsFactorsMatrixComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
