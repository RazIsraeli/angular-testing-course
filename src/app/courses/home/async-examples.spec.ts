fdescribe('async testing examples', () => {

  it('async test example with jasmine done()', (done: DoneFn) => { // using jasmine done() utility to mark an async test end.
    let test = false;
    setTimeout(() => {
      console.log('running assertions');

      test = true;

      expect(test).toBeTruthy();
      done(); // This is one option to test async services or components.
    }, 1000);
  });

});
