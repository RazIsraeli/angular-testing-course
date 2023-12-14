import { TestBed } from '@angular/core/testing';
import { CoursesService } from './courses.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

describe('CoursesService', () => {

  let coursesService: CoursesService;
  let httpTestingController: HttpTestingController; //needed to work with the mock of httpClient.

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule, //using an angular service that mocks httpClient service.
      ],
      providers: [
        CoursesService, // The actual service we want to test.
      ]
    })

    coursesService = TestBed.inject(CoursesService);
    httpTestingController = TestBed.inject(HttpTestingController); // needed to work with the mock of httpClient.
  });

  it('should retrieve all courses', () => {
    pending();
  });
});
