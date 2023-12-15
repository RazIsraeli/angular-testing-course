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
        CoursesModule,
      ]
    });
  });


  it('should create the component', () => {

  });

});
