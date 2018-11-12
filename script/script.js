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

    console.log('init test data');

    console.log('Creating a Supplier');  
    const factory = getFactory(); 
	
  	// adding supplier 1
    const supplierReg = await getParticipantRegistry(namespace + '.Supplier');   
    const supplier = await factory.newResource(namespace, 'Supplier', "1");
  
    supplier.name = "supplier 1";
    supplier.supplyerType = "TIER_1_SUPPLIER"; 
    supplier.GHG = 100;
    const newAddress = await factory.newConcept(namespace, 'Address');
	newAddress.country = "Bejing";
	newAddress.city = "China";
	newAddress.street = "Xia Mo Street";
    newAddress.hauseNr = 16;
  	supplier.address = newAddress;
  
    await supplierReg.add(supplier);       

  	// adding supplier 2
    const supplier2Reg = await getParticipantRegistry(namespace + '.Supplier');   
    const supplier2 = await factory.newResource(namespace, 'Supplier', "2");
  
    supplier2.name = "supplier 2";
    supplier2.supplyerType = "TIER_2_SUPPLIER"; 
    supplier2.GHG = 100;
    const newAddress2 = await factory.newConcept(namespace, 'Address');
	newAddress2.country = "Bejing";
	newAddress2.city = "China";
	newAddress2.street = "Xia Mo Street";
    newAddress2.hauseNr = 16;
  	supplier2.address = newAddress2;
  
    await supplier2Reg.add(supplier2);       

  	// adding supplier 3
    const supplier3Reg = await getParticipantRegistry(namespace + '.Supplier');   
    const supplier3 = await factory.newResource(namespace, 'Supplier', "3");
  
    supplier3.name = "supplier 3";
    supplier3.supplyerType = "TIER_3_SUPPLIER"; 
    supplier3.GHG = 100;
    const newAddress3 = await factory.newConcept(namespace, 'Address');
	newAddress3.country = "Bejing";
	newAddress3.city = "China";
	newAddress3.street = "Xia Mo Street";
    newAddress3.hauseNr = 16;
  	supplier3.address = newAddress3;
  
    await supplier3Reg.add(supplier3);       
  
  	// adding Manufacturer
    const manufacturerReg = await getParticipantRegistry(namespace + '.Manufacturer');   
    const manufacturer = await factory.newResource(namespace, 'Manufacturer', "1");
  
    manufacturer.name = "Manufacturer";
    manufacturer.carType = "AUDI"; 
    manufacturer.GHG = 100;
    manufacturer.partStorage = new Array();
    manufacturer.carStorage = new Array();  
    const newAddress4 = await factory.newConcept(namespace, 'Address');
	newAddress4.country = "Bejing";
	newAddress4.city = "China";
	newAddress4.street = "Xia Mo Street";
    newAddress4.hauseNr = 16;
  	manufacturer.address = newAddress4;
  
    await manufacturerReg.add(manufacturer);       
  
  	// adding Dealer
    const dealerReg = await getParticipantRegistry(namespace + '.Dealer');   
    const dealer = await factory.newResource(namespace, 'Dealer', "1");
  	dealer.carType = new Array();
    dealer.carStorage = new Array();
    dealer.name = "Dealer";
    dealer.GHG = 100;
    const newAddress5 = await factory.newConcept(namespace, 'Address');
	newAddress5.country = "Bejing";
	newAddress5.city = "China";
	newAddress5.street = "Xia Mo Street";
    newAddress5.hauseNr = 16;
  	dealer.address = newAddress5;
  
    await dealerReg.add(dealer);       
    
    console.log('end test data');  
}

/**
 * Deleting all the data.
 * @param {org.automobilesupplychain.basic.DeleteAllDataTransaction} tx The sample transaction instance.
 * @transaction
 */
async function deleteAllDataTransaction(tx) {  // eslint-disable-line no-unused-vars

    // deleting assets
    const carReg = await getAssetRegistry(namespace + '.Car'); 
    let cars = await carReg.getAll();
    await carReg.removeAll(cars);

    const carPartReg = await getAssetRegistry(namespace + '.CarPart'); 
    let carPart = await carPartReg.getAll();
    await carPartReg.removeAll(carPart);

  	// deleting participants
    const supplierReg = await getParticipantRegistry(namespace + '.Supplier');
    let suppliers = await supplierReg.getAll();
    await supplierReg.removeAll(suppliers);
    
    const manufacturerReg = await getParticipantRegistry(namespace + '.Manufacturer');
    let manufacturer = await manufacturerReg.getAll();
    await manufacturerReg.removeAll(manufacturer);

    const dealerReg = await getParticipantRegistry(namespace + '.Dealer');
    let dealer = await dealerReg.getAll();
    await dealerReg.removeAll(dealer);
}

/**
 * Creating part transaction.
 * @param {org.automobilesupplychain.basic.CreatePartTransaction} tx The sample transaction instance.
 * @transaction
 */
async function createPartTransaction(tx) {  // eslint-disable-line no-unused-vars
  let partType = tx.partType;
  let amount = tx.amount;
  let atStage = tx.atStage;
  
  if (amount < 1) {
  	throw new Error("The amount to be created must be greater than zero");
  }
  
  const factory = getFactory(); 

  const carPartReg = await getAssetRegistry(namespace + '.CarPart');   

  // getting next id
  let existingCarParts = await carPartReg.getAll();
  let numberOfCarParts = 0;
  
  await existingCarParts.forEach(function (carParts) {
    numberOfCarParts ++;
  });
  numberOfCarParts ++; 	

  const carPart = await factory.newResource(namespace, 'CarPart', numberOfCarParts.toString());
  carPart.partType = partType;
  carPart.amount = amount;
  carPart.atStage = atStage;
  
  await carPartReg.add(carPart);      
  
  // emitting CarPartCreated event

  let carPartCreatedEvent = factory.newEvent(namespace, 'CarPartCreated');
  carPartCreatedEvent.carPart = carPart;
  carPartCreatedEvent.supplier = atStage;
  carPartCreatedEvent.date = new Date();
  await emit(carPartCreatedEvent);  	  
}

/**
 * Transfering part transaction.
 * @param {org.automobilesupplychain.basic.TransferPartTransaction} tx The sample transaction instance.
 * @transaction
 */
async function TransferPartTransaction(tx) {  // eslint-disable-line no-unused-vars
  let carPart = tx.carPart;
  let supplier = carPart.atStage;
  let manufacturer = tx.manufacturer; 
  
  const factory = getFactory(); 
  
  const carPartReg = await getAssetRegistry(namespace + '.CarPart'); 
  carPart.atStage = manufacturer;
  carPartReg.update(carPart);
  
  const manufacturerReg = await getParticipantRegistry(namespace + '.Manufacturer'); 
  manufacturer.partStorage.push(carPart);
  manufacturerReg.update(manufacturer);
  
  // emitting CarPartTransferred event
  
  let carPartTransferredEvent = factory.newEvent(namespace, 'CarPartTransferred');
  carPartTransferredEvent.carPart = carPart;
  carPartTransferredEvent.from = supplier;
  carPartTransferredEvent.to = manufacturer;
  carPartTransferredEvent.date = new Date();
  await emit(carPartTransferredEvent);  	
}

/**
 * Creating a car from parts.
 * @param {org.automobilesupplychain.basic.CreateCarTransaction} tx The sample transaction instance.
 * @transaction
 */
async function CreateCarTransaction(tx) {  // eslint-disable-line no-unused-vars
   let manufacturer = tx.manufacturer;
  
   // checking if parts exists
  
   // deleting exiting parts
  
   // creating new car
  
  const factory = getFactory(); 

  const carReg = await getAssetRegistry(namespace + '.Car');   

  // getting next id
  let existingCars = await carReg.getAll();
  let numberOfCars = 0;
  
  await existingCars.forEach(function (car) {
    numberOfCars ++;
  });
  numberOfCars ++; 	

  const car = await factory.newResource(namespace, 'Car', numberOfCars.toString());
  car.carType = manufacturer.carType;
  car.atStage = manufacturer;
  car.carStatus = "CREATED";
  
  await carReg.add(car);      
  
  // putting into the carStorage variable of the manufacturer
  
  const manufacturerReg = await getParticipantRegistry(namespace + '.Manufacturer'); 
  manufacturer.carStorage.push(car);
  manufacturerReg.update(manufacturer);
  
  // emitting CarPartCreated event
  
  let carCreatedEvent = factory.newEvent(namespace, 'CarCreated');
  carCreatedEvent.car = car;
  carCreatedEvent.at = manufacturer;
  carCreatedEvent.date = new Date();
  await emit(carCreatedEvent);  
  
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

  const factory = getFactory(); 
  
  const carReg = await getAssetRegistry(namespace + '.Car'); 
  car.atStage = dealer;
  carReg.update(car);
  
  const dealerReg = await getParticipantRegistry(namespace + '.Dealer'); 
  dealer.carStorage.push(car);
  dealerReg.update(dealer);
   
  const manufacturerReg = await getParticipantRegistry(namespace + '.Manufacturer'); 
  
  var carIndex = manufacturer.carStorage.indexOf(car);
  console.log("INDEX : " + carIndex);
  if (carIndex > -1) {
     manufacturer.carStorage.splice(carIndex, 1);
  }
  manufacturerReg.update(manufacturer);
  
  // emitting CarPartTransferred event
  
  let carTransferredEvent = factory.newEvent(namespace, 'CarTransported');
  carTransferredEvent.car = car;
  carTransferredEvent.from = manufacturer;
  carTransferredEvent.to = dealer;
  carTransferredEvent.date = new Date();
  await emit(carTransferredEvent);  	
}

/**
 * Selling the car.
 * @param {org.automobilesupplychain.basic.SellCarTransaction} tx The sample transaction instance.
 * @transaction
 */
async function SellCarTransaction(tx) {  // eslint-disable-line no-unused-vars
  let car = tx.car;
  let dealer = tx.dealer;
  
  // update car status
  const carReg = await getParticipantRegistry(namespace + '.Car'); 
  car.carStatus = "SOLD";
  carReg.update(car);
  
  // delete from dealer pool
  const dealerReg = await getParticipantRegistry(namespace + '.Dealer'); 
  
  var carIndex = manufacturer.carStorage.indexOf(car);
  console.log("INDEX : " + carIndex);
  if (carIndex > -1) {
     manufacturer.carStorage.splice(carIndex, 1);
  }
  dealerReg.update(dealer);

  // emitting CarPartTransferred event
    
  let carSoldEvent = factory.newEvent(namespace, 'CarSold');
  carSoldEvent.car = car;
  carSoldEvent.dealer = dealer;
  carSoldEvent.date = new Date();
  await emit(carSoldEvent); 
  
}


