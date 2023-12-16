import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
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
  let el: DebugElement;

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
    component.courses = setupCourses(); //! After any change is done to the component's data, and we expect the DOM to display the new data - WE MUST ASK FOR CHANGE DETECTION!
    fixture.detectChanges();

    const cards = el.queryAll(By.css('.course-card'));

    expect(cards).toBeTruthy('No cards were found');
    expect(cards.length).toBe(12, 'Unexpected number of courses.');
  });

});
