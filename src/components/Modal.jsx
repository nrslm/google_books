import React from 'react'
import { Modal, Spoiler } from '@mantine/core';
import { useDispatch, useSelector } from 'react-redux'
import { showModal } from '../components/features/getBooks/GetBooksSlice'
import { Loader } from '@mantine/core'

function ModalBook({ data }) {

    const dispatch = useDispatch()
    const showSpiner = useSelector((state) => state.getOne.showSpiner)
    let show = useSelector(state => state.get.showModal)


    return (
        <div>
            <Modal
                opened={show}
                onClose={() => dispatch(showModal(false))}
                size="50%"
                centered
                overlayOpacity={0.55}
                overlayBlur={3}
                transition="fade"
                transitionDuration={300}
                transitionTimingFunction="ease"
            >
                {data ?
                    <div className='content-modal'>
                        <div className='left-content-modal' >
                            <img src={data.volumeInfo.imageLinks.thumbnail} alt="img Book" />
                        </div>
                        <div className='right-content-modal'>
                            <span>
                                {data.volumeInfo.categories ?
                                    data.volumeInfo.categories.map((v) => { return v })
                                    :
                                    null
                                }
                            </span>
                            <h2>{data.volumeInfo.title}</h2>
                            <h4>
                                {data.volumeInfo.authors ?
                                    data.volumeInfo.authors.map((v) => { return v })
                                    :
                                    null
                                }
                            </h4>
                            <Spoiler maxHeight={240} showLabel="Show more" hideLabel="Hide">
                                <span>{data.volumeInfo.description}</span>
                            </Spoiler>
                        </div>
                    </div>
                    : showSpiner ?
                        <Loader color="yellow" />
                        : null
                }
            </Modal>
        </div>
    )
}

export default ModalBook