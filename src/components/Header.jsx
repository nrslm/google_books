import React, { useState } from 'react'
import { TextInput, Select, Button } from '@mantine/core';
import { Search } from 'tabler-icons-react';
import { useDispatch } from 'react-redux'

function Header(
    {
        searchPosts,
        onSearchTextChange,
        onSearchHandleDown,
        chooseCategories,
        chooseRelevance
    }
    ) {

    return (
        <div className='header_box'>
            <h1>Search for books</h1>
            <div style={{ display: 'flex', }}>
                <TextInput
                    style={{ width: '100%', }}
                    onKeyUp={(e) => onSearchHandleDown(e)}
                    onChange={(event) => onSearchTextChange(event.currentTarget.value)}
                    placeholder="Your name"
                    required
                    size="md"
                />
                <Button onClick={() => searchPosts()} color="gray" size="md">
                    <Search
                        size={30}
                        strokeWidth={2}
                        color={'white'}
                    />
                </Button>
            </div>
            <div className={"box-select"}>
                <div>
                    <span className='lable'>Categories</span>
                    <Select
                        onChange={(e) => chooseCategories(e)}
                        placeholder="All"
                        data={[
                            "all", "art", "biography", "computers", "history", "medical", "poetry"
                        ]}
                    />
                </div>
                <div>
                    <span className='lable'>Releveance</span>
                    <Select
                        onChange={(e) => chooseRelevance(e)}
                        placeholder="Releveance"
                        data={[
                            "relevance", "newest"
                        ]}
                    />
                </div>
            </div>
        </div>
    )
}

export default Header