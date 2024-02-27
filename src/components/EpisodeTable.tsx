import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import '@mantine/core/styles.css';
import {  Badge, Group,  Text } from '@mantine/core';
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


    const urlGetEpisodes = `http://localhost:3000/episodes/story/${props.stid}`
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
            window.location.href = urlherf(selectedCustomer['_id'])
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
            {props.isAdmin ?
                RqEp.find((element) => element == episodes._id) != undefined ?
                    <Badge size="xs" color="red" >
                        New Request!
                    </Badge> : <div></div> : <div></div>}
        </Group>

    };

    return (

            <DataTable value={episodes} removableSort paginator rows={5} rowsPerPageOptions={[5, 10, 25, 50]} tableStyle={{ minWidth: '50rem' }}
                dataKey="_id" filters={filters} filterDisplay="row" showGridlines
                selectionMode="single" selection={selectedCustomer} onSelectionChange={(e) => setSelectedCustomer(e.value)} onClick={onClick}
                globalFilterFields={['number', 'episodetitle', 'description', 'tags']} header={header} emptyMessage="No episodes found.">
                <Column key='number' field='number' header='No.' sortable />
                <Column key='episodetitle' field='episodetitle' body={titleTemplate} header='Title' sortable />
                <Column key='description' field='description' header='Description' sortable />
                <Column key='tags' field='tags' header='Tags' body={tagBodyTemplate} sortable />
            </DataTable>
        


    );

}