import { CalculatorService } from './calculator.service';
import { LoggerService } from './logger.service';

describe('CalculatorService', () => {

  it('should add two numbers', () => {
    const calculator = new CalculatorService(new LoggerService());

    const result = calculator.add(2, 2);

    expect(result).toBe(4, "unexpected addition result!");
  });

  it('should subtract two numbers', () => {
    const calculator = new CalculatorService(new LoggerService());

    const result = calculator.subtract(7, 5);

    expect(result).toEqual(2);
  });
});
