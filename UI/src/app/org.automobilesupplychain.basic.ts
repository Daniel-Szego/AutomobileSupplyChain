import {Asset} from './org.hyperledger.composer.system';
import {Participant} from './org.hyperledger.composer.system';
import {Transaction} from './org.hyperledger.composer.system';
import {Event} from './org.hyperledger.composer.system';
// export namespace org.automobilesupplychain.basic{
   export class Address {
      country: string;
      city: string;
      street: string;
      hauseNr: number;
   }
   export abstract class SupplyChainActor extends Participant {
      id: string;
      name: string;
      GHG: number;
      address: Address;
   }
   export enum SupplyerTypeEnum {
      TIER_1_SUPPLIER,
      TIER_2_SUPPLIER,
      TIER_3_SUPPLIER,
   }
   export class Supplier extends SupplyChainActor {
      supplyerType: SupplyerTypeEnum;
   }
   export enum CarTypeEnum {
      AUDI,
      BMW,
      VW,
   }
   export class Manufacturer extends SupplyChainActor {
      carType: CarTypeEnum;
      partStorage: CarPart[];
      carStorage: Car[];
   }
   export class Dealer extends SupplyChainActor {
      carType: CarTypeEnum[];
      carStorage: Car[];
   }
   export abstract class CARAbstratcAsset extends Asset {
      id: string;
      atStage: SupplyChainActor;
   }
   export enum CarPartTypeEnum {
      WHEEL,
      ENGINE,
      CHASSIS,
      BODY,
      WINDSHIELD,
   }
   export enum CarPartStatusEnum {
      CREATED,
      CONSUMED,
   }
   export class CarPart extends CARAbstratcAsset {
      amount: number;
      partType: CarPartTypeEnum;
      carPartStatus: CarPartStatusEnum;
   }
   export enum ColorEnum {
      WHITE,
      BLACK,
      BLUE,
      YELLOW,
      GREY,
   }
   export enum CarStatusEnum {
      CREATED,
      SOLD,
   }
   export class Car extends CARAbstratcAsset {
      carType: CarTypeEnum;
      carStatus: CarStatusEnum;
      color: ColorEnum;
      license: string;
   }
   export class CreateTestDataTransaction extends Transaction {
   }
   export class DeleteAllDataTransaction extends Transaction {
   }
   export class CreatePartTransaction extends Transaction {
      partType: CarPartTypeEnum;
      amount: number;
      atStage: Supplier;
   }
   export class TransferPartTransaction extends Transaction {
      carPart: CarPart;
      supplier: Supplier;
      manufacturer: Manufacturer;
   }
   export class CreateCarTransaction extends Transaction {
      manufacturer: Manufacturer;
   }
   export class TransferCarTransaction extends Transaction {
      car: Car;
      manufacturer: Manufacturer;
      dealer: Dealer;
   }
   export class SellCarTransaction extends Transaction {
      car: Car;
      dealer: Dealer;
   }
   export class CarPartCreated extends Event {
      carPart: CarPart;
      supplier: Supplier;
      date: Date;
   }
   export class CarPartTransferred extends Event {
      carPart: CarPart;
      from: Supplier;
      to: Manufacturer;
      date: Date;
   }
   export class CarCreated extends Event {
      car: Car;
      at: Manufacturer;
      date: Date;
   }
   export class CarTransported extends Event {
      car: Car;
      from: Manufacturer;
      to: Dealer;
      date: Date;
   }
   export class CarSold extends Event {
      car: Car;
      dealer: Dealer;
      date: Date;
   }
// }
