import '@mantine/core/styles.css';

import { IconSearch } from '@tabler/icons-react';


import {  AppShell,  Group, TextInput, rem,  Card, Image, Text, Stack } from '@mantine/core';
import { useState } from 'react';

export default function MainPage() {

    const [value, setValue] = useState('');

    const Searchicon = <IconSearch style={{ width: rem(16), height: rem(16) }} />;

    const handleKeyDown = (event: { key: string; }) => {
        if (event.key === 'Enter') {
            window.location.href = `/Search/${value}`
        }
      }

    return (
        <AppShell.Main>
            <Stack
                h={300}
                bg="var(--mantine-color-body)"
                gap="xl"
                px={rem(100)}
                py={rem(50)}
            >
                <TextInput
                    radius="xl"
                    mt="md"
                    rightSectionPointerEvents="none"
                    rightSection={Searchicon}
                    placeholder="Search..."
                    onKeyDown={handleKeyDown}
                    onChange={(event) => setValue(event.currentTarget.value)}
                    
                />
                <Group justify="space-between" grow>
                    <Card
                        shadow="sm"
                        padding="xl"
                        component="a"
                        href="https://www.youtube.com/watch?v=dQw4w9WgXcQ"
                        target="_blank"
                        bg="#521125"
                    >
                        <Card.Section>
                            <Image
                                src="https://images.unsplash.com/photo-1579227114347-15d08fc37cae?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2550&q=80"
                                h={160}
                                alt="No way!"
                            />
                        </Card.Section>

                        <Text fw={500} size="lg" mt="md" color='white'>
                            You&apos;ve won a million dollars in cash!
                        </Text>

                        <Text mt="xs" size="sm" color='white'>
                            Please click anywhere on this card to claim your reward, this is not a fraud, trust us
                        </Text>
                    </Card>
                    <Card
                        shadow="sm"
                        padding="xl"
                        component="a"
                        href="https://www.youtube.com/watch?v=dQw4w9WgXcQ"
                        target="_blank"
                        bg="#521125"
                    >
                        <Card.Section>
                            <Image
                                src="https://images.unsplash.com/photo-1579227114347-15d08fc37cae?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2550&q=80"
                                h={160}
                                alt="No way!"
                            />
                        </Card.Section>

                        <Text fw={500} size="lg" mt="md" color='white'>
                            You&apos;ve won a million dollars in cash!
                        </Text>

                        <Text mt="xs" size="sm" color='white'>
                            Please click anywhere on this card to claim your reward, this is not a fraud, trust us
                        </Text>
                    </Card>
                    <Card
                        shadow="sm"
                        padding="xl"
                        component="a"
                        href="https://www.youtube.com/watch?v=dQw4w9WgXcQ"
                        target="_blank"
                        bg="#521125"
                    >
                        <Card.Section>
                            <Image
                                src="https://images.unsplash.com/photo-1579227114347-15d08fc37cae?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2550&q=80"
                                h={160}
                                alt="No way!"
                            />
                        </Card.Section>

                        <Text fw={500} size="lg" mt="md" color='white'>
                            You&apos;ve won a million dollars in cash!
                        </Text>

                        <Text mt="xs" size="sm" color='white'>
                            Please click anywhere on this card to claim your reward, this is not a fraud, trust us
                        </Text>
                    </Card>
                </Group>
            </Stack>
        </AppShell.Main>
    );

}