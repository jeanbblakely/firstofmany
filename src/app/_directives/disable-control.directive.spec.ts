import { DisableControlDirective } from './disable-control.directive';
import { FormGroup, ReactiveFormsModule, FormControl } from '@angular/forms';
import { ComponentFixture, async, TestBed } from '@angular/core/testing';
import { DebugElement, Component } from '@angular/core';
import { By } from '@angular/platform-browser';

@Component({
  template: `<form [formGroup]="testGroup">
      <input type="text" formControlName="testControl" id="testControl" [appDisableControl]="mode">
    </form>`
})
class TestDisableControlComponent {
  testGroup = new FormGroup({
    testControl: new FormControl([''])
  });
  mode = true;
}

describe('DisableControlDirective', () => {
  let component: TestDisableControlComponent;
  let fixture: ComponentFixture<TestDisableControlComponent>;
  let controlInput: DebugElement;

  beforeEach(async(() => {
    TestBed.
      configureTestingModule({
        imports: [
          ReactiveFormsModule
        ],
        declarations: [
          TestDisableControlComponent,
          DisableControlDirective
        ]
      })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.
      createComponent(TestDisableControlComponent);
    component = fixture.
      componentInstance;
    controlInput = fixture.
      debugElement.query(By.css('input#testControl'));
    fixture.detectChanges();
  });

  it('input should be disabled', () => {
    expect(controlInput.nativeElement.disabled).toBe(true);
  });
});