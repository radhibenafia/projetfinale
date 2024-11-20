import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProtestationComponent } from './protestation.component';

describe('ProtestationComponent', () => {
  let component: ProtestationComponent;
  let fixture: ComponentFixture<ProtestationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProtestationComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProtestationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
