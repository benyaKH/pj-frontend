import '@mantine/core/styles.css';
import { useParams } from 'react-router-dom';
import { AppShell, Group, TextInput, rem, Image, Text, Stack,  ActionIcon, Button,  Modal, TagsInput, Badge } from '@mantine/core';

import { IconEdit } from '@tabler/icons-react';
import { useEffect, useState } from 'react';
import { useDisclosure } from '@mantine/hooks';

export default function EpisodePage(
    props: {
        isAdmin: boolean
    }
) {

    const params = useParams()

    const urlGetEpisodes = `http://localhost:3000/episodes/${params.id}`
    const urlEditEpisodes = `http://localhost:3000/episodes/${params.id}`
    const urlDelEpisodes = `http://localhost:3000/episodes/${params.id}`

    const [popupstate, setPopupState] = useState('Edit Episode')

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
        const fetchData = async () => {

            await fetch(urlGetEpisodes, {
                method: "GET"
            })
                .then(response => response.json())
                .then(result => {
                    setNumber(result.number); setTitle(result.episodetitle); setDes(result.description);
                    setTags(result.tags); setChars(result.characters); setLink(result.Links); 
                    setStoryname(result.StoryId.storyname); setStoryid(result.StoryId._id)
                })
                .catch(e => console.log(e))
        }
        fetchData()
    }, [])

    const onSubmit = () => {
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
            .then(data => console.log(data));
    }

    const onDelete = () => {
        const requestOptions = {
            method: 'DELETE'
        };
        fetch(urlDelEpisodes, requestOptions)
            .then(response => response.json())
            .then(data => console.log(data));

        window.location.href=`/Dashboard/${storyid}`
    }

    const showtags = tags.map((tag) => (
        <Badge color="#48E1E1">{tag}</Badge>
    ));

    const showchars = characters.map((char) => (
        <Badge color="#48E1E1">{char}</Badge>
    ));

    return (
        <AppShell.Main>
            <Stack
                bg="var(--mantine-color-body)"
            >
                <Image
                    src="https://images.unsplash.com/photo-1579227114347-15d08fc37cae?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2550&q=80"
                    mah={300}
                    alt="No way!"
                />
                <Stack px={rem(100)}>
                    Episode page
                    <Text size={rem(35)} fw={700}>{storyname}</Text>
                    <Group>
                        <Text size={rem(24)} fw={500}>Episode {number} : {episodetitle}</Text>
                        {props.isAdmin ?
                        <Group>
                            <ActionIcon variant="subtle" color='black' aria-label="EditName0" onClick={()=>{handlers.open(); setPopupState('Edit Episode');}} >
                                <IconEdit style={{ width: '130%', height: '130%' }} stroke={1.5} />
                            </ActionIcon>
                            <Button color="#FF6666" onClick={()=>{handlers.open(); setPopupState('Delete Episode');}}>Delete</Button>
                        </Group>
                         : <div></div>}
                    </Group>
                    <Text size={rem(14)}>{description}</Text>
                    <Stack>
                        <Text size={rem(14)}>Tags</Text>
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
                        window.location.href=Links;
                        }}>Watch Episode</Button>
                </Stack>
            </Stack>
            <Modal opened={opened&&(popupstate=='Edit Episode')} onClose={()=>{handlers.close()}} title={popupstate} centered>
                {popupstate=='Edit Episode' ?
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
                        <Button type="submit" onClick={()=>{handlers.close()}} color="#2CB5B5">Submit</Button>
                        <Button type="reset" variant="outline" color="#FF6666">Cancle</Button>
                    </Group>
                </form>:popupstate=='Delete Episode' ? 
                <Stack>
                    <Text>Are you sure you want to delete this episode</Text>
                    <Text>Episode {number} : {episodetitle}</Text>
                    <Text lineClamp={3}>{description}</Text>
                    <Group justify="flex-end" mt="md">
                        <Button type="submit" onClick={onDelete} color="#2CB5B5">Submit</Button>
                        <Button type="reset" variant="outline" color="#FF6666">Cancle</Button>
                    </Group>
                </Stack> 
                : <div></div>
                }
                
            </Modal>
            <Modal opened={opened&&(popupstate=='Delete Episode')} onClose={()=>{handlers.close()}} title={popupstate} centered>
                
                <Stack>
                    <Text>Are you sure you want to delete this episode</Text>
                    <Text>Episode {number} : {episodetitle}</Text>
                    <Text lineClamp={3}>{description}</Text>
                    <Group justify="flex-end" mt="md">
                        <Button type="submit" onClick={onDelete} color="#2CB5B5">Submit</Button>
                        <Button type="reset" variant="outline" color="#FF6666">Cancle</Button>
                    </Group>
                </Stack> 
                
                
            </Modal>
        </AppShell.Main>
    );

}