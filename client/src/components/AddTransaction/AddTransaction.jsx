import React, {useState, useContext} from 'react'
import { GlobalContext } from '../../context/GlobalState';

export const AddTransaction = () => {
  const [text, setText] = useState('');
  const [category, setCategory] = useState("")
  const [amount, setAmount] = useState(0);

  const { addTransaction } = useContext(GlobalContext);

  const onSubmit = e => {
    e.preventDefault();

    const newTransaction = {
      text,
      amount: +amount,
      category: category
    }

    addTransaction(newTransaction);
  }

  return (
    <>
      <h3>Pridėti nauja transakcija</h3>
      <form onSubmit={onSubmit}>

        <div className="form-control">
          <label htmlFor="text">Įrašas</label>
          <input type="text" value={text} onChange={(e) => setText(e.target.value)} placeholder="Įveskite įrašą..." />
        </div>

        
        <div className="form-control"> 
        <label htmlFor="category">Kategorija</label>
            <select value={category} onChange={(event) => setCategory(event.target.value)} type="category">
              <option className="categoryplaceholder" selected value="">Pasirinkite kategorija...</option>
              <option value="Maistas">Maistas</option>
              <option value="Transportas">Transportas</option>
              <option value="Komunalinės išlaidos">Komunalinės išlaidos</option>
              <option value="Asmeninės išlaidos">Asmeninės išlaidos</option>
              <option value="Mokesčiai">Mokesčiai</option>
              <option value="Būstas">Būstas</option>
            </select>
        </div>

        <div className="form-control">
          <label htmlFor="amount"
            >Suma <br />
            (minusas - išlaidos, pliusas - pajamos)
            </label>
          <input type="number" value={amount} onChange={(e) => setAmount(e.target.value)} placeholder="Enter amount..." />
        </div>
        <button className="btn">Pridėti operaciją</button>
      </form>
    </>
  )
}
