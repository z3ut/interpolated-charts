import { colorProvider } from '../../src/utils/color-provider';

describe('color provider', () => {

  it('should provide color', () => {
    const colors = colorProvider();
    const color = colors.next();
    expect(color).toBeTruthy();
    expect(color.value).toBeTruthy();
  });

  it('should allow custom config scheme', () => {
    const colorScheme = ['white', 'red'];
    const colors = colorProvider(colorScheme);

    const colorFirst = colors.next();
    const colorSecond = colors.next();

    expect(colorFirst).toBeTruthy();
    expect(colorFirst.value).toBe(colorScheme[0]);

    expect(colorSecond).toBeTruthy();
    expect(colorSecond.value).toBe(colorScheme[1]);
  });

  it('should overlap iteration on array', () => {
    const colorScheme = ['white', 'red', 'blue'];
    const colors = colorProvider(colorScheme);

    const colorFirst = colors.next();
    const colorSecond = colors.next();
    const colorThird = colors.next();
    const colorFourth = colors.next();

    expect(colorFirst).toBeTruthy();
    expect(colorFirst.value).toBe(colorScheme[0]);

    expect(colorSecond).toBeTruthy();
    expect(colorSecond.value).toBe(colorScheme[1]);

    expect(colorThird).toBeTruthy();
    expect(colorThird.value).toBe(colorScheme[2]);

    expect(colorFourth).toBeTruthy();
    expect(colorFourth.value).toBe(colorScheme[0]);
    expect(colorFirst.done).toBeFalsy();
  });

});
