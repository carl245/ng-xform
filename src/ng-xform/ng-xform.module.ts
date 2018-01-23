import { CheckboxFieldComponent } from './checkbox-field/checkbox-field.component';
import { ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TypeaheadModule } from 'ngx-bootstrap/typeahead';

import { NgXformComponent } from './ng-xform.component';
import { EditableLabelComponent } from './editable-label/editable-label.component';
import { MeasureFieldComponent } from './measure-field/measure-field.component';
import { SelectFieldComponent } from './select-field/select-field.component';
import { FieldErrorMessageComponent } from './field-error-message/field-error-message.component';
import { ErrorMessagePipe } from './field-error-message/error-message.pipe';
import { PipesModule } from '../pipes/pipes.module';
import { MultilineFieldComponent } from './multiline-field/multiline-field.component';
import { AutocompleteFieldComponent } from './autocomplete-field/autocomplete-field.component';

@NgModule({
  imports: [
    CommonModule,
    TypeaheadModule.forRoot(),
    ReactiveFormsModule,
    PipesModule,
  ],
  declarations: [
    NgXformComponent,
    EditableLabelComponent,
    CheckboxFieldComponent,
    MeasureFieldComponent,
    SelectFieldComponent,
    FieldErrorMessageComponent,
    ErrorMessagePipe,
    MultilineFieldComponent,
    AutocompleteFieldComponent,
  ],
  exports: [
    NgXformComponent,
    FieldErrorMessageComponent,
    PipesModule,
  ]
})
export class NgXformModule { }
