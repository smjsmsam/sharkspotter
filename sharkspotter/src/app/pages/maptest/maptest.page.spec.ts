import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MaptestPage } from './maptest.page';

describe('MaptestPage', () => {
  let component: MaptestPage;
  let fixture: ComponentFixture<MaptestPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MaptestPage]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MaptestPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
