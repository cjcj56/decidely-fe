import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OptionsFactorsInputComponent } from './options-factors-input.component';

describe('OptionsFactorsInputComponent', () => {
  let component: OptionsFactorsInputComponent;
  let fixture: ComponentFixture<OptionsFactorsInputComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OptionsFactorsInputComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OptionsFactorsInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
