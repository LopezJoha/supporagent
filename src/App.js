import React, {useState} from 'react'; 
import './App.css';
import Header from './components/Header';

function App() {
  const [url, setUrl] = useState('');  
  
  const objectToCsv = function(data) {   
    const csvRows = [];    
    const headers = Object.keys(data[0]); // get the headers 
    const newHeaders = headers.filter(find => {
      return find !== "client_details"
    });
    newHeaders.push('orders_count');
    
    csvRows.push(newHeaders.join(';'))

    for (let order of data) { // loop over the rows
        let values = newHeaders.map(header => {   
          switch(header){
            case 'customer': return "\""+(''+order["customer"]["first_name"]+" "+order["customer"]["last_name"]).replace(/"/g, '\\"')+"\""
            case 'orders_count': return "\""+(''+order["customer"]["orders_count"]).replace(/"/g, '\\"')+"\""
            default: return "\""+(''+order[header]).replace(/"/g, '\\"')+"\""
          } 
        });    
          
       csvRows.push(values.join(';'));  
    }
      
    return csvRows.join('\n');  // form escaped comma separated values  
  };

  const download = function(data){
    const blob = new Blob([data], {type: 'text/csv'});
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.setAttribute('hidden', '');
    a.setAttribute('href', url);
    a.setAttribute('download', 'Orders.csv');
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  const getCsv = async function(){     
      const rawResponse = await fetch(url, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify()
    });
    
    const content = await rawResponse.json();
      content.map( row => ({}));
      const csvData = objectToCsv(content);
      
       download(csvData)
      return csvData
  };

  return (
    <div className="App">       
      <Header/>
      <div className='containerForm'>     
          <input 
            type = "text"
            value = {url}
            onChange = {(e) => setUrl(e.target.value)}
            placeholder = "Ingrese la URL de la API" 
            onSubmit={getCsv}
          />             
          <button onClick={getCsv}>Descargar CSV </button> 
        </div>    
      </div>
  );
}

export default App;

