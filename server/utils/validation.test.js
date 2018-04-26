const expect = require('expect');
const {isRealString} = require('./validation');

describe('isRealString',()=>{
  it('should reject non-string values',()=>{
    const val = isRealString(true);
    expect(val).toBe(false);
  });

  it('should reject string with only spaces',()=>{
    const val = isRealString('    ');
    expect(val).toBe(false);
  });

  it('should allow string with non-space characters',()=>{
    const val = isRealString('Thomas');
    expect(val).toBe(true);
  })
});
