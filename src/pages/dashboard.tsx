import '@mantine/core/styles.css';
import { useState, useEffect } from 'react';
import { IconCirclePlus } from '@tabler/icons-react';

import { useDisclosure } from '@mantine/hooks';
import { AppShell, Text, Stack, rem, Divider, Modal, Center, UnstyledButton, SimpleGrid, TextInput, Group, Button, NativeSelect } from '@mantine/core';
import StoryCardAdmin from '../components/StoryCardAdmin';

export default function DashboardPage() {

    const [stories, setStories] = useState([])
    const [ep, setEp] = useState([])
    const [storyname, setStoryname] = useState('')
    const [category, setCategory] = useState('Anime')

    const urlUserStory = "http://localhost:3000/stories/owner/658114029695bd4e23773d3b"
    const urlNewStory = "http://localhost:3000/stories"
    const epL = ep?.length || 0;



    useEffect(() => {
        const fetchData = async () => {

            await fetch(urlUserStory, {
                method: "GET"
            })
                .then(response => response.json())
                .then(result => setStories(result))
                .catch(e => console.log(e))
        }
        fetchData()
    }, [])

    const onSubmit = () => {
        const payload = {
            storyname,
            category,
            ownerId: '658114029695bd4e23773d3b'

        }
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        };
        fetch(urlNewStory, requestOptions)
            .then(response => response.json())
            .then(data => console.log(data));
    }


    const items = stories.map((item) => (
        
        <StoryCardAdmin stid={item['_id']}title={item['storyname']} category={item['category']} description={item['description']} Ep={item['episodeId']}></StoryCardAdmin>

    ));


    const Newicon = <IconCirclePlus style={{ width: rem(64), height: rem(64) }} />;
    const [opened, { open, close }] = useDisclosure(false);



    return (
        <AppShell.Main>
            <Stack
                h={300}
                bg="var(--mantine-color-body)"
                px={rem(100)}
            >
                <Text fw={500} py={rem(30)} size={rem(40)}  color='black' >
                    DASHBOARD
                </Text>
                <Text fw={200} size="md"  color='black' py={rem(0)}>
                    you have {stories.length} boards
                </Text>
                <Divider my="md" />
                <SimpleGrid cols={4}>
                    {items}
                    <Modal opened={opened} onClose={close} title="Create new board" centered>
                        <form onSubmit={onSubmit}>
                            <TextInput
                                withAsterisk
                                label="Board title"
                                placeholder="your board title"
                                onChange={e => setStoryname(e.target.value)}
                            />
                            <NativeSelect
                                label="Category"
                                data={['Anime', 'TV Series', 'Online Program', 'Podcast']}
                                onChange={e => setCategory(e.target.value)}
                            />

                            <Group justify="flex-end" mt="md">
                                <Button type="submit" onClick={close} color="#2CB5B5">Submit</Button>
                                <Button type="reset" variant="outline" onClick={()=>setStoryname('')} color="#FF6666">Cancle</Button>
                            </Group>
                        </form>
                    </Modal>
                    <UnstyledButton
                        onClick={open}
                    >
                        <Center>
                            {Newicon}
                        </Center>

                    </UnstyledButton>

                </SimpleGrid>


            </Stack>
        </AppShell.Main >);

}