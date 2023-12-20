# Angular Unit Testing of Components

## Basic Info about test configurations:

* imports:
  Purpose: Specifies the modules that your test component or service depends on.
  Import types: Other Angular modules, Testing modules, custom modules.

* Declarations:
  Purpose: Lists the components or directives that you want to test within the testing module.
  Use cases: Testing components in isolation, testing custom directives.

* Providers:
  Purpose: Provides services that your test component or service needs to function correctly.
  Types of providers: Real services, Mock services (for isolation and controlling behavior), Spy objects (for observing interactions)

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
        fixture = TestBed.createComponent(CoursesCardListComponent);
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

* ComponentFixture
  In Angular testing, a ComponentFixture represents an instance of a component created and controlled within the testing environment. It allows you to interact with the component, test its behavior, and verify its output. Here are some key aspects of ComponentFixture:

  - Creation: You can create a ComponentFixture using the TestBed class provided by Angular testing tools.
  - Isolation: It provides an isolated environment for testing the component, independent of the rest of the application.
  - Access to elements and data: You can access the component's DOM elements, data bindings, and lifecycle hooks using methods and properties provided by ComponentFixture.
  - Trigger events and actions: You can simulate user interactions by triggering events on the component's elements and invoking its methods.
  - Verify rendered output: You can assert the rendered HTML content, styles, and component behavior based on your tests.
  
  Overall, ComponentFixture serves as the foundation for testing your Angular components in a controlled and isolated environment.

* fixture.componentInstance
  In Angular testing, fixture.componentInstance refers to the actual instance of the component under test, accessible through the ComponentFixture object. Here's a breakdown of its definition and significance:

  fixture.componentInstance is a property of the ComponentFixture object that allows you to directly access the component instance created within the testing environment. It provides you with the ability to:

- Interact with the component's public API: You can call its public methods, access its properties, and modify its state to test its behavior in different scenarios.
- Verify internal state and logic: You can directly check the component's internal data, variables, and methods to ensure they are behaving as expected.
- Trigger lifecycle hooks: You can manually trigger the component's lifecycle hooks, such as ngOnInit or ngOnDestroy, to test their functionality in isolation.
- Combine with other testing tools: You can use fixture.componentInstance in conjunction with other testing tools like DebugElement to test the interaction between the component - and its rendered UI.

Significance:
fixture.componentInstance is a crucial element in Angular testing because it allows you to test the component itself, beyond just its rendered output. You can directly interact with its internal logic, verify its state, and trigger specific behavior without relying solely on its external interactions. This provides a more comprehensive and in-depth level of testing for your components.

In summary, fixture.componentInstance is your bridge to the component's internal workings within the testing environment, enabling you to test its logic, state, and interaction with other components beyond just the visual output.

* DebugElement
  A DebugElement represents a single DOM element within the component's rendered template. It provides access to the element's properties, child elements, and event listeners for further testing and manipulation. Here are some key aspects of DebugElement:

- Hierarchy: DebugElements form a tree structure representing the DOM hierarchy of the component's template.
- Access to properties: You can access the element's attributes, classes, styles, and content using getter methods.
- Child elements: You can navigate to and interact with child elements within the same DebugElement using methods like query() and queryAll().
- Event listeners: You can subscribe to events emitted by the element and verify their behavior.
- Manipulating the UI: You can change element properties, trigger events, and modify the rendered content through DebugElement methods.

DebugElement allows you to drill down into the details of the component's rendered UI and test specific elements and their interactions.

In summary, ComponentFixture provides the overall context and control for testing a component, while DebugElement enables you to interact with and test individual elements within the rendered template. They work together to provide a comprehensive testing experience for your Angular components.

## Container Components
* The difference between container/smart components and presentational/dumb components:
  Container components, or smart components usually receive their data from a service.
  Dumb components usually display the data they receive from a container component as inputs.

### Mocking Services
One of the most important things is to know how to mock a service.
We usually do not want to test the service while testing the component, but to test each one of them separately.
Since there are many cases where a component depends on a service, we would need to be able to mock the service and control the data it is sending back to the component.

## Example of mocking a service

1. We create a variable that will be used later on to server as the service we are going to mock
  - In the describe block:
 
 let coursesService: any;

2. We create a jasmine Spy that wil hijack the calls to the service, and will replace them with our own data.
 - In the beforeEach block:

const coursesServiceSpy = jasmine.createSpyObj('CoursesService', ['findAllCourses']);

3. We configure the TestBed with everything we need, especially with the spy that will hijack our service.
 - In the beforeEach block:

  TestBed.configureTestingModule({
      imports: [
        CoursesModule,
        NoopAnimationsModule
      ],
      providers: [
        { provide: CoursesService, useValue: coursesServiceSpy } -> The service we will mock, and the spy that will replace it.
      ]
    }).compileComponents()
      .then(() => {
        fixture = TestBed.createComponent(HomeComponent);
        component = fixture.componentInstance;
        el = fixture.debugElement;
        coursesService = TestBed.inject(CoursesService); -> Injecting the mock service.
      })

4. Inside the specification blocks, we can now use the service and it will be mocked with the data we want to use.
  - Inisde it blocks:

  it('should display only beginner courses', () => {
    coursesService.findAllCourses.and.returnValue(of(beginnerCourses)); -> and.returnValue() is coming from jasmine, since we are using a spy here. We control the data that is sent back.
    fixture.detectChanges();
    const tabs = el.queryAll(By.css('.mdc-tab'));
    const title = tabs[0].nativeElement.textContent;


    expect(tabs.length).toBe(1, 'Unexpected number of tabs found');
    expect(title).toBe('Beginners', 'Could not read title "Beginners"');
  });
