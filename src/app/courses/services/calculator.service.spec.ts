import { CalculatorService } from './calculator.service';
import { LoggerService } from './logger.service';

describe('CalculatorService', () => {

  it('should add two numbers', () => {
    // const logger = new LoggerService(); // This is a real instance of the logger service.
    const logger = jasmine.createSpyObj('LoggerService', ['log']); //? This is a mock instance of the logger service with the name of the function we want the spy to use.
    // spyOn(logger, 'log') // spy on the instance of logger, specifically on the times the function "log" is called. This is not needed when we was jasmine.createSpyObj().

    const calculator = new CalculatorService(logger);

    const result = calculator.add(2, 2);

    expect(result).toBe(4, "unexpected addition result!");
    expect(logger.log).toHaveBeenCalledTimes(1); //how many times that function can be called (otherwise the test fails)
  });

  it('should subtract two numbers', () => {
    const calculator = new CalculatorService(new LoggerService());

    const result = calculator.subtract(7, 5);

    expect(result).toEqual(2);
  });
});
