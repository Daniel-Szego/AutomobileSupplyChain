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

/* global getAssetRegistry getFactory emit */

let namespace = "org.automobilesupplychain.basic";
 
/**
 * Creating test data.
 * @param {org.automobilesupplychain.basic.CreateTestDataTransaction} tx The sample transaction instance.
 * @transaction
 */
async function createTestDataTransaction(tx) {  // eslint-disable-line no-unused-vars

}

/**
 * Deleting all the data.
 * @param {org.automobilesupplychain.basic.DeleteAllDataTransaction} tx The sample transaction instance.
 * @transaction
 */
async function deleteAllDataTransaction(tx) {  // eslint-disable-line no-unused-vars

}

/**
 * Creating part transaction.
 * @param {org.automobilesupplychain.basic.CreatePartTransaction} tx The sample transaction instance.
 * @transaction
 */
async function createPartTransaction(tx) {  // eslint-disable-line no-unused-vars
  let partType = tx.partType;
  let amount = tx.amount;
  
}

/**
 * Transfering part transaction.
 * @param {org.automobilesupplychain.basic.TransferPartTransaction} tx The sample transaction instance.
 * @transaction
 */
async function TransferPartTransaction(tx) {  // eslint-disable-line no-unused-vars
  let carPart = tx.carPart;
  let supplier = tx.supplier;
  let manufacturer = tx.manufacturer; 
  
}

/**
 * Creating a car from parts.
 * @param {org.automobilesupplychain.basic.CreateCarTransaction} tx The sample transaction instance.
 * @transaction
 */
async function CreateCarTransaction(tx) {  // eslint-disable-line no-unused-vars
   let manufacturer = tx.manufacturer;
  
}

/**
 * Transfering ready car.
 * @param {org.automobilesupplychain.basic.TransferCarTransaction} tx The sample transaction instance.
 * @transaction
 */
async function TransferCarTransaction(tx) {  // eslint-disable-line no-unused-vars
  let car = tx.car;
  let manufacturer = tx.manufacturer;
  let dealer = tx.dealer;
  
}

/**
 * Selling the car.
 * @param {org.automobilesupplychain.basic.SellCarTransaction} tx The sample transaction instance.
 * @transaction
 */
async function SellCarTransaction(tx) {  // eslint-disable-line no-unused-vars
  let car = tx.car;
  let dealer = tx.dealer;
  
}



