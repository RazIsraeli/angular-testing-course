import { async, ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { CoursesCardListComponent } from './courses-card-list.component';
import { CoursesModule } from '../courses.module';
import { COURSES } from '../../../../server/db-data';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { sortCoursesBySeqNo } from '../home/sort-course-by-seq';
import { Course } from '../model/course';
import { setupCourses } from '../common/setup-test-data';
import { AppComponent } from '../../app.component';

describe('CoursesCardListComponent', () => {

  let component: CoursesCardListComponent;
  let fixture: ComponentFixture<CoursesCardListComponent>;
  let el: DebugElement; // Needed to query the DOM.

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
        el = fixture.debugElement;
      });
  }));


  it('should create the component', () => {
    expect(component).toBeTruthy('No component was created');
  });

  it('should display the course list', () => {
    component.courses = setupCourses(); // a utility function that returns mock data that was prepared in advance.
    // What we do here is to populate the variable "courses" that exists in the component.ts file with mock data, so we can test the component on the DOM.

    const cards = el.queryAll(By.css('.course-card')); //querying the DOM for all the elements with the class "course-card".

    expect(cards).toBeTruthy('No cards were found');
    expect(cards.length).toBe(12, 'Unexpected number of courses.'); //! This test fails as of the moment of commiting it. In the next commit it will be fixed together with the ability to debug a test.
  });

});
