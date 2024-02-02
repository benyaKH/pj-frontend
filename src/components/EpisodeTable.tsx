import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import '@mantine/core/styles.css';
import { IconEdit, IconNewSection, IconTrash } from '@tabler/icons-react';
import { ActionIcon, Badge, Button, Card, Group, Image, Modal, TagsInput, Text, TextInput, rem } from '@mantine/core';
import { JSXElementConstructor, ReactElement, ReactNode, SetStateAction, useEffect, useState } from 'react';
import { useDisclosure } from '@mantine/hooks';
import { FilterMatchMode } from 'primereact/api';
import { InputText } from 'primereact/inputtext';
import { Dialog } from 'primereact/dialog';

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
    const [opened, { open, close }] = useDisclosure(false);

    const [episodes, setEpisodes] = useState([])
    const [number, setNumber] = useState('')
    const [episodetitle, setTitle] = useState('')
    const [description, setDes] = useState('')
    const [tags, setTags] = useState<string[]>([]);
    const [characters, setChars] = useState<string[]>([]);
    const [Links, setLink] = useState('')
    const [StoryId, setStoryId] = useState(props.stid)



    const urlGetEpisodes = `http://localhost:3000/episodes/story/${props.stid}`
    const urlNewEpisodes = `http://localhost:3000/episodes`

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

    const columns = [
        { field: 'number', header: 'No.' },
        { field: 'episodetitle', header: 'Title' },
        { field: 'description', header: 'Description' },
        { field: 'tags', header: 'Tags' }
    ];


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

    // const actionBodyTemplate = (rowData: any) => {
    //     return (
    //         <Group justify="center">
    //             <ActionIcon variant="filled" color="#2CB5B5" aria-label="EditDes" onClick={() => editProduct(rowData)}>
    //                 <IconEdit style={{ width: '130%', height: '130%' }} stroke={1.5} />
    //             </ActionIcon>
    //             <ActionIcon variant="filled" color="#FF6666" aria-label="EditDes" onClick={() => confirmDeleteProduct(rowData)}>
    //                 <IconTrash style={{ width: '130%', height: '130%' }} stroke={1.5} />
    //             </ActionIcon>
    //         </Group>
    //     );
    // };

    const header = renderHeader();

    const tagBodyTemplate = (episodes) => {
        return episodes.tags.map((tag) => (
            <Badge color="#48E1E1">{tag}</Badge>))
        
    };

    return (

        <div>
            <Group>
                <Text size={rem(25)} fw={500}>
                    Episode
                </Text>

                <Modal opened={opened} onClose={close} title="New Episode" centered>
                    
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
                    </form>
                </Modal>

                {props.isAdmin ?
                    <ActionIcon variant="subtle" color='black' aria-label="EditDes" onClick={open}>
                        <IconNewSection style={{ width: '130%', height: '130%' }} stroke={1.5} />
                    </ActionIcon> : <div></div>}
            </Group>
            <DataTable value={episodes} removableSort paginator rows={5} rowsPerPageOptions={[5, 10, 25, 50]} tableStyle={{ minWidth: '50rem' }}
                dataKey="_id" filters={filters} filterDisplay="row" showGridlines
                selectionMode="single" selection={selectedCustomer} onSelectionChange={(e) => setSelectedCustomer(e.value)} onClick={onClick}
                globalFilterFields={['number', 'episodetitle', 'description', 'tags']} header={header} emptyMessage="No episodes found.">
                <Column key='number' field='number' header='No.' sortable />
                <Column key='episodetitle' field='episodetitle' header='Title' sortable />
                <Column key='description' field='description' header='Description' sortable />
                <Column key='tags' field='tags' header='Tags' body={tagBodyTemplate} sortable />
                {/* <Column body={actionBodyTemplate} exportable={false} style={{ minWidth: '12rem' }}></Column> */}
            </DataTable>
        </div>


    );

}