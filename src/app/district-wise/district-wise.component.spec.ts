import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DistrictWiseComponent } from './district-wise.component';

describe('DistrictWiseComponent', () => {
  let component: DistrictWiseComponent;
  let fixture: ComponentFixture<DistrictWiseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DistrictWiseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DistrictWiseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
