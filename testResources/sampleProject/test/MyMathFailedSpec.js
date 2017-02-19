const test = require('tape-catch');
const MyMath = require('../src/MyMath');

let myMath;

function beforeEach() {
  try {
    myMath = new MyMath();
  } catch (err) {
    console.log(err);
  }
}

test('2 + 2 should equal 5', function (t) {
  beforeEach();
  var num1 = 2;
  var num2 = 2;
  var expected = 5;

  var actual = myMath.add(num1, num2);

  t.equal(actual, expected);
  t.end();
});
