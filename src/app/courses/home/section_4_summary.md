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

### fakeAsync - our code runs inside Angular Zone, which keeps track and handles all async proceses.
* fakeAsync allows us to control the passage of time throughout the test.
  We wrap our specification with fakeAsync, and inside the specification we can use tick() to control the progress of time.
  In this example, the code inside the setTimeout runs 1s after the specification starts, and using tick(1000) we control time and make it progress 1000ms ahead.
  At this point in time, the assertion can be done, since the code inside the setTimeout was executed:
it('async test example with setTimeout', fakeAsync(() =>{
  let test = false;
  setTimeout(() => {
      console.log('running assertions setTimeout');
      test = true;
  }, 1000);
  tick(1000);
  expect(test).toBeTruthy();
}));

* Another option with fakeAsync is to use flush() to allow all the processes to end before doing the assertions:
it('async test example with setTimeout', fakeAsync(() => {
 let test = false;
setTimeout(() => { });

    setTimeout(() => {
      console.log('running assertions setTimeout');

      test = true;
    }, 1000);
 flush(); -> makes sure all the async processes are completed.
expect(test).toBeTruthy();
}));

## Promises based async code (MicroTasks and MacroTasks (or tasks))
* Order of execution by js runtime when compared to other async operations (such as setTimeout):

Promises have some kind of priority over an operation such as setTimeout.

That's because Promises are considered MicroTasks, while setTimeout for example is a MacroTask.

In js runtime, MicroTasks take precedence over MacroTasks.
 it('Asynchronous test example - plain Promise', () => {
    let test = false;

    console.log('Creating Promise - executed first');

    //! MicroTasks get precedence over MacroTasks (tasks) by the js runtime engine, and they will be executed first.
    setTimeout(() => { // Added to the Task queue (MacroTasks queue)
      console.log('setTimeout() first callback triggered');
    });

    setTimeout(() => { // Added to the Task queue (MacroTasks queue)
      console.log('setTimeout() second callback triggered');
    });

    Promise.resolve().then(() => { // Added to the MicroTasks queue
      console.log('Promise first then() evaluated succesfully');
      return Promise.resolve();
    }).then(() => { // Added to the MicroTasks queue
      console.log('Promise second then() evaluated succesfully');
      test = true;
    })

    console.log('Running test assertions');

    expect(test).toBeTruthy();
  });


Console Output:

Creating Promise
Running test assertions
Promise first then() evaluated succesfully
Promise second then() evaluated succesfully
setTimeout() first callback triggered
setTimeout() second callback triggered
