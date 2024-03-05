import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import '@mantine/core/styles.css';
import { Badge, Button, Group, TagsInput, Text } from '@mantine/core';
import { JSXElementConstructor, ReactElement, ReactNode, ReactPortal, useEffect, useState } from 'react';

import { FilterMatchMode } from 'primereact/api';
import { InputText } from 'primereact/inputtext';


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

    const [episodes, setEpisodes] = useState([])
    const [RqEp, setRqEp] = useState([])
    const [key, setKey] = useState<string[]>([]);


    const urlGetKeyEpisodes = `https://pj-backend.up.railway.app/episodes/search/${props.stid}?keyword=${key}`
    const urlGetEpisodes = `https://pj-backend.up.railway.app/episodes/story/${props.stid}`
    const urltagRequest = `https://pj-backend.up.railway.app/rqtags/lenght/${props.stid}`


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

    function GeturlEp() {
        if (key.length == 0) {
            return urlGetEpisodes
        } else { return urlGetKeyEpisodes }
    }
    // get episodes
    useEffect(() => {

        const Geturl = GeturlEp()

        const fetchData = async () => {

            await fetch(Geturl, {
                method: "GET"
            })
                .then(response => response.json())
                .then(result => setEpisodes(result))
                .catch(e => console.log(e))
        }
        fetchData()



    }, [key])

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





    const renderHeader = () => {
        return (
            <div className="flex justify-content-end">
                <span className="p-input-icon-left">
                    <i className="pi pi-search" />
                    <TagsInput
                        placeholder="Pick tag from list"
                        maxDropdownHeight={200}
                        value={key}
                        onChange={setKey}
                    />
                </span>
            </div>
        );
    };

    const onClick = () => {
        if (selectedCustomer != null) {
            window.location.href = urlherf(selectedCustomer['_id'])
        }
    };

    const header = renderHeader();

    const tagBodyTemplate = (episodes: {
        _id: never; tags: any[]; 
}) => {
        return <Group w={200}>
            {props.isAdmin &&
                RqEp.find((element) => element == episodes._id) != undefined &&
                <Badge size="xs" color="red" >
                    New Request!
                </Badge>}
            {episodes.tags.map((tag) => (
                <Badge color="#48E1E1">{tag}</Badge>))}
        </Group>

    };

    const desTemplate = (episodes: {
        Links: string; description: string  | null | undefined; _id: string | number | boolean | ReactElement<any, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | null | undefined; 
}) => {
        return <Group w={500}>
            <Text>{episodes.description}</Text>
            <Button onClick={(e) => {
                                e.preventDefault();
                                window.location.href = episodes.Links;
                            }}>{">>"}</Button>
        </Group>

    };

    return (


        <DataTable value={episodes} removableSort paginator rows={5} rowsPerPageOptions={[5, 10, 25, 50]} tableStyle={{ minWidth: '50rem' }}
            dataKey="_id" filters={filters} filterDisplay="row" showGridlines
            selectionMode="single" selection={selectedCustomer} onSelectionChange={(e) => setSelectedCustomer(e.value)} onClick={onClick}
            globalFilterFields={['number', 'episodetitle', 'description', 'tags']} header={header} emptyMessage="No episodes found.">
            <Column key='number' field='number' header='No.' sortable />
            <Column key='episodetitle' field='episodetitle'  header='Title' sortable />
            <Column key='description' field='description' body={desTemplate} header='Description' sortable />
            <Column key='tags' field='tags' header='Tags' body={tagBodyTemplate} sortable />
        </DataTable>



    );

}