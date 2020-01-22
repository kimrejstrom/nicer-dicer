import presets, {
  addPreset,
  removePreset,
  presetsInitialState,
} from './presetsSlice';
import { AnyAction } from '@reduxjs/toolkit';

describe('presets reducer', () => {
  it('should handle initial state', () => {
    expect(presets(undefined, {} as AnyAction)).toEqual(presetsInitialState);
  });

  it('should handle ADD_PRESET', () => {
    expect(
      presets(
        { presets: [] },
        {
          type: addPreset.type,
          payload: {
            diceType: 'd20',
            formula: `1d20`,
            title: 'One d20',
          },
        },
      ),
    ).toEqual({
      presets: [
        {
          diceType: 'd20',
          formula: `1d20`,
          title: 'One d20',
        },
      ],
    });

    expect(
      presets(
        {
          presets: [
            {
              diceType: 'd20',
              formula: `1d20`,
              title: 'One d20',
            },
          ],
        },
        {
          type: addPreset.type,
          payload: {
            diceType: 'd10',
            formula: `1d10`,
            title: 'One d10',
          },
        },
      ),
    ).toEqual({
      presets: [
        {
          diceType: 'd20',
          formula: `1d20`,
          title: 'One d20',
        },
        {
          diceType: 'd10',
          formula: `1d10`,
          title: 'One d10',
        },
      ],
    });
  });

  it('should handle REMOVE_PRESET', () => {
    expect(
      presets(
        {
          presets: [
            {
              diceType: 'd20',
              formula: `1d20`,
              title: 'One d20',
            },
            {
              diceType: 'd10',
              formula: `1d10`,
              title: 'One d10',
            },
          ],
        },
        {
          type: removePreset.type,
          payload: 1,
        },
      ),
    ).toEqual({
      presets: [
        {
          diceType: 'd20',
          formula: `1d20`,
          title: 'One d20',
        },
      ],
    });
  });
});
