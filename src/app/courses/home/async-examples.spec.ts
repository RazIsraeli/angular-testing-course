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

  it('async test example with setTimeout', fakeAsync(() => {// fakeAsync wraps our specification with Angular Zone.js which handled all async processes.
    let test = false;

    setTimeout(() => { });

    setTimeout(() => {
      console.log('running assertions setTimeout');

      test = true;
    }, 1000);

    tick(1000); // Inside fakeAsync blocks we can control the passage of time using tick() utility by angular.
    // When taking this approach we must tick enough time forward that our timeout would end - otherwise the test would fail..
    // tick(500) -> in this case the test would fail since the timeOut is set for 1000 ms, and we tickonly 500ms.
    expect(test).toBeTruthy(); // We can do the assertion outside the setTimeout since we are controlling the passage of time and it will be tested only after the timeout is done.

    flush(); // In case we don't want to specify the time to wait, we can use flush, which will wait for all microtasks to end.
    expect(test).toBeTruthy();
    //! THERE IS NO NEED TO USE BOTH TICK() AND FLUSH()!!!

  }));

});
