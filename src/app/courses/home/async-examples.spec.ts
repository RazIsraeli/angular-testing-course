import { fakeAsync, flush, tick } from '@angular/core/testing';

fdescribe('async testing examples', () => {

  it('async test example with jasmine done()', (done: DoneFn) => {
    let test = false;
    setTimeout(() => {
      console.log('running assertions');

      test = true;

      expect(test).toBeTruthy();
      done();
    }, 1000);
  });

  it('async test example with setTimeout', fakeAsync(() => {
    let test = false;

    setTimeout(() => { });

    setTimeout(() => {
      console.log('running assertions setTimeout');

      test = true;
    }, 1000);

    flush();
    expect(test).toBeTruthy();
  }));

  fit('Asynchronous test example - plain Promise', () => {
    let test = false;

    console.log('Creating Promise');

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

});
