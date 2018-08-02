import { bsDatepickerModuleWithProviders, bsDropdownModuleWithProviders } from './ng-xform.module-imports';
import { CommonModule } from '@angular/common';
import { Inject, LOCALE_ID, NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { BsLocaleService } from 'ngx-bootstrap/datepicker';

import { PipesModule } from '../pipes/pipes.module';
import { CheckboxFieldComponent } from './checkbox-field/checkbox-field.component';
import { DateFieldComponent } from './date-field/date-field.component';
import { EditableLabelComponent } from './editable-label/editable-label.component';
import { OptionalTagComponent } from './field-components/optional-tag.component';
import { ErrorMessagePipe } from './field-error-message/error-message.pipe';
import { FieldErrorMessageComponent } from './field-error-message/field-error-message.component';
import { FormControlLayoutComponent } from './form-control-layout/form-control-layout.component';
import { FormGroupComponent } from './form-group/form-group.component';
import { MeasureFieldComponent } from './measure-field/measure-field.component';
import { MultilineFieldComponent } from './multiline-field/multiline-field.component';
import { NgXformComponent } from './ng-xform.component';
import { RadioGroupFieldComponent } from './radiogroup-field/radiogroup-field.component';
import { SelectFieldComponent } from './select-field/select-field.component';


@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    PipesModule,
    NgSelectModule,
    bsDatepickerModuleWithProviders,
    bsDropdownModuleWithProviders,
  ],
  declarations: [
    NgXformComponent,
    FormGroupComponent,
    EditableLabelComponent,
    CheckboxFieldComponent,
    RadioGroupFieldComponent,
    MeasureFieldComponent,
    SelectFieldComponent,
    FieldErrorMessageComponent,
    ErrorMessagePipe,
    MultilineFieldComponent,
    OptionalTagComponent,
    DateFieldComponent,
    FormControlLayoutComponent,
  ],
  exports: [
    NgXformComponent,
    FieldErrorMessageComponent,
    PipesModule,
  ]
})
export class NgXformModule {
  constructor(bsLocaleService: BsLocaleService, @Inject(LOCALE_ID) locale: string) {
    if (bsLocaleService.locale.value !== locale) {
      bsLocaleService.use(locale);
    }
  }
}
