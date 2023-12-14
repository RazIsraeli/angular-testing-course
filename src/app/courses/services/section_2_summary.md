# Angular Unit Testing of services that use httpClient

## HttpTestingController
The purpose of Angular's HttpTestingController is to mock and test HTTP requests in your Angular unit tests. It lets you control the responses and interactions with your application's HTTP calls without actually making real requests to any external API. This makes your tests faster, more reliable, and easier to maintain.


The purpose of Angular's HttpTestingController is to mock and test HTTP requests in your Angular unit tests. It lets you control the responses and interactions with your application's HTTP calls without actually making real requests to any external API. This makes your tests faster, more reliable, and easier to maintain.

Here are some key things to know about HttpTestingController:

* Mocking responses: You can create mock responses for any HTTP request made by your app during the test. You can define the content, status code, and headers of the response, allowing you to test different scenarios.

* Verifying requests: You can use HttpTestingController to assert that specific HTTP requests were made by your app, including verifying the URL, method, headers, and body of the request.

* Flushing requests: You can control when mocked responses are delivered to your app. You can hold onto requests and flush them all at once or individually, allowing you to test specific sequences of events.

* Improved test isolation: By removing the dependency on external APIs, HttpTestingController helps to isolate your unit tests and prevent external factors from affecting the results.

## In order to use HttpTestingController:

### create a variable in the test description block:

let httpTestingController: HttpTestingController

### add the module to the TestBed configurations imports:

TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule, //using an angular service that provides us with control over the mocked http requests.
      ],
      providers: [
        CoursesService, // The actual service we want to test.
      ]
    });

### inject the service using the TestBed:

httpTestingController = TestBed.inject(HttpTestingController); // needed to work with the mock of httpClient.

## Examples of assertions

  * To which url do you expect the http request to be sent.
const req = httpTestingController.expectOne('/api/courses');

  * what type of http request do you suggest to send.
expect(req.request.method).toEqual("GET");

  * mock data you want the http response to contain.
req.flush({
      payload: Object.values(COURSES) // test data from a static file on this project (see imports above)
    })
