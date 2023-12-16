# Angular Unit Testing of Components

## Presentational Components
Definition:

Presentational components primarily handle what is displayed on the screen, presenting data obtained from other components (usually container components) or services. They typically avoid complex logic, calculations, or direct interaction with external APIs. Their main responsibility is to render UI elements based on the data received and handle basic user interactions within the presented view.

### Importing all the relevant modules and components that the component is using.
 beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        CoursesModule // This is going to bring the courseCardList component together with all the needed angular materials that this module needs to display the data.
      ]
    });
  });

### waitForAsync (or "async" which is deprecated)
When we want to wait for asynchronous process to end before moving on to the next process, we should use "waitForAsync".
* For example:
When we want to run async code in the "beforeEach" block, and make sure the specifications are being executed only when the process ends (and all promises are resolved/rejected) we will use waitForAsync, as follows:

 beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [
        CoursesModule,
      ]
    })
      .compileComponents()
      .then(() => {
        fixture = TestBed.createComponent(CoursesCardListComponent); //
        component = fixture.componentInstance;
      });
  }));

** Important notes:
  1. This has nothing to do with the js "async-await" language feature. This is angular's test utility function. No need to use "await" when using async/waitForAsync this way.
  2. waitForAsync waits for all async processes inside the block to end for a predefined amount of time (by default 5 secs).

### Querying the DOM
In order to query the DOM, we need to add another variable to the test suite - "DebugElement", as follows:

 let el: DebugElement; // Needed to query the DOM.
 el.queryAll(By.css('.course-card')); //querying the DOM for all the elements with the class "course-card".

### Important Info
* .compileComponents()
Returns a resolved promise once the compilation process of the components is finished.
You might think that calling compileComponents() ensures that all the components are immediately compiled synchronously, but that is actually not the case.
The compilation of angular components is asynchronous and in some cases might even trigger external HTTP requests to fetch stylesheets or html templates, etc.
This is why we have to use .then() right after it.

## Container Components

## Examples
