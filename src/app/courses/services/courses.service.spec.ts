import { TestBed } from '@angular/core/testing';
import { CoursesService } from './courses.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { COURSES } from '../../../../server/db-data';
import { partial } from 'cypress/types/lodash';
import { Course } from '../model/course';

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
    const changes: Partial<Course> = { titles: { description: 'Testing Course' } }; // The part of the course object that we want to changes (only the description of an existing course)

    coursesService.saveCourse(12, changes) //passing the changes to be made to course with ID 12.
      .subscribe((course) => {

        expect(course.titles.description).toBe('Testing Course');
        expect(course.id).toBe(12);
      });

    const req = httpTestingController.expectOne('/api/courses/12'); // validate that the http request was sent to the correct path.
    expect(req.request.method).toEqual("PUT");
    expect(req.request.body.titles.description).toEqual(changes.titles.description);

    //! The object that we want to send as a mock response when the http request is sent to the relevant path.
    req.flush({
      ...COURSES[12],
      ...changes
    })
  });
});
