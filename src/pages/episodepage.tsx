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

    const showchars = tags.map((char) => (
        <Pill>{char}</Pill>
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
                Episode page
                <Group>
                    <Text>{episodetitle}</Text>
                </Group>
                <Group>
                <Text>{description}</Text>
                </Group>
                <Group>
                {showtags}
                </Group>
                <Group>
                {showchars}
                </Group>
                <Button >Watch Episode</Button>
            </Stack>
        </AppShell.Main>
    );

}