import '@mantine/core/styles.css';
import { useState, useEffect } from 'react';
import { IconCirclePlus } from '@tabler/icons-react';

import { useDisclosure } from '@mantine/hooks';
import { AppShell, Text, Stack, rem, Divider, Modal, Center, UnstyledButton, SimpleGrid, TextInput, Group, Button, NativeSelect, Loader, LoadingOverlay } from '@mantine/core';
import StoryCardAdmin from '../components/StoryCardAdmin';

export default function DashboardPage() {

    const [state, setState] = useState('')
    const [loading, setLoading] = useState(false)
    const [stories, setStories] = useState([])
    const [name, setName] = useState(() => {
        return localStorage.getItem('username')
    })
    const [storyname, setStoryname] = useState('')
    const [category, setCategory] = useState('Anime')
    const [RqEp, setRqEp] = useState([])

    const [opened, handlers] = useDisclosure(false);

    const mainurl = 'https://pj-backend.up.railway.app'
    const urlUserStory = `${mainurl}/stories/owner/${name}`
    const urlNewStory = `${mainurl}/stories`
    const urltagRequest = `${mainurl}/rqtags/board`



    useEffect(() => {
        setLoading(true)
        const fetchData = async () => {

            await fetch(urlUserStory, {
                method: "GET"
            })
                .then(response => response.json())
                .then(result => {setStories(result); setLoading(false); })
                .catch(e => console.log(e))
        }
        fetchData()
    }, [])

    useEffect(() => {
        const fetchData = async () => {

            await fetch(urltagRequest, {
                method: "GET"
            })
                .then(response => response.json())
                .then(result => setRqEp(result))
                .catch(e => console.log(e))
        }
        fetchData()
    }, [])

    const onSubmit = () => {
        setLoading(true)
        const payload = {
            storyname,
            category,
            ownerId: name

        }
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        };
        fetch(urlNewStory, requestOptions)
            .then(response => response.json())
            .then(data => { console.log(data);  setLoading(false); handlers.close();}).then(() => window.location.reload())
            .catch(e => console.log(e))
    }


    const items = stories.map((item) => (

        <StoryCardAdmin stid={item['_id']} title={item['storyname']}
            category={item['category']} description={item['description']}
            Ep={item['episodeId']} image={item['image']}
            rq={RqEp.find((element) => element == item['_id']) != undefined}></StoryCardAdmin>

    ));


    const Newicon = <IconCirclePlus style={{ width: rem(64), height: rem(64) }} />;



    return (
        <AppShell.Main>
            {loading&&state=='' ? <Loader color="blue" size="xl" /> :
                <Stack
                    h={300}
                    bg="var(--mantine-color-body)"
                    px={rem(100)}
                >
                    <Text fw={500} py={rem(30)} size={rem(40)} color='black' >
                        DASHBOARD
                    </Text>
                    <Text fw={200} size="md" color='black' py={rem(0)}>
                        you have {stories.length} boards
                    </Text>
                    <Divider my="md" />
                    <SimpleGrid cols={4}>
                        {items}
                        <Modal opened={opened} onClose={() => { handlers.close() }} title="Create new board" centered>
                            <LoadingOverlay visible={loading} loaderProps={{ children: 'Loading...' }} />
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
                                    <Button type="submit" color="#2CB5B5">Submit</Button>
                                    <Button type="reset" variant="outline" onClick={() => setStoryname('')} color="#FF6666">Cancle</Button>
                                </Group>
                            </form>
                        </Modal>
                        <UnstyledButton onClick={() => { handlers.open() }}>
                            <Center>
                                {Newicon}
                            </Center>
                        </UnstyledButton>

                    </SimpleGrid>


                </Stack>}
        </AppShell.Main >);

}