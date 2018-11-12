/*
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home/home.component';

import { CarPartComponent } from './CarPart/CarPart.component';
import { CarComponent } from './Car/Car.component';

import { SupplierComponent } from './Supplier/Supplier.component';
import { ManufacturerComponent } from './Manufacturer/Manufacturer.component';
import { DealerComponent } from './Dealer/Dealer.component';

import { CreateTestDataTransactionComponent } from './CreateTestDataTransaction/CreateTestDataTransaction.component';
import { DeleteAllDataTransactionComponent } from './DeleteAllDataTransaction/DeleteAllDataTransaction.component';
import { CreatePartTransactionComponent } from './CreatePartTransaction/CreatePartTransaction.component';
import { TransferPartTransactionComponent } from './TransferPartTransaction/TransferPartTransaction.component';
import { CreateCarTransactionComponent } from './CreateCarTransaction/CreateCarTransaction.component';
import { TransferCarTransactionComponent } from './TransferCarTransaction/TransferCarTransaction.component';
import { SellCarTransactionComponent } from './SellCarTransaction/SellCarTransaction.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'CarPart', component: CarPartComponent },
  { path: 'Car', component: CarComponent },
  { path: 'Supplier', component: SupplierComponent },
  { path: 'Manufacturer', component: ManufacturerComponent },
  { path: 'Dealer', component: DealerComponent },
  { path: 'CreateTestDataTransaction', component: CreateTestDataTransactionComponent },
  { path: 'DeleteAllDataTransaction', component: DeleteAllDataTransactionComponent },
  { path: 'CreatePartTransaction', component: CreatePartTransactionComponent },
  { path: 'TransferPartTransaction', component: TransferPartTransactionComponent },
  { path: 'CreateCarTransaction', component: CreateCarTransactionComponent },
  { path: 'TransferCarTransaction', component: TransferCarTransactionComponent },
  { path: 'SellCarTransaction', component: SellCarTransactionComponent },
  { path: '**', redirectTo: '' }
];

@NgModule({
 imports: [RouterModule.forRoot(routes)],
 exports: [RouterModule],
 providers: []
})
export class AppRoutingModule { }
