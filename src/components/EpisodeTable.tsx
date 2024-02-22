import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import '@mantine/core/styles.css';
import { IconNewSection, IconSearch } from '@tabler/icons-react';
import { ActionIcon, Badge, Button, Group, Modal, Stack, TagsInput, Text, TextInput, UnstyledButton, rem } from '@mantine/core';
import { JSXElementConstructor, ReactElement, ReactNode, ReactPortal, useEffect, useState } from 'react';
import { useDisclosure } from '@mantine/hooks';
import { FilterMatchMode } from 'primereact/api';
import { InputText } from 'primereact/inputtext';
import * as XLSX from "xlsx";


import KeywordSearch from './keywordsearch';

export default function EpisodeTable(
    props: {
        stid: string | undefined;
        isAdmin: boolean
    }) {

    const [filters, setFilters] = useState({
        global: { value: null, matchMode: FilterMatchMode.CONTAINS }
    })
    const [globalFilterValue, setGlobalFilterValue] = useState('');
    const [selectedCustomer, setSelectedCustomer] = useState(null);

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

    const [RqEp, setRqEp] = useState([])

    const [newChoices, setNewChoices] = useState(true)

    const [key, setKey] = useState<string[]>([]);




    const urlGetEpisodes = `http://localhost:3000/episodes/story/${props.stid}`
    const urlNewEpisodes = `http://localhost:3000/episodes`
    const urSearchkey = `http://localhost:3000/episodes/search?keyword=${key}`

    const urltagRequest = `http://localhost:3000/rqtags/lenght/${props.stid}`


    const onGlobalFilterChange = (e: { target: { value: any; }; }) => {
        const value = e.target.value;
        let _filters = { ...filters };

        _filters['global'].value = value;

        setFilters(_filters);
        setGlobalFilterValue(value);
    };


    function urlherf(id: any) {
        if (props.isAdmin) {
            return `/Dashborad/Episode/${id}`
        } else return `/Episode/${id}`
    }
    // get episodes
    useEffect(() => {
        const fetchData = async () => {

            await fetch(urlGetEpisodes, {
                method: "GET"
            })
                .then(response => response.json())
                .then(result => setEpisodes(result))
                .catch(e => console.log(e))
        }
        fetchData()



    }, [])

    // get episode requests
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
            if (element.tags != undefined) {
                element.tags = element.tags.split(',')
            }
            if (element.characters != undefined) {
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


    const renderHeader = () => {
        return (
            <div className="flex justify-content-end">
                <span className="p-input-icon-left">
                    <i className="pi pi-search" />
                    <InputText value={globalFilterValue} onChange={onGlobalFilterChange} placeholder="Keyword Search" />
                </span>
            </div>
        );
    };

    const onClick = () => {
        if (selectedCustomer != null) {
            window.location.href = urlherf(selectedCustomer._id)
        }
    };

    const header = renderHeader();

    const tagBodyTemplate = (episodes: { tags: any[]; }) => {
        return episodes.tags.map((tag) => (
            <Badge color="#48E1E1">{tag}</Badge>))

    };

    const titleTemplate = (episodes: { episodetitle: string | number | boolean | ReactElement<any, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | null | undefined; _id: string | number | boolean | ReactElement<any, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | null | undefined; }) => {
        return <Group>
            <Text>{episodes.episodetitle}</Text>
            {RqEp.find((element) => element == episodes._id) != undefined ?
            <Badge size="xs" color="red" >
                New Request!
            </Badge>:<div></div>}
        </Group>

    };

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
                                <UnstyledButton onClick={() => setNewChoices(true)}>one-by-one</UnstyledButton>
                                <UnstyledButton onClick={() => setNewChoices(false)}>files</UnstyledButton>
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

                {props.isAdmin ?
                    <ActionIcon variant="subtle" color='black' aria-label="EditDes" onClick={() => { handlers.open(); setPopupState('New Episode'); }}>
                        <IconNewSection style={{ width: '130%', height: '130%' }} stroke={1.5} />
                    </ActionIcon> : <div></div>}
                <Group>
                    <TagsInput
                        placeholder="Pick tag from list"
                        maxDropdownHeight={200}
                        value={key}
                        onChange={setKey}
                    />
                    <ActionIcon variant="subtle" radius="xl" size="lg" color='black' aria-label="search"
                        onClick={onSubmitkey}>
                        <IconSearch style={{ width: '70%', height: '70%' }} stroke={2} />
                    </ActionIcon>
                </Group>
            </Group>
            <DataTable value={episodes} removableSort paginator rows={5} rowsPerPageOptions={[5, 10, 25, 50]} tableStyle={{ minWidth: '50rem' }}
                dataKey="_id" filters={filters} filterDisplay="row" showGridlines
                selectionMode="single" selection={selectedCustomer} onSelectionChange={(e) => setSelectedCustomer(e.value)} onClick={onClick}
                globalFilterFields={['number', 'episodetitle', 'description', 'tags']} header={header} emptyMessage="No episodes found.">
                <Column key='number' field='number' header='No.' sortable />
                <Column key='episodetitle' field='episodetitle' body={titleTemplate} header='Title' sortable />
                <Column key='description' field='description' header='Description' sortable />
                <Column key='tags' field='tags' header='Tags' body={tagBodyTemplate} sortable />
            </DataTable>
        </div>


    );

}