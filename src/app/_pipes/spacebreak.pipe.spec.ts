import { SpacebreakPipe } from './spacebreak.pipe';

describe('SpacebreakPipe', () => {
  it('create an instance', () => {
    const pipe = new SpacebreakPipe();
    expect(pipe).toBeTruthy();
  });

  it('separate a string into line breaks at each space', () => {
    const pipe = new SpacebreakPipe();
    expect(pipe.transform('this is the song that never ends')).toEqual('this\nis\nthe\nsong\nthat\nnever\nends');
  });

  it('replace multiple spaces with a single line break', () => {
    const pipe = new SpacebreakPipe();
    expect(pipe.transform('hello   world')).toEqual('hello\nworld');
  });

  it('remove whitespace around the word before adding line breaks', () => {
    const pipe = new SpacebreakPipe();
    expect(pipe.transform('    hi     ')).toEqual('hi');
  });
});
