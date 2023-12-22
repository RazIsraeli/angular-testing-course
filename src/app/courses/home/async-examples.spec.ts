import { fakeAsync, flush, flushMicrotasks, tick } from '@angular/core/testing';

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

  it('Asynchronous test example - plain Promise', fakeAsync(() => {
    let test = false;

    console.log('Creating Promise');

    Promise.resolve().then(() => {
      console.log('Promise first then() evaluated succesfully');
      return Promise.resolve();
    }).then(() => {
      console.log('Promise second then() evaluated succesfully');
      test = true;
    })

    console.log('Running test assertions');

    flushMicrotasks();
    expect(test).toBeTruthy();
  }));

  it('Asynchronous test example - Promises + setTimeout', fakeAsync(() => {
    let counter = 0;

    Promise.resolve()
      .then(() => {
        counter += 10;

        setTimeout(() => {
          counter += 1;
        }, 1000);
      });

    expect(counter).toBe(0);
    flushMicrotasks(); // Only empty the MicroTasks queue, meaning, only the Promise is executed, but not the timeOut.
    expect(counter).toBe(10);
    tick(1000); // Passes the time so we can be sure the timeOut is also executed.
    expect(counter).toBe(11);

  }));

});
