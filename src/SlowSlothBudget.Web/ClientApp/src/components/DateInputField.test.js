import React from 'react';
import DateInputField from "./DateInputField";

it('replaces \',\' characters with \'.\'', () => {
    const commas = ',,,';
    const dots = '...';
    const event = {
        target: {value: commas}
    };

    DateInputField.handleChangeRaw(event);

    expect(event.target.value).toBe(dots);
});
