import '@mantine/core/styles.css';
import { Button, Container, Group, Modal, Text, rem } from '@mantine/core';
import StoryCard from './StoryCard';
import { useDisclosure, useHover } from '@mantine/hooks';
import { useState } from 'react';

export default function StoryCardAdmin(
    props: {
        stid: string,
        title: string;
        category: string;
        description: string
        Ep: string[]
    }) {

    
    const [opened, { open, close }] = useDisclosure(false);
    const { hovered, ref } = useHover();
    const urldeleteStory = `http://localhost:3000/stories/${props.stid}`

    const onSubmitDelete = () => {

        const urldelete = urldeleteStory
        const requestOptions = {
            method: 'DELETE',
        };
        fetch(urldelete, requestOptions)
            .then(response => response.json())
            .then(() => {
                window.location.reload();
            })
            window.location.reload();

    }
    return (
        
        <div ref={ref}>
            <StoryCard id={props.stid} category={props.category}title={props.title} description={props.description} Ep={props.Ep.length} isAdmin={true}></StoryCard>
            <Modal opened={opened} onClose={close} title="Are you sure delete this question?" centered>
                <Text size='xs'>If you delete the question you can’t recover it.</Text>
                <Group justify="flex-end" mt="md">
                    <Button variant="outline"  color="#FF6666" onClick={close}>Cancle</Button>
                    <Button type="submit"  color="#FF6666" onClick={onSubmitDelete}>Delete</Button>
                </Group>
            </Modal>
            {hovered ?
            <Container py="sm">
                <Button variant="outline" onClick={open} color="#FF6666" fullWidth >
                    Delete
                </Button>
            </Container> : <div></div>}
        </div>
        

    );

}