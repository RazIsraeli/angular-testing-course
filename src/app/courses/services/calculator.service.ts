import {Injectable} from '@angular/core';
import {LoggerService} from './logger.service';


@Injectable({
  providedIn: 'root'
})
export class CalculatorService {


  constructor(private logger: LoggerService) {

  }

  add(n1: number, n2:number) {
    this.logger.log("Addition operation called");
    // this.logger.log("Second addition operation called"); //If this line runs, the test fails with an error that the "log" function was called twice rather than once.
    return n1 + n2;
  }

  subtract(n1: number, n2:number) {
    this.logger.log("Subtraction operation called");
    return n1 - n2;
  }


}

