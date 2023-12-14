import { TestBed } from '@angular/core/testing';
import { CoursesService } from './courses.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { COURSES } from '../../../../server/db-data';

describe('CoursesService', () => {

  let coursesService: CoursesService;
  let httpTestingController: HttpTestingController; // lets you control the responses and interactions with your application's HTTP calls without actually making real requests to any external API. This makes your tests faster, more reliable, and easier to maintain.

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule, //using an angular service that provides us with control over the mocked http requests.
      ],
      providers: [
        CoursesService, // The actual service we want to test.
      ]
    });

    coursesService = TestBed.inject(CoursesService);
    httpTestingController = TestBed.inject(HttpTestingController); // needed to work with the mock of httpClient.
  });

  it('should retrieve all courses', () => {
    coursesService.findAllCourses()
      .subscribe((courses) => {
        expect(courses).toBeTruthy('No courses returned');

        expect(courses.length).toBe(12, 'Incorrect number of courses');

        const course = courses.find((course) => course.id === 12);

        expect(course.titles.description).toBe('Angular Testing Course');
      });

    //! The httpTestingController is used to help us control what data comes through mocked http requests while testing.
    const req = httpTestingController.expectOne('/api/courses'); // This means that we are expecting only 1 http request to be sent towards the given url.
    expect(req.request.method).toEqual("GET"); // This means that we expect the request that goes out to be of type GET.

    //! specifies which mock data should our http call return when the http request is mocked.
    req.flush({
      payload: Object.values(COURSES) // test data from a static file on this project (see imports above)
    })
  });
});
