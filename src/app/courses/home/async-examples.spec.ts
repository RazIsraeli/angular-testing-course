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

  it('Asynchronous test example - plain Promise', fakeAsync(() => { // Adding fakeAsync to wrap our specification.
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

    flushMicrotasks(); // Flushes only the microTasks (timeouts will not be flushed) so we can be sure the async processses are completed.
    expect(test).toBeTruthy();
  }));

});
