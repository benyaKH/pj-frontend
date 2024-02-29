import '@mantine/core/styles.css';
import { useParams } from 'react-router-dom';
import { AppShell, Group, TextInput, rem, Image, Text, Stack, Divider, ActionIcon, Button, Switch, Badge, Overlay, AspectRatio, Container, Grid, TypographyStylesProvider, BackgroundImage, Center, Box, Modal } from '@mantine/core';

import { IconEdit } from '@tabler/icons-react';
import { useEffect, useState } from 'react';

import ReactQuill from "react-quill";

import "react-quill/dist/quill.snow.css";

import TableSection from '../components/TableSection';
import { error } from 'jquery';
import { useDisclosure, useHover } from '@mantine/hooks';

export default function StoryPage(
    props: {
        isAdmin: boolean
    }
) {

    const params = useParams()
    const [IsPublic, setIsPublic] = useState(false)
    const { hovered, ref } = useHover();
    const [opened, handlers] = useDisclosure(false);

    const urlStory = `http://localhost:3000/stories/${params.id}`
    const urleditStory = `http://localhost:3000/stories/${params.id}`
    const urldeleteStory = `http://localhost:3000/stories/${params.id}`

    const [storyname, setStoryname] = useState('')
    const [description, setDescription] = useState('')
    const [category, setCategory] = useState('')
    const [IsEditName, setIsEditName] = useState(false)
    const [IsEditDEs, setIsEditDes] = useState(false)

    const [image, setImage] = useState("")

    const handleProcedureContentChange = (content: any) => {
        setDescription(content);
    };
    const modules = {
        toolbar: [
            [{ header: [1, 2, 3, 4, 5, 6, false] }],
            ["bold", "italic", "underline", "strike", "blockquote"],
            [{ align: ["right", "center", "justify"] }],
            [{ list: "ordered" }, { list: "bullet" }],
            ["link"]
        ]
    };
    const formats = [
        "header",
        "bold",
        "italic",
        "underline",
        "strike",
        "blockquote",
        "list",
        "bullet",
        "link",
        "align"
    ];

    useEffect(() => {
        const fetchData = async () => {

            await fetch(urlStory, {
                method: "GET"
            })
                .then(response => response.json())
                .then(result => {
                    setStoryname(result.storyname); setDescription(result.description);
                    setCategory(result.category); setIsPublic(result.IsPublic); setImage(result.image)
                })
                .catch(e => console.log(e))
        }
        fetchData()
    }, [])

    function convertToBase64(e: any) {
        var reader = new FileReader();
        reader.readAsDataURL(e.target.files[0]);
        reader.onload = () => {
            setImage(reader.result)
        };
        reader.onerror = error => {
            console.log("Error:", error)
        }
    }
    const onSubmitEdit = () => {
        const payload = {
            storyname,
            description
        }
        const requestOptions = {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        };
        fetch(urleditStory, requestOptions)
            .then(response => response.json())
            .then(data => console.log(data));
        setIsEditName(false)
        setIsEditDes(false)
    }

    const onUploadImage = () => {
        const payload = {
            image
        }
        const requestOptions = {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        };
        fetch(urleditStory, requestOptions)
            .then(response => response.json())
            .then(data => console.log(data)).then(()=>handlers.close());
    }

    const onPublic = () => {

        setIsPublic(!IsPublic)
        const payload = {
            IsPublic: !IsPublic
        }
        const requestOptions = {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        };
        fetch(urleditStory, requestOptions)
            .then(response => response.json())
            .then(data => console.log(data));
    }

    return (
        <AppShell.Main>
            <Stack
                bg="var(--mantine-color-body)"
            >
                <div>
                    <Container fluid px={0} ref={ref}>
                        <AspectRatio mah={300} ratio={16 / 9}>
                            <BackgroundImage
                                src={image == "" || image == null ?
                                    "https://images.unsplash.com/photo-1579227114347-15d08fc37cae?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2550&q=80"
                                    : image}
                                radius="xs" h={300}
                            >
                            </BackgroundImage>
                            {hovered && <Center p="md" >
                                <ActionIcon variant="subtle" color='black' aria-label="EditName0" onClick={() => handlers.open()}>
                                    <IconEdit style={{ width: '100%', height: '100%' }} stroke={1.5} />
                                </ActionIcon>
                            </Center>}
                        </AspectRatio>
                    </Container>
                </div>


                <Stack px={rem(100)}>
                    <Stack gap={rem(1)}>
                        <Group justify="space-between">
                            <Group>
                                {IsEditName ?
                                    <TextInput
                                        variant="unstyled"
                                        onChange={e => setStoryname(e.target.value)}
                                        value={storyname}

                                    /> :
                                    <Text size={rem(40)} fw={700}>
                                        {storyname}
                                    </Text>}
                                {props.isAdmin ?
                                    <ActionIcon variant="subtle" color='black' aria-label="EditName0" onClick={() => setIsEditName(true)}>
                                        <IconEdit style={{ width: '130%', height: '130%' }} stroke={1.5} />
                                    </ActionIcon> : <div></div>}
                                {IsEditName ? <Button type="submit" onClick={onSubmitEdit} color="#2CB5B5">Submit</Button> : <div></div>}
                            </Group>

                            {props.isAdmin ?
                                <Switch checked={IsPublic} onChange={onPublic} label={"Public"} mt="md" /> : <div></div>}
                        </Group>

                        <Text td="underline" color='gray'>
                            {category}
                        </Text>
                    </Stack>

                    <Grid columns={9}>
                        <Grid.Col span={8}> {IsEditDEs ?
                            <ReactQuill
                                theme="snow"
                                modules={modules}
                                formats={formats}
                                value={description}
                                onChange={handleProcedureContentChange}
                            /> :

                            <div dangerouslySetInnerHTML={{ __html: description }} />



                        }</Grid.Col>
                        <Grid.Col span={1}>
                            {props.isAdmin ? IsEditDEs ?

                                <Button type="submit" onClick={onSubmitEdit} color="#2CB5B5">Submit</Button>
                                :
                                <ActionIcon variant="subtle" color='black' aria-label="EditDes" onClick={() => setIsEditDes(true)}>
                                    <IconEdit style={{ width: '130%', height: '130%' }} stroke={1.5} />
                                </ActionIcon> : <div></div>}
                        </Grid.Col>
                    </Grid>
                    <Divider my="md" />
                    <TableSection stid={params.id} isAdmin={props.isAdmin} />
                </Stack>
                <Modal opened={opened} onClose={() => handlers.close()} title="Edit image" centered>
                    <Stack>
                        <input
                            type="file"
                            accept="image/*"
                            onChange={convertToBase64}
                        />
                        <Group justify="flex-end" mt="md">
                            <Button onClick={onUploadImage}>Upload</Button>
                        </Group>
                    </Stack>
                </Modal>
            </Stack>
        </AppShell.Main>
    );

}