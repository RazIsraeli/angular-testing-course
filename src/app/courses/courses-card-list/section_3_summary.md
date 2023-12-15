# Angular Unit Testing of Components

## Presentational Components
Definition:

Presentational components primarily handle what is displayed on the screen, presenting data obtained from other components (usually container components) or services. They typically avoid complex logic, calculations, or direct interaction with external APIs. Their main responsibility is to render UI elements based on the data received and handle basic user interactions within the presented view.

# Importing all the relevant modules and components that the component is using.
 beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        CoursesModule // This is going to bring the courseCardList component together with all the needed angular materials that this module needs to display the data.
      ]
    });
  });

## Container Components

## Examples
