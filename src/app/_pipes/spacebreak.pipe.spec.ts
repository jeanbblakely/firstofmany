import { SpacebreakPipe } from './spacebreak.pipe';

describe('SpacebreakPipe', () => {
  it('create an instance', () => {
    const pipe = new SpacebreakPipe();
    expect(pipe).toBeTruthy();
  });

  it('should separate a string into line breaks at each space', () => {
    const pipe = new SpacebreakPipe();
    expect(pipe.transform('this is the song that never ends')).toEqual('this\nis\nthe\nsong\nthat\nnever\nends');
  });

  it('should replace multiple spaces with a single line break', () => {
    const pipe = new SpacebreakPipe();
    expect(pipe.transform('hello   world')).toEqual('hello\nworld');
  });

  it('should remove whitespace around the word before adding line breaks', () => {
    const pipe = new SpacebreakPipe();
    expect(pipe.transform('    hi     ')).toEqual('hi');
  });

  it('should split long words at the optional parameter maxChars', () => {
    const pipe = new SpacebreakPipe();
    expect(pipe.transform('thisis22characterslong', 10)).toEqual('thisis22ch\naracterslo\nng');
  });
});
