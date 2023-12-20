# Asynchronous Angular Testing
## Dom Async changes
 * There are actions on the DOM that will cause async processes to run on the browser, such as activating animation.
 Whenever this happens, we need to be able to control our test, and make sure we work on the DOM when it is in the state we want it to be (e.g, after the animation is done).

 Browser animations usually take 16ms.
 
## Example of async animation caused by user's click:

* This test will fail, since we will not be able to find the correct element on the DOM:
it('should display advanced courses when tab clicked', () => {
    coursesService.findAllCourses.and.returnValue(of(setupCourses()));
    fixture.detectChanges();

    const tabs = el.queryAll(By.css('.mdc-tab'));

    click(tabs[1]);
    fixture.detectChanges();

    const cardTitles = el.queryAll(By.css('.mat-mdc-tab-body-active .mat-mdc-card-title'));
    expect(cardTitles.length).toBeGreaterThan(0, 'Could not find card titles');
    expect(cardTitles[0].nativeElement.textContent).toEqual('Angular Security Course - Web Security Fundamentals');
  });

### Very bad example, seems like it works but the test will run without assertions!!
* This test will show as if it passed, but due to the setTimeout the assertions are done after the test is already completed. Meaning,
  the test runner will not find assertions in this sepcification and will consider is as "passed":
 it('should display advanced courses when tab clicked', () => {
    coursesService.findAllCourses.and.returnValue(of(setupCourses()));
    fixture.detectChanges();

    const tabs = el.queryAll(By.css('.mdc-tab'));

    click(tabs[1]);
    fixture.detectChanges();

    setTimeout(() => {
      const cardTitles = el.queryAll(By.css('.mat-mdc-tab-body-active .mat-mdc-card-title'));
      expect(cardTitles.length).toBeGreaterThan(0, 'Could not find card titles');
      expect(cardTitles[0].nativeElement.textContent).toEqual('Angular Security Course - Web Security Fundamentals');
    }, 500);
  });

### Jasmine done() function to declare async test end, however, using setTimeout is not the preffered way!:
 * This test will end successfully, since we are using jasmine "done()" utility to make sure the test ends only when we want it to end, meaning, after all the assertions are done.
  it('should display advanced courses when tab clicked', (done: DoneFn) => { // jasmine specific callback which is supposed to be called when the async test is complete.
    coursesService.findAllCourses.and.returnValue(of(setupCourses()));
    fixture.detectChanges();

    const tabs = el.queryAll(By.css('.mdc-tab'));

    click(tabs[1]);
    fixture.detectChanges();

    setTimeout(() => {
      const cardTitles = el.queryAll(By.css('.mat-mdc-tab-body-active .mat-mdc-card-title'));
      expect(cardTitles.length).toBeGreaterThan(0, 'Could not find card titles');
      expect(cardTitles[0].nativeElement.textContent).toEqual('Angular Security Course - Web Security Fundamentals');

      done(); // Letting jasmine know that the test is completed and all assertions have been executed.
    }, 500);
  });

### Importing all the relevant modules and components that the component is using.
