import React,{useState} from 'react'
import './Hero.css'
import { Syntax } from '../Syntax/Syntax'

export const Hero = () => {
  const[code,setcode]=useState("");
  const[output,setOutput]=useState([]);
  const runcode = async () => {
    try {
      const response = await fetch("http://localhost:3000/execute", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ code }), // Sending the code
      });
      const result = await response.json();
  
      if (response.ok) {
        console.log(result.output.trim());
        const outputLines = result.output.split('\n').filter(line => line.trim() !== "");
        console.log(outputLines);
        console.log(typeof(outputLines));
        setOutput(outputLines); // Update the output area
      } else {
        setOutput(`Error: ${result.error}`);
      }
    } catch (err) {
      console.error("Error during fetch:", err);
      setOutput(`Failed to connect to the server: ${err.message}`);
    }
  };
  
  return (
    <div className='hero'>s
      <div className='textArea'>
        <Syntax/>
      </div>
      <div className='codeArea'>
        <textarea className="editor" placeholder="Write your code here..." onChange={(e)=>setcode(e.target.value)} value={code}></textarea>
        <button onClick={runcode} className='run-button'>Run Code</button>
        <div className="output" id="output" >
        {output.length > 0 ? (
          output.map((line, index) => (
            <p className="output_text" key={index} >{line}</p> // Each line of output is displayed in a separate <p> element
          ))
        ) : (
          <p>No output yet...</p> // If no output, show a placeholder
        )}
        </div>
      </div>      
    </div>
  )
}

