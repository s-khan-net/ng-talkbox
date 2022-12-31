import { LightColorPipe } from './light-color.pipe';

describe('LightColorPipe', () => {
  it('create an instance', () => {
    const pipe = new LightColorPipe();
    expect(pipe).toBeTruthy();
    const val = pipe.transform('#fff',[]);
    expect(val).toBe('#f5f5f5');
    const val1 = pipe.transform('#000',[]);
  });
});
