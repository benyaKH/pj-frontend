import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import '@mantine/core/styles.css';
import { IconNewSection, IconSearch } from '@tabler/icons-react';
import { ActionIcon, Anchor, Badge, Button, Group, Modal, Stack, TagsInput, Text, TextInput, UnstyledButton, rem } from '@mantine/core';
import { JSXElementConstructor, ReactElement, ReactNode, ReactPortal, useEffect, useState } from 'react';
import { useDisclosure } from '@mantine/hooks';
import { FilterMatchMode } from 'primereact/api';
import { InputText } from 'primereact/inputtext';
import * as XLSX from "xlsx";


import KeywordSearch from './keywordsearch';
import EpisodeTable from './EpisodeTable';
import ResultTable from './ResultTable';

export default function TableSection(
    props: {
        stid: string | undefined;
        isAdmin: boolean
    }) {


    const [opened, handlers] = useDisclosure(false);
    const [popupstate, setPopupState] = useState('New Episode')

    const [data, setData] = useState([]);

    const [episodes, setEpisodes] = useState([])
    const [number, setNumber] = useState('')
    const [episodetitle, setTitle] = useState('')
    const [description, setDes] = useState('')
    const [tags, setTags] = useState<string[]>([]);
    const [characters, setChars] = useState<string[]>([]);
    const [Links, setLink] = useState('')
    const [StoryId, setStoryId] = useState(props.stid)
    const [newChoices, setNewChoices] = useState(true)

    const [key, setKey] = useState<string[]>([]);

    const [state, setState] = useState('allEp')

    const urlNewEpisodes = `http://localhost:3000/episodes`
    const urSearchkey = `http://localhost:3000/episodes/search?keyword=${key}`

    const onSubmitkey = () => {
        useEffect(() => {
            const fetchData = async () => {

                await fetch(urSearchkey, {
                    method: "GET"
                })
                    .then(response => response.json())
                    .then(result => setEpisodes(result))
                    .catch(e => console.log(e))
            }
            fetchData()
        }, [])

        console.log("something")
    }

    const onSubmitNew = () => {
        const payload = {
            number,
            episodetitle,
            description,
            tags,
            characters,
            Links,
            StoryId,

        }
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        };
        fetch(urlNewEpisodes, requestOptions)
            .then(response => response.json())
            .then(data => console.log(data));
    }

    const handleFileUpload = (e: any) => {
        console.log(e)
        const reader = new FileReader();
        reader.readAsBinaryString(e.target.files[0]);
        reader.onload = (e) => {
            const data = e.target.result;
            const workbook = XLSX.read(data, { type: "binary" });
            const sheetName = workbook.SheetNames[0];
            const sheet = workbook.Sheets[sheetName];
            const parsedData = XLSX.utils.sheet_to_json(sheet);
            setData(parsedData);
        };
    }

    const onSubmitNews = () => {
        data.forEach((element) => {
            if (element['tags'] != undefined) {
                element.tags = element.tags.split(',')
            }
            if (element['characters'] != undefined) {
                element.characters = element.characters.split(',')
            }

            element["StoryId"] = StoryId
            console.log(element)

            const requestOptions = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(element)
            };
            fetch(urlNewEpisodes, requestOptions)
                .then(response => response.json())
                .then(data => console.log(data));
        })

        location.reload();
    }

    // const Rqtags =  [...new Set(array.map((item) => item.age))];

    const onSearchKeyword = () => {
        if (key.length != 0) {
            setState('search keyword')
        } else {
            setState('allEp')
        }
    }



    return (

        <div>
            <Group>
                <Text size={rem(25)} fw={500}>
                    Episode
                </Text>

                <Modal opened={opened} onClose={() => handlers.close()} title={popupstate} centered>
                    {popupstate == 'New Episode' ?
                        <div>
                            <Group>
                                <Anchor onClick={() => setNewChoices(true)} underline="hover" color='black'>
                                    one-by-one
                                </Anchor>
                                <Anchor onClick={() => setNewChoices(false)} underline="hover" color='black'>
                                files
                                </Anchor>
                            </Group>
                            {newChoices ?
                                <form onSubmit={onSubmitNew}>
                                    <TextInput
                                        withAsterisk
                                        label="No."
                                        placeholder="your episode no."
                                        onChange={e => setNumber(e.target.value)}
                                    />
                                    <TextInput
                                        withAsterisk
                                        label="Title"
                                        placeholder="your episode title"
                                        onChange={e => setTitle(e.target.value)}
                                    />
                                    <TextInput
                                        label="Description"
                                        placeholder="your episode description"
                                        onChange={e => setDes(e.target.value)}
                                    />

                                    <TagsInput
                                        label="Tag"
                                        placeholder="Enter tag"
                                        clearable
                                        onChange={setTags}
                                    />
                                    <TagsInput
                                        label="Characters"
                                        placeholder="Enter characters name"
                                        clearable

                                        onChange={setChars}
                                    />
                                    <TextInput
                                        withAsterisk
                                        label="Link"
                                        placeholder="your episode link"
                                        onChange={e => setLink(e.target.value)}
                                    />

                                    <Group justify="flex-end" mt="md">
                                        <Button type="submit" onClick={close} color="#2CB5B5">Submit</Button>
                                        <Button type="reset" variant="outline" color="#FF6666">Cancle</Button>
                                    </Group>
                                </form> :
                                <div>

                                    <Stack py="lg">
                                        <input
                                            type="file"
                                            accept=".xlsx, .xls"
                                            onChange={handleFileUpload}
                                        />
                                        <Group justify="flex-end" mt="md">
                                            <Button type="submit" onClick={onSubmitNews} color="#2CB5B5">Submit</Button>
                                        </Group>
                                    </Stack>

                                </div>
                            }
                        </div> : popupstate == 'Search Episode' ?
                            <div>
                                <KeywordSearch />
                            </div> : <div></div>}
                </Modal>
                {/* add new episode */}
                {props.isAdmin ?
                    <ActionIcon variant="subtle" color='black' aria-label="EditDes" onClick={() => { handlers.open(); setPopupState('New Episode'); }}>
                        <IconNewSection style={{ width: '130%', height: '130%' }} stroke={1.5} />
                    </ActionIcon> : <div></div>}
                {/* search keyword */}
                <Group>
                    <TagsInput
                        placeholder="Pick tag from list"
                        maxDropdownHeight={200}
                        value={key}
                        onChange={setKey}
                    />
                    <ActionIcon variant="subtle" radius="xl" size="lg" color='black' aria-label="search"
                        onClick={onSubmitkey}>
                        <IconSearch style={{ width: '70%', height: '70%' }} stroke={2} onClick={onSearchKeyword} />
                    </ActionIcon>
                </Group>
            </Group>
            {/* Table */}
            <Text>{state}</Text>
            {state == 'allEp' ?
                <EpisodeTable stid={props.stid} isAdmin={props.isAdmin} /> : <ResultTable stid={props.stid} isAdmin={props.isAdmin} keyword={key} />}

        </div>


    );

}