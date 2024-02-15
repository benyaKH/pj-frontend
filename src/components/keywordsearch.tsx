import '@mantine/core/styles.css';
import {  TagsInput } from '@mantine/core';

import { useState } from 'react';

export default function KeywordSearch() {

    const groceries = ['🍎 Apples', '🍌 Bananas', '🥦 Broccoli', '🥕 Carrots', '🍫 Chocolate','Oreo','fff','deeun'];

    return (
        <TagsInput
            label="Press Enter to submit a tag"
            placeholder="Pick tag from list"

            maxDropdownHeight={200}
            data={groceries}
        />
    );
}
