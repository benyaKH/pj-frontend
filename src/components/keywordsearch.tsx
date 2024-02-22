import '@mantine/core/styles.css';
import {  Button, TagsInput } from '@mantine/core';

import { useState } from 'react';

export default function KeywordSearch() {

    

    const [value, setValue] = useState<string[]>([]);

    const onSubmit = () => {
        window.location.href = `/Episode/Search/${value}`
    }

    return (
        
            <TagsInput
            placeholder="Pick tag from list"
            maxDropdownHeight={200}
            
            value={value} 
            onChange={setValue}
        />
        
    );
}
