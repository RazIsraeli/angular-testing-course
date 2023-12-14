## Angular Unit Testing Best Practices

Usually we would want to test 1 specific functionality of the service in each test (hence the name - unit test).
 * We can have multiple specifications for 1 method, and we would want that for example when we want to test error handling scenarios.

# 1. Setting up the test with a beforeEach() function.

# 2. Once the test is set up we perform the operation we want to test.
For example:
const result = calculator.add(2,2)

# 3. Finally we would run assertions that either pass or fail the test.
For example:

expect(result).toEqual(4).

## Comments
# Whenever we are testing a specific service, WE WILL MOCK ALL ITS DEPENDENCIES using jamine spies.
For the service we are testing we will use a real instance.
For the service's dependencies we will use mock (spies).

## Examples:
# 1
loggerSpy = jasmine.createSpyObj('LoggerService', ['log']);

* Using jasmine spy to create a mock instance of the LoggerSerice and its 'log' function, rather than using a real instance of the service.

# 2 
TestBed.configureTestingModule({
      providers: [
        CalculatorService,
        { provide: LoggerService, useValue: loggerSpy }
      ]
    })

* Configuring the testing module we are using, to know it should use a real instance of CalculatorService and a mock of LoggerService (and with what to replace it).

# 3
calculator = TestBed.inject(CalculatorService);

* Injecting into our testbed an instance of the CalculatorService.
