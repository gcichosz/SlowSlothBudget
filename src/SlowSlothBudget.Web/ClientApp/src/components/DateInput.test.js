import React from 'react';
import DateInput from "./DateInput";

it('replaces \',\' characters with \'.\'', () => {
    const commas = ',,,';
    const dots = '...';
    const event = {
        target: {value: commas}
    };

    DateInput.handleChangeRaw(event);

    expect(event.target.value).toBe(dots);
});
