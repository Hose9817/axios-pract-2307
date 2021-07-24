import {useState} from "react";
import axios from "axios";
import ListItem from "./ListItem";

function App() {

    const [list, setList] = useState([]);

    const getList = () => {
        axios.get('https://nazarov-kanban-server.herokuapp.com/card')
            .then(res => {
                console.log(res)
                setList(res.data)
            })
            .catch(err => console.log(err))
    }

    const deleteList = async (id) => {
        await axios.delete(`https://nazarov-kanban-server.herokuapp.com/card/${id}`)
            .then(res => console.log(res))
            .catch(err => console.log(err))
        getList()
    }

    const createCard = async () => {
       await axios.post('https://nazarov-kanban-server.herokuapp.com/card', {
            name: 'Deep words -',
            description: 'Facta sunt potentiora verbis'
        })
            .then(res => console.log(res))
            .catch(err => console.log(err))

        getList();
    }


    return (
        <div>

            <h4>Axios</h4>

            <button onClick={getList}>Get list</button>
            <button onClick={createCard}>Create new card</button>
           <hr/>

            {list.map(el => <ListItem
                key={el._id}
                el={el}
                deleteList={deleteList}
            />)}
        </div>
    );
}


export default App;
