import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SiteInformationComponent } from './site-information.component';

describe('SiteInformationComponent', () => {
  let component: SiteInformationComponent;
  let fixture: ComponentFixture<SiteInformationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SiteInformationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SiteInformationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
