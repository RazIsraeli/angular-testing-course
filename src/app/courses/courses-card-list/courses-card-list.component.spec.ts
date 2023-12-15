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
  let fixture: ComponentFixture<CoursesCardListComponent>; // needed in order to create an instance of a component.


  beforeEach(waitForAsync(() => { // WaitForAsync is angular's test utility function that receives another function. It know that there are async processes in the provided function, and it waits for them to end before moving on to the next specification.
    TestBed.configureTestingModule({
      imports: [
        CoursesModule,
      ]
    })
      .compileComponents()
      .then(() => { // In this block we will setup the test, meaning, we will populate the global variables that were declared inside the "describe" block.
        fixture = TestBed.createComponent(CoursesCardListComponent); //
        component = fixture.componentInstance; // Creating an instance of the component we want to test.
      });
  }));


  it('should create the component', () => {
    console.log("🚀 ~ file: courses-card-list.component.spec.ts:35 ~ it ~ component:", component)
    expect(component).toBeTruthy('No component was created');
  });

});
