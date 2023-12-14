import { CalculatorService } from './calculator.service';
import { LoggerService } from './logger.service';

describe('CalculatorService', () => {

  //! we can't define the variables inside the "beforeEach" scope since then the "it" blocks will not be able to use them, so they are created here.
  let calculator: CalculatorService;
  let loggerSpy: any; //This is of type any since this is a jasmine spy and NOT AN INSTANCE OF THE LOGGER SERVICE.

  beforeEach(() => {
    loggerSpy = jasmine.createSpyObj('LoggerService', ['log']);
    calculator = new CalculatorService(loggerSpy);
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
