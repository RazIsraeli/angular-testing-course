import { async, ComponentFixture, fakeAsync, flush, flushMicrotasks, TestBed, waitForAsync } from '@angular/core/testing';
import { CoursesModule } from '../courses.module';
import { DebugElement } from '@angular/core';

import { HomeComponent } from './home.component';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { CoursesService } from '../services/courses.service';
import { HttpClient } from '@angular/common/http';
import { COURSES } from '../../../../server/db-data';
import { setupCourses } from '../common/setup-test-data';
import { By } from '@angular/platform-browser';
import { of } from 'rxjs';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { click } from '../common/test-utils';




describe('HomeComponent', () => {

  let fixture: ComponentFixture<HomeComponent>;
  let component: HomeComponent;
  let el: DebugElement;
  let coursesService: any;

  const beginnerCourses = setupCourses().filter(course => course.category === 'BEGINNER'); // mock data with all the courses with the "beginner" category.


  beforeEach(waitForAsync(() => { // waitForAsync assures that each specification function runs  ONLY AFTER the beforeEach block has ended or timedout.

    const coursesServiceSpy = jasmine.createSpyObj('CoursesService', ['findAllCourses']); // replacing the service that is injected to the component with a jasmine spy.

    TestBed.configureTestingModule({
      imports: [
        CoursesModule, // containing all the components that our HomeComponent needs.
        NoopAnimationsModule // no operation animation module - in our tests, we don't really need to use animations, and the animated components will still work.
      ],
      providers: [ // for services that are injected to the component we want to test.
        { provide: CoursesService, useValue: coursesServiceSpy } // we are using a custom provider, our spy from above, to replace CoursesService.
      ]
    }).compileComponents()
      .then(() => {
        fixture = TestBed.createComponent(HomeComponent);
        component = fixture.componentInstance;
        el = fixture.debugElement;
        coursesService = TestBed.inject(CoursesService); // using TestBed.inject to create a mock instance of the CourseService using our jasmine spy coursesServiceSpy.
      })

  }));

  it("should create the component", () => {
    expect(component).toBeTruthy();
  });


  it('should display only beginner courses', () => {
    coursesService.findAllCourses.and.returnValue(of(beginnerCourses)); // we are using a jasmine spy so after calling a function of the service, we can use "and.returnValue()" to return mock data.

    fixture.detectChanges();

    const tabs = el.queryAll(By.css(".mdc-tab"));

    expect(tabs.length).toBe(1, "Unexpected number of tabs found");
  });


  it("should display only advanced courses", () => {

    pending();

  });


  it("should display both tabs", () => {

    pending();

  });


  it("should display advanced courses when tab clicked", () => {

    pending();

  });

});


