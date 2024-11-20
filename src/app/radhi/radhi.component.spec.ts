import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RadhiComponent } from './radhi.component';

describe('RadhiComponent', () => {
  let component: RadhiComponent;
  let fixture: ComponentFixture<RadhiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RadhiComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RadhiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
