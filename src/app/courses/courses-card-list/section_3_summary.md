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

## Examples
