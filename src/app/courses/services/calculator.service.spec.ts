import { CalculatorService } from './calculator.service';
import { TestBed } from '@angular/core/testing';
import { LoggerService } from './logger.service';

describe('CalculatorService', () => {

  let calculator: CalculatorService;
  let loggerSpy: any;

  beforeEach(() => {
    loggerSpy = jasmine.createSpyObj('LoggerService', ['log']);

    TestBed.configureTestingModule({
      providers: [
        CalculatorService, // we provide CalculatorService as an instance to the testing module. This will use a real instance of the service.
        { provide: LoggerService, useValue: loggerSpy } // we provide a custom provider by the name LoggerService, and whenever it is used we want loggerSpy to replace it. This does not create a real instance of the service.
      ]
    })

    calculator = TestBed.inject(CalculatorService);
  });

  it('should add two numbers', () => {

    const result = calculator.add(2, 2);

    expect(result).toBe(4, "unexpected addition result!");
    expect(loggerSpy.log).toHaveBeenCalledTimes(1);
  });

  it('should subtract two numbers', () => {

    const result = calculator.subtract(7, 5);

    expect(result).toEqual(2);
    expect(loggerSpy.log).toHaveBeenCalledTimes(1);
  });
});
