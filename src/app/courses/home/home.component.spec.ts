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

  const beginnerCourses = setupCourses().filter(course => course.category === 'BEGINNER');
  const advancedCourses = setupCourses().filter(course => course.category === 'ADVANCED');


  beforeEach(waitForAsync(() => {

    const coursesServiceSpy = jasmine.createSpyObj('CoursesService', ['findAllCourses']);

    TestBed.configureTestingModule({
      imports: [
        CoursesModule,
        NoopAnimationsModule
      ],
      providers: [
        { provide: CoursesService, useValue: coursesServiceSpy }
      ]
    }).compileComponents()
      .then(() => {
        fixture = TestBed.createComponent(HomeComponent);
        component = fixture.componentInstance;
        el = fixture.debugElement;
        coursesService = TestBed.inject(CoursesService);
      })

  }));

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });


  it('should display only beginner courses', () => {
    coursesService.findAllCourses.and.returnValue(of(beginnerCourses));
    fixture.detectChanges();
    const tabs = el.queryAll(By.css('.mdc-tab'));
    const title = tabs[0].nativeElement.textContent;


    expect(tabs.length).toBe(1, 'Unexpected number of tabs found');
    expect(title).toBe('Beginners', 'Could not read title "Beginners"');
  });


  it('should display only advanced courses', () => {
    coursesService.findAllCourses.and.returnValue(of(advancedCourses));
    fixture.detectChanges();
    const tabs = el.queryAll(By.css('.mdc-tab'));
    const title = tabs[0].nativeElement.textContent;

    expect(tabs.length).toBe(1, 'Unexpected number of tabs');
    expect(title).toBe('Advanced', 'Could not read title "Advanced"');
  });


  it('should display both tabs', () => {
    // const courses = beginnerCourses.concat(advancedCourses); //the below solution looks better:
    const courses = setupCourses();
    coursesService.findAllCourses.and.returnValue(of(courses));
    fixture.detectChanges();

    const tabs = el.queryAll(By.css('.mdc-tab'));
    const beginnersTab = tabs.find(tab => tab.nativeElement.textContent === 'Beginners');
    const advancedTab = tabs.find(tab => tab.nativeElement.textContent === 'Advanced');

    expect(tabs.length).toBe(2,'Unexpected number of tabs found')
    expect(beginnersTab.nativeElement.textContent).toBe('Beginners', 'Could not find beginners tab');
    expect(advancedTab.nativeElement.textContent).toBe('Advanced', 'Could not find advanced tab');
  });


  it("should display advanced courses when tab clicked", () => {

    pending();

  });

});


