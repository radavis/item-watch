const currentUserId = () => 1;

// https://reactjs.org/docs/context.html#when-to-use-context
const WatchListContext = React.createContext(null)

const watchListReducer = (state, action) => {
  switch(action.type) {
    case 'ADD_ITEM':
      // console.log('ADD_ITEM')
      // console.log([...state, action.payload])
      return [...state, action.payload]
    case 'REMOVE_ITEM':
      // console.log('REMOVE_ITEM')
      // console.log(state.filter(item => item !== action.payload))
      return state.filter(item => item !== action.payload)
    case 'SET_ITEMS':
      // console.log('SET_ITEMS')
      // console.log(action.payload)
      return action.payload
    default:
      return state
  }
}

const Star = ({ onClick }) => (
  <svg onClick={onClick} xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24">
    <path d="M0 0h24v24H0z" fill="none"/>
    <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/>
    <path d="M0 0h24v24H0z" fill="none"/>
  </svg>
)

const StarBorder = ({ onClick }) => (
  <svg onClick={onClick} xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24">
    <path d="M22 9.24l-7.19-.62L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21 12 17.27 18.18 21l-1.63-7.03L22 9.24zM12 15.4l-3.76 2.27 1-4.28-3.32-2.88 4.38-.38L12 6.1l1.71 4.04 4.38.38-3.32 2.88 1 4.28L12 15.4z"/>
    <path d="M0 0h24v24H0z" fill="none"/>
  </svg>
)

const StarWatch = ({ itemId }) => {
  const { watchList, dispatchWatchList } = React.useContext(WatchListContext)

  const watching = () => watchList.includes(itemId)

  const handleClick = () => {
    if (watching()) {
      // API DELETE request, then dispatchWatchList
      fetch(`/users/${currentUserId()}/items/${itemId}`, { method: 'DELETE' })
      .then(response => {
        if (response.ok) {
          return response
        } else {
          throw new Error(response.status)
        }
      })
      .then(() => dispatchWatchList({ type: 'REMOVE_ITEM', payload: itemId }))
    } else {
      // API POST request, then dispatchWatchList
      fetch(`/users/${currentUserId()}/items`, {
        method: 'POST',
        body: JSON.stringify({ item_id: itemId }),
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'same-origin'
      })
      .then(response => {
        if (response.ok) {
          return response
        } else {
          throw new Error(response.status)
        }
      })
      .then(() => dispatchWatchList({ type: 'ADD_ITEM', payload: itemId }))
    }
  }

  return (
    <React.Fragment>
      {watching() && <Star onClick={handleClick} />}
      {!watching() && <StarBorder onClick={handleClick} />}
    </React.Fragment>
  )
};

const Item = ({ item }) => (
  <div>
    <StarWatch itemId={item.id} />
    <span>{item.name}</span>
  </div>
)

const App = () => {
  const [items, setItems] = React.useState([])
  const [watchList, dispatchWatchList] = React.useReducer(watchListReducer, [])

  React.useEffect(() => {
    const fetchItems = async () => {
      const result = await fetch(`/items`)
        .then(response => response.text())
        .then(text => JSON.parse(text))
      setItems(result)
    }
    fetchItems()

    const fetchWatchList = async () => {
      const result = await fetch(`/users/${currentUserId()}/items`)
        .then(response => response.text())
        .then(text => JSON.parse(text))
      const ids = result.map(item => item.id)
      dispatchWatchList({ type: 'SET_ITEMS', payload: ids })
    }
    fetchWatchList()
  }, [])

  return (
    <WatchListContext.Provider value={{ watchList, dispatchWatchList }}>
      <div>
        <h2>List A</h2>
        {items.map((item, i) => <Item item={item} key={i} />)}
      </div>
      <div>
        <h2>List B</h2>
        {items.map((item, i) => <Item item={item} key={i} />)}
      </div>
    </WatchListContext.Provider>
  )
}

ReactDOM.render(
  <App />,
  document.getElementById('react-root')
)
