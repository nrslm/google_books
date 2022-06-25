import './App.css'
import React, { useState } from 'react'
import Headers from './components/Header'
import Card from './components/Cards'
import ModalBook from './components/Modal'
import { useDispatch, useSelector } from 'react-redux'
import { Loader } from '@mantine/core'
import { getPosts } from './components/features/getBooks/GetBooksSlice'

function App() {
  const dispatch = useDispatch()
  const items = useSelector((state) => state.get.data)
  const showSpiner = useSelector((state) => state.get.showSpiner)
  const { reachedLimit } = useSelector((state) => state.get.page)
  const dataModal = useSelector((state) => state.getOne.data)
  const startIndex = useSelector((state) => state.get.page.startIndex)

  const [valueInputSearch, setValueInputSearch] = useState(null);
  const [valueSelectCategories, setValueSelectCategories] = useState(null)
  const [valueSelectReleveance, setValueSelectRelevance] = useState(null)

  const handlerShowMoreBooks = (v) => {
    dispatch(getPosts({
      searchText: valueInputSearch,
      category: valueSelectCategories,
      rev: valueSelectReleveance,
      startIndex: startIndex + 20
    }))
  }

  const searchPosts = () => {
    dispatch(getPosts({
      searchText: valueInputSearch,
      category: valueSelectCategories,
      rev: valueSelectReleveance,
      startIndex: startIndex,
    }))
  }
  const onKeyDown = (e) => {
    if (e.code === "Enter") {
      searchPosts()
    }
  }
  return (
    <>
      <div className="App">
        <div className='header_block'>
          <Headers
            searchPosts={() => searchPosts()}
            onSearchTextChange={(value) => setValueInputSearch(value)}
            onSearchHandleDown={(e) => onKeyDown(e)}
            chooseCategories = {(v)=> setValueSelectCategories(v)}
            chooseRelevance = {(v)=> setValueSelectRelevance(v)}
          />
        </div>
        {
          showSpiner ? <div className='spiner'><Loader color="orange" /></div> :

            <div className='container'>
              <div className='box-cards'>
                {
                  items ? items.map((v, i) => {
                    return (
                      <Card
                        key={v.id+v.volumeInfo.title}
                        title={v.volumeInfo.title}
                        img={v.volumeInfo.imageLinks ? v.volumeInfo.imageLinks.thumbnail : ''}
                        category={v.volumeInfo.categories}
                        auth={v.volumeInfo.authors}
                        post={v}
                      />
                    )
                  })
                    :
                    <div style={{ width: '100%', height: '50vh', display: 'flex', justifyContent: 'center', alignItems: "center" }}><img src='https://mbweb.b-cdn.net/assets/images/nobooks-ic.png' /></div>
                }
              </div>
              {
                reachedLimit ? <h1 onClick={() => handlerShowMoreBooks(20)} style={{ textAlign: "center", padding: "30px 0px", color: "blue" }} >Show more...</h1> : null
              }
              <ModalBook data={dataModal} />
            </div>
        }
      </div>
    </>

  );
}

export default App;
