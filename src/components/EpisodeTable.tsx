import '@mantine/core/styles.css';
import { IconNewSection } from '@tabler/icons-react';
import { ActionIcon, Button, Card, Group, Image, Modal, TagsInput, Text, TextInput, rem } from '@mantine/core';
import DataTable from 'datatables.net-dt';
import { useEffect, useState } from 'react';
import { useDisclosure } from '@mantine/hooks';

export default function EpisodeTable(
    props: {
        stid: string | undefined;
        isAdmin: boolean
    }) {
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

    const onSubmit = () => {
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


    var table = new DataTable('#example', {
        retrieve: true,
        data: episodes,
        columns: [
            { "data": 'number' },
            { "data": 'episodetitle' },
            {
                "data": 'description',
                "defaultContent": ""
            },
            {
                "data": 'tags',
                "defaultContent": ""
            },
            {
                "data": null,
                "defaultContent": '<Button>Edit</Button> <Button>Delete</Button>',
            }
        ]
    });

    table.on('click', 'tbody tr', function () {
        let data = table.row(this).data();
        

        alert('You clicked on ' + data[0] + "'s row");
    });

    const items = episodes.map((ep) => (
        <tr>
            <td> {ep['number']} </td>
            <td> {ep['episodetitle']} </td>
            <td> {ep['description']} </td>
            <td> {ep['tags']} </td>
            <td>
                <Button>Edit</Button>
                <Button>Delete</Button>
            </td>
        </tr>
    ));

    return (

        <div>
            <Group>
                <Text size={rem(25)} fw={500}>
                    Episode
                </Text>

                <Modal opened={opened} onClose={close} title="New Episode" centered>
                    <form onSubmit={onSubmit}>
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
            <link href="https://nightly.datatables.net/css/jquery.dataTables.css" rel="stylesheet" type="text/css" />
            <script src="https://nightly.datatables.net/js/jquery.dataTables.js"></script>
            <table id="example" className="display" width="100%" >
                <thead>
                    <tr>
                        <th>No.</th>
                        <th>Title</th>
                        <th>Description</th>
                        <th>Tags</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>

                </tbody>
            </table>
        </div>


    );

}