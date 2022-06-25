import React, { useState } from 'react'
import { Card, Image, Text, Badge, Button, Group, useMantineTheme, Spoiler } from '@mantine/core'
import { useDispatch } from 'react-redux'
import { showModal } from '../components/features/getBooks/GetBooksSlice'
import { setItem } from './features/getBook/GetBookSlice'

function Cards({ title, img, category, auth, post }) {
    const dispatch = useDispatch()

    const theme = useMantineTheme();
    const secondaryColor = theme.colorScheme === 'dark'
        ? theme.colors.dark[1]
        : theme.colors.gray[7];

    const submitModal = (post) => {
        dispatch(setItem(post))
        dispatch(showModal(true))
    }

    return (
        <div className='block-card' style={{ width: 300, margin: '20px 10px', }}>
            <Card shadow="sm" p="lg">
                <Card.Section>
                    <Image src={img} height={300} alt="Norway" />
                </Card.Section>

                <Group position="apart" style={{ marginBottom: 5, marginTop: theme.spacing.sm }}>
                    <Badge color="pink" variant="light">
                        {
                            category !== undefined ?
                                category[0]
                                :
                                "null"
                        }
                    </Badge>
                </Group>
                <div>
                    <Spoiler maxHeight={25} showLabel="Show more" hideLabel="Hide">
                        <Text weight={500}>{title}</Text>
                    </Spoiler>
                </div>
                <Text size="sm" style={{ color: secondaryColor, lineHeight: 1.5 }}>
                    {
                        auth !== undefined ?
                            auth[0]
                            :
                            "null"
                    }
                </Text>

                <Button onClick={() => submitModal(post)} variant="light" color="blue" fullWidth style={{ marginTop: 14 }}>
                    Book show
                </Button>
            </Card>
        </div>
    )
}

export default Cards