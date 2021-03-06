import { InputNumberComponent } from './../number-field/input-number.component';
import { DebugElement } from '@angular/core';
import { async, ComponentFixture, TestBed, tick, fakeAsync } from '@angular/core/testing';
import { FormControl } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { Subject } from 'rxjs';

import { Measure, NgXformModule } from '../..';
import { MeasureField } from '../fields';
import { NgXformGroup } from '../ng-xform-group';
import { MeasureFieldComponent } from './measure-field.component';

describe('MeasureFieldComponent', () => {
  let component: MeasureFieldComponent;
  let fixture: ComponentFixture<MeasureFieldComponent>;
  let model: any;
  let inputEl: DebugElement;

  beforeEach(
    async(() => {
      TestBed.configureTestingModule({
        imports: [
          NgXformModule
        ]
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(MeasureFieldComponent);
    component = fixture.componentInstance;
    component.editing = true;
    component.form = new NgXformGroup({ 'measure': new FormControl() });
    component.field = new MeasureField({
      key: 'measure',
      label: 'Measure',
      modelUnit: 'm'
    });
    component.ngOnInit();
    component.inputNumber.ngAfterViewInit();
    fixture.detectChanges();
    inputEl = fixture.debugElement.query(By.css('input'));
  });

  it('should render MeasureField', () => {
    const key = 'measure';
    const labelText = 'Measure';

    expect(component).toBeTruthy();
    const el = fixture.debugElement.query(By.css(`#${key}-div`));
    expect(el).toBeTruthy();
    const label = el.query(By.css('label'));
    expect(label).toBeTruthy();
    expect(label.nativeElement.textContent).toContain(labelText);
  });

  it('should render form value', () => {
    component.writeValue({ value: 22, unit: 'm' });
    expect(component.viewModel).toBe(22);
    expect(component.viewUnit).toBe('m');
  });

  it('should update form value', () => {
    const newValueString = '15';

    inputEl.nativeElement.value = newValueString;
    inputEl.nativeElement.dispatchEvent(new Event('input'));
    expect(component.formattedValue).toEqual('15 m');

    component.changeUnit('cm');
    expect(component.viewModel).toEqual(1500);
    expect(component.viewUnit).toEqual('cm');
    expect(component.formattedValue).toEqual('1500 cm');

    component.changeUnit('');
    expect(component.viewModel).toEqual(15);
    expect(component.viewUnit).toEqual('m');
    expect(component.formattedValue).toEqual('15 m');

    component.field.modelUnit = 'inch';
    fixture.detectChanges();
    component.ngOnInit();
    inputEl.nativeElement.value = newValueString;
    inputEl.nativeElement.dispatchEvent(new Event('input'));
    expect(component.formattedValue).toEqual('15 inch');
  });

  it('should show unit and units dropdown', () => {
    fixture.detectChanges();
    expect(component.availableUnits.length).toBe(1);

    component.ngOnInit();
    fixture.detectChanges();
    let unitEl = fixture.debugElement.query(By.css('.input-group-addon span'));

    expect(unitEl).toBeTruthy();
    expect(unitEl.nativeElement.textContent.trim()).toBe('m');
    expect(component.availableUnits.length).toBeGreaterThan(0);

    component.field.availableUnits = ['m', 'cm', 'mm', 'ft'];
    component.field.viewUnit = 'cm';
    component.ngOnInit();
    fixture.detectChanges();
    expect(unitEl.nativeElement.textContent.trim()).toBe('cm');
    expect(component.availableUnits.length).toBe(4);

    const availableUnitsObserver = new Subject<string[]>();
    const viewUnitObserver = new Subject<string>();
    component.field.availableUnits = availableUnitsObserver;
    component.field.viewUnit = viewUnitObserver;
    component.ngOnInit();
    availableUnitsObserver.next(['m', 'cm', 'mm', 'ft', 'pica']);
    viewUnitObserver.next('mm');
    fixture.detectChanges();
    expect(unitEl.nativeElement.textContent.trim()).toBe('mm');
    expect(component.availableUnits.length).toBe(5);
  })


  it('should show 0 value', () => {
    component.writeValue({ value: 0, unit: 'm' });
    expect(component.formattedValue).toBe('0 m');
  })

  it('should show "-" when null', () => {
    component.writeValue(null);
    expect(component.formattedValue).toBe('-');
  })

});
