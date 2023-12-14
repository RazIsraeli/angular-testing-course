import { TestBed } from '@angular/core/testing';
import { CoursesService } from './courses.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { COURSES, LESSONS, findLessonsForCourse } from '../../../../server/db-data';
import { Course } from '../model/course';
import { HttpErrorResponse } from '@angular/common/http';

describe('CoursesService', () => {

  let coursesService: CoursesService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
      ],
      providers: [
        CoursesService,
      ]
    });

    coursesService = TestBed.inject(CoursesService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  })

  it('should retrieve all courses', () => {
    coursesService.findAllCourses()
      .subscribe((courses) => {
        expect(courses).toBeTruthy('No courses returned');

        expect(courses.length).toBe(12, 'Incorrect number of courses');

        const course = courses.find((course) => course.id === 12);

        expect(course.titles.description).toBe('Angular Testing Course');
      });

    const req = httpTestingController.expectOne('/api/courses');
    expect(req.request.method).toEqual("GET");

    req.flush({
      payload: Object.values(COURSES)
    });
  });

  it('should find a course by ID', () => {
    coursesService.findCourseById(12)
      .subscribe((course) => {
        expect(course.id).toEqual(12, 'id is different than 12');

        expect(course.titles.description).toBe('Angular Testing Course');
      });

    const req = httpTestingController.expectOne('/api/courses/12');
    expect(req.request.method).toEqual("GET");

    req.flush(COURSES[12]);
  });

  it('should save course data', () => {
    const changes: Partial<Course> = { titles: { description: 'Testing Course' } };

    coursesService.saveCourse(12, changes)
      .subscribe((course) => {

        expect(course.titles.description).toBe('Testing Course');
        expect(course.id).toBe(12);
      });

    const req = httpTestingController.expectOne('/api/courses/12');
    expect(req.request.method).toEqual("PUT");
    expect(req.request.body.titles.description).toEqual(changes.titles.description);

    req.flush({
      ...COURSES[12],
      ...changes
    })
  });

  it('should give an error if save course fails', () => {
    const changes: Partial<Course> = { titles: { description: 'Testing Course' } };

    coursesService.saveCourse(12, changes)
      .subscribe(
        () => fail('the save course operation should have failed'), // next operation on an observable.
        (error: HttpErrorResponse) => expect(error.status).toBe(500) // error callback on an observable.
      );

    const req = httpTestingController.expectOne('/api/courses/12');
    expect(req.request.method).toEqual("PUT");

    req.flush('Save course failed', { status: 500, statusText: 'Internal Server Error' }); // we want to mock an error message coming from the http response for the service save method.
  });

  it('should find a list of lessons', () => {
    coursesService.findLessons(12)
      .subscribe((lessons) => {

        expect(lessons).toBeTruthy();
        expect(lessons.length).toBe(3);
      });

    // const req = httpTestingController.expectOne('/api/lessons'); //! This won't work since this request is sent with search query params, which will fail the url match (/api/lessons?CourseId=12&filer=""&PageSize=3;)...
    const req = httpTestingController.expectOne(req => req.url === '/api/lessons'); // We would use a callback function that compares the given url to what we expect it to be, without the part of the search query params.

    expect(req.request.method).toEqual("GET");
    expect(req.request.params.get("courseId")).toEqual("12"); // params are being passed as strings, so we expect the value to be a string and not a number.
    expect(req.request.params.get("filter")).toEqual("");
    expect(req.request.params.get("sortOrder")).toEqual("asc");
    expect(req.request.params.get("pageNumber")).toEqual("0");
    expect(req.request.params.get("pageSize")).toEqual("3");

    req.flush({
      payload: findLessonsForCourse(12).slice(0, 3)
    })
  });
});
