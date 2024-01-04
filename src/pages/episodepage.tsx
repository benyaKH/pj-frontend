import '@mantine/core/styles.css';
import { useParams } from 'react-router-dom';
import { AppShell, Group, TextInput, rem, Image, Text, Stack, Divider, ActionIcon, Button, Pill } from '@mantine/core';

import { IconEdit } from '@tabler/icons-react';
import { useEffect, useState } from 'react';
import EpisodeTable from '../components/EpisodeTable';

export default function EpisodePage(
    props: {
        isAdmin: boolean
    }
) {

    const params = useParams()

    const urlGetEpisodes = `http://localhost:3000/episodes/${params.id}`
    const urlEditEpisodes = `http://localhost:3000/episodes`

    const [number, setNumber] = useState('')
    const [episodetitle, setTitle] = useState('')
    const [description, setDes] = useState('')
    const [tags, setTags] = useState<string[]>([]);
    const [characters, setChars] = useState<string[]>([]);
    const [Links, setLink] = useState('')

    const [Edit, setEdit] = useState('')

    useEffect(() => {
        const fetchData = async () => {

            await fetch(urlGetEpisodes, {
                method: "GET"
            })
                .then(response => response.json())
                .then(result => {setNumber(result.number); setTitle(result.episodetitle); setDes(result.description); 
                    setTags(result.tags); setChars(result.characters); setLink(result.Links)})
                .catch(e => console.log(e))
        }
        fetchData()
    }, [])

    const showtags = tags.map((tag) => (
        <Pill>{tag}</Pill>
    ));

    const showchars = characters.map((char) => (
        <Pill>{char}</Pill>
    ));

    return (
        <AppShell.Main>
            <Stack
                bg="var(--mantine-color-body)"
            >
                <Stack px={rem(100)}>
                Episode page
                <Group>
                    <Text>{episodetitle}</Text>
                    {props.isAdmin ?
                                <ActionIcon variant="subtle" color='black' aria-label="EditName0" onClick={() => setEdit('title')}>
                                    <IconEdit style={{ width: '130%', height: '130%' }} stroke={1.5} />
                                </ActionIcon> : <div></div>}
                </Group>
                <Group>
                <Text>{description}</Text>
                {props.isAdmin ?
                                <ActionIcon variant="subtle" color='black' aria-label="EditName0" onClick={() => setEdit('des')}>
                                    <IconEdit style={{ width: '130%', height: '130%' }} stroke={1.5} />
                                </ActionIcon> : <div></div>}
                </Group>
                <Group>
                {showtags}
                {props.isAdmin ?
                                <ActionIcon variant="subtle" color='black' aria-label="EditName0" onClick={() => setEdit('tags')}>
                                    <IconEdit style={{ width: '130%', height: '130%' }} stroke={1.5} />
                                </ActionIcon> : <div></div>}
                </Group>
                <Group>
                {showchars}
                {props.isAdmin ?
                                <ActionIcon variant="subtle" color='black' aria-label="EditName0" onClick={() => setEdit('chars')}>
                                    <IconEdit style={{ width: '130%', height: '130%' }} stroke={1.5} />
                                </ActionIcon> : <div></div>}
                </Group>
                <Button >Watch Episode</Button>
                </Stack>
            </Stack>
        </AppShell.Main>
    );

}