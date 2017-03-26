import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdvancedGameComponent } from './advanced-game.component';

describe('AdvancedGameComponent', () => {
  let component: AdvancedGameComponent;
  let fixture: ComponentFixture<AdvancedGameComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdvancedGameComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdvancedGameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
