import { async, ComponentFixture, TestBed } from '@angular/core/testing';
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

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        CoursesModule // This is going to bring the courseCardList component together with all the needed angular materials that this module needs to display the data.
      ]
    });
  });


  it('should create the component', () => {

  });

});



describe('CoursesCardListComponent', () => {


  it("should create the component", () => {

    pending();

  });


  it("should display the course list", () => {

    pending();

  });


  it("should display the first course", () => {

    pending();

  });


});


