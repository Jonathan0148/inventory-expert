import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators, UntypedFormArray } from '@angular/forms';
import { finalize, filter } from 'rxjs/operators';
import { NotificationsService } from 'src/app/shared/services/notifications.service';
import { CrudServices } from '../../../../../shared/services/crud.service';
import { ProductsDetailService } from '../../services/products-detail.service';
import { ValidationsForm } from '../../validations/validations-form';
import { ProductModel } from '../../../../../shared/interfaces/product';
import { NzModalService } from 'ng-zorro-antd/modal';
import { ModalSearchProductsComponent } from '../modal-search-products/modal-search-products.component';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-info-products-form',
  templateUrl: './info-products-form.component.html',
  styleUrls: ['./info-products-form.component.scss']
})
export class InfoProductsFormComponent  {}