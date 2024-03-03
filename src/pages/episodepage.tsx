import '@mantine/core/styles.css';
import { useParams } from 'react-router-dom';
import { AppShell, Group, TextInput, rem, Image, Text, Stack, ActionIcon, Button, Modal, TagsInput, Badge, Checkbox, LoadingOverlay, Loader } from '@mantine/core';

import { IconEdit } from '@tabler/icons-react';
import { useEffect, useState } from 'react';
import { useDisclosure } from '@mantine/hooks';

export default function EpisodePage(
    props: {
        isAdmin: boolean
    }
) {

    const params = useParams()
    const mainurl = 'https://pj-backend.up.railway.app'

    const urlGetEpisodes = `${mainurl}/episodes/${params.id}`
    const urlEditEpisodes = `${mainurl}/episodes/${params.id}`
    const urlDelEpisodes = `${mainurl}/episodes/${params.id}`
    const urlGetRQtags = `${mainurl}/rqtags/${params.id}`
    const urlRq = `${mainurl}/rqtags`

    const [loading, setLoading] = useState(false)
    const [popupstate, setPopupState] = useState('Edit Episode')

    const [RqTags, setRqTags] = useState([])
    const [NewRq, setNewRq] = useState<string[]>([]);
    const [value, setValue] = useState<string[]>([]);

    const [storyid, setStoryid] = useState('')
    const [storyname, setStoryname] = useState('')
    const [number, setNumber] = useState('')
    const [episodetitle, setTitle] = useState('')
    const [description, setDes] = useState('')
    const [tags, setTags] = useState<string[]>([]);
    const [characters, setChars] = useState<string[]>([]);
    const [Links, setLink] = useState('')
    const [opened, handlers] = useDisclosure(false);


    useEffect(() => {

        setLoading(true)
        const fetchEpData = async () => {

            await fetch(urlGetEpisodes, {
                method: "GET"
            })
                .then(response => response.json())
                .then(result => {
                    setNumber(result.number); setTitle(result.episodetitle); setDes(result.description);
                    setTags(result.tags); setChars(result.characters); setLink(result.Links);
                    setStoryname(result.StoryId.storyname); setStoryid(result.StoryId._id);

                })
                .catch(e => console.log(e))
        }
        fetchEpData()

        const fetchData = async () => {

            await fetch(urlGetRQtags, {
                method: "GET"
            })
                .then(response => response.json())
                .then(result => {
                    setRqTags(result); setLoading(false);
                })
                .catch(e => console.log(e))
        }
        fetchData()


        if (localStorage.getItem('openSidebarOnLoad') === 'true') {
            handlers.open();
            setPopupState('Request Tags')

            localStorage.removeItem('openSidebarOnLoad');
        }
    }, [])


    const onSubmit = () => {
        setLoading(true)
        const payload = {
            number,
            episodetitle,
            description,
            tags,
            characters,
            Links
        }
        const requestOptions = {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        };
        fetch(urlEditEpisodes, requestOptions)
            .then(response => response.json())
            .then(data => { console.log(data); setLoading(false); })
            .catch(e => console.log(e));
    }

    const onDelete = async () => {
        setLoading(true)
        const requestOptions = {
            method: 'DELETE'
        };
        await fetch(urlDelEpisodes, requestOptions)
            .then(response => response.json())
            .then(data => { console.log(data); setLoading(false); window.location.replace(`/Dashboard/${storyid}`); });
    }

    const onSubmitRq = async () => {
        setLoading(true)
        await Promise.all(NewRq.map(async (element) => {
            const payload = {
                tag: element,
                episodeId: params.id,
                storyId: storyid

            }
            const requestOptions = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            };
            fetch(urlRq, requestOptions)
                .then(response => response.json())
                .then(data => console.log(data))
                .catch(e => console.log(e))
        })).then(() => setLoading(false))

    }

    const onConfirmRq = () => {
        setLoading(true)
        const Newtags = tags
        value.forEach((element) => {
            RqTags.forEach((tag) => {
                if (element == tag["_id"]) {
                    Newtags[tags.length] = tag['tag']
                }
            })
        })
        const payload = {
            tags: Newtags
        }
        const requestOptions = {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        };
        fetch(urlEditEpisodes, requestOptions)
            .then(response => response.json())
            .then(data => console.log(data));

        onDeleteRq()

    }
    const onDeleteRq = () => {
        setLoading(true)
        value.forEach((element) => {
            const urlDelRQtags = `${mainurl}/rqtags/${element}`
            const requestOptions = {
                method: 'DELETE'
            };
            fetch(urlDelRQtags, requestOptions)
                .then(response => response.json())
                .then(data => { console.log(data); setLoading(false) })
                .then(() => {
                    localStorage.setItem('openSidebarOnLoad', 'true');
                    window.location.reload()
                });

        })



    }

    const showtags = tags.map((tag) => (
        <Badge color="#48E1E1">{tag}</Badge>
    ));

    const showchars = characters.map((char) => (
        <Badge color="#48E1E1">{char}</Badge>
    ));

    const showRqtags = RqTags.map((tag) => (
        <Checkbox value={tag['_id']} label={tag['tag']} />
    ));

    return (
        <AppShell.Main>
            {loading ? <Loader color="blue" size="xl" /> :
                <Stack
                    bg="var(--mantine-color-body)"
                >
                    <Image
                        src="https://images.unsplash.com/photo-1579227114347-15d08fc37cae?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2550&q=80"
                        mah={300}
                        alt="No way!"
                    />
                    <Stack px={rem(100)}>
                        <Group>
                            <Text>Episode page</Text>
                            {props.isAdmin ?
                                <Button variant="light" color="indigo" size="xs" radius="xl"
                                    onClick={() => { handlers.open(); setPopupState('Request Tags'); }}
                                    rightSection={
                                        RqTags.length != 0 ?
                                            <Badge size="xs" color="red" circle>
                                                {RqTags.length}
                                            </Badge> : <></>
                                    }>
                                    Request Tag
                                </Button> : <></>}
                        </Group>
                        <Text size={rem(35)} fw={700}>{storyname}</Text>
                        <Group>
                            <Text size={rem(24)} fw={500}>Episode {number} : {episodetitle}</Text>
                            {props.isAdmin ?
                                <Group>
                                    <ActionIcon variant="subtle" color='black' aria-label="EditName0" onClick={() => { handlers.open(); setPopupState('Edit Episode'); }} >
                                        <IconEdit style={{ width: '130%', height: '130%' }} stroke={1.5} />
                                    </ActionIcon>
                                    <Button color="#FF6666" onClick={() => { handlers.open(); setPopupState('Delete Episode'); }}>Delete</Button>
                                </Group>
                                : <div></div>}
                        </Group>
                        <Text size={rem(14)}>{description}</Text>
                        <Stack>
                            <Group>
                                <Text size={rem(14)}>Tags</Text>
                                {props.isAdmin ? <></> :
                                    <Button radius="xl" variant="light" color="pink" size="xs"
                                        onClick={() => { handlers.open(); setPopupState('Request New Tags') }}>request new tags</Button>}
                            </Group>
                            <Group>
                                {showtags}
                            </Group>
                        </Stack>
                        <Stack>
                            <Text size={rem(14)}>Characters</Text>
                            <Group>
                                {showchars}
                            </Group>
                        </Stack>
                        <Button color="#521125"
                            onClick={(e) => {
                                e.preventDefault();
                                window.location.href = Links;
                            }}>Watch Episode</Button>
                    </Stack>
                </Stack>}
            <Modal opened={opened} onClose={() => { handlers.close() }} title={popupstate} centered>
                <LoadingOverlay visible={loading} zIndex={1000} overlayProps={{ radius: "sm", blur: 2 }} />
                {popupstate == 'Edit Episode' ?
                    <form onSubmit={onSubmit}>
                        <TextInput
                            withAsterisk
                            label="No."
                            placeholder="your episode no."
                            value={number}
                            onChange={e => setNumber(e.target.value)}
                        />
                        <TextInput
                            withAsterisk
                            label="Title"
                            placeholder="your episode title"
                            value={episodetitle}
                            onChange={e => setTitle(e.target.value)}
                        />
                        <TextInput
                            label="Description"
                            placeholder="your episode description"
                            value={description}
                            onChange={e => setDes(e.target.value)}
                        />

                        <TagsInput
                            label="Tag"
                            placeholder="Enter tag"
                            clearable
                            value={tags}
                            onChange={setTags}
                        />
                        <TagsInput
                            label="Characters"
                            placeholder="Enter characters name"
                            clearable
                            value={characters}
                            onChange={setChars}
                        />
                        <TextInput
                            withAsterisk
                            label="Link"
                            placeholder="your episode link"
                            value={Links}
                            onChange={e => setLink(e.target.value)}
                        />

                        <Group justify="flex-end" mt="md">
                            <Button type="submit" onClick={() => { handlers.close() }} color="#2CB5B5">Submit</Button>
                            <Button type="reset" variant="outline" color="#FF6666">Cancle</Button>
                        </Group>
                    </form> : popupstate == 'Delete Episode' ?
                        <Stack>
                            <Text>Are you sure you want to delete this episode</Text>
                            <Text>Episode {number} : {episodetitle}</Text>
                            <Text lineClamp={3}>{description}</Text>
                            <Group justify="flex-end" mt="md">
                                <Button type="submit" onClick={onDelete} color="#2CB5B5">Submit</Button>
                                <Button type="reset" variant="outline" color="#FF6666">Cancle</Button>
                            </Group>
                        </Stack>
                        : popupstate == 'Request Tags' ?
                            <Stack>
                                <Checkbox.Group value={value} onChange={setValue}>
                                    <Stack mt="xs">
                                        {showRqtags}
                                    </Stack>
                                </Checkbox.Group>
                                <Group justify="flex-end" mt="md">
                                    <Button type="submit" onClick={onConfirmRq} color="#2CB5B5">Accept</Button>
                                    <Button type="reset" onClick={onDeleteRq} variant="outline" color="#FF6666">Decline</Button>
                                </Group>
                            </Stack>
                            : popupstate == 'Request New Tags' ?
                                <div>
                                    <TagsInput
                                        placeholder="Enter tag"
                                        clearable
                                        value={NewRq}
                                        onChange={setNewRq}
                                    />
                                    <Group justify="flex-end" mt="md">
                                        <Button color="#2CB5B5" onClick={onSubmitRq}>Submit</Button>
                                    </Group>
                                </div>
                                : <></>

                }

            </Modal>
        </AppShell.Main>
    );

}