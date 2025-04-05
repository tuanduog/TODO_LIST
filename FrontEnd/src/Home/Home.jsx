import React from "react";
import '../Home/Home.css';
// import "bootstrap/dist/css/bootstrap.min.css";
// import 'bootstrap/dist/js/bootstrap.bundle.min';
import { useState, useEffect } from "react";
import axios from 'axios';

function Home () {
    const [work, setWork] = useState("");

    const [works, setWorks] = useState([]);
    const [isFix, setIsFix] = useState(false);
    const [workFix, setWorkFix] = useState("");
    const [doneFix, setDoneFix] = useState(false);
    const [idFix, setIdFix] = useState("");

    const handleAdd = async () => {
        const newWork = {work, done: false};
        const res = await axios.post('http://localhost:5000/api/add-work', newWork);
        console.log("Added ok", res.data);
        alert("Added work successfully!");
        setWork("");
        fetchWork();
    }

    const fetchWork = async () => {
        const response = await axios.get('http://localhost:5000/api/get-work');
        setWorks(response.data.works);
    }
    
    useEffect(() => {
        fetchWork();
    }, [])

    const handleDelete = async (id) => {
        const res = await axios.delete(`http://localhost:5000/api/delete-work/${id}`);
        console.log(res.data);
        alert("Delete successfully!");
        fetchWork();
    }
    const handleFix = async (id, work, done) => {
        setIsFix(true);
        setWorkFix(work);
        setDoneFix(done);
        setIdFix(id);
    }

    const handleChange = async () => {
        const wf = { work: workFix, done: doneFix};
        const res = await axios.put(`http://localhost:5000/api/change-work/${idFix}`, wf);
        console.log(res.data);
        alert("Changed successfully!");
        fetchWork();
    }

    return (
        <>
            <h1>To-do list</h1>
            <div className="add">
                <input placeholder="Enter a work need to do" value={work} onChange={(e) => setWork(e.target.value)}></input>
                <button className="btnAdd" onClick={handleAdd}>Add</button>
            </div>
            <div className="list">
                <table>
                    <caption style={{fontSize: '25px', paddingBottom: '5px'}}><strong>List of work</strong></caption>
                    <tr>
                        <th>No</th>
                        <th>Work</th>
                        <th>Done</th>
                        <th colSpan={2}>Del/Fix</th>
                    </tr>
        
                    {works.map((work, index) => (
                    <tr key={work._id}>
                        <td>{index + 1}</td>
                        <td>{work.work}</td>
                        <td><input type="checkbox" checked={work.done} readOnly style={{width: '20px'}}></input></td>
                        <td><button style={{padding: '5px', width: '40px', cursor: 'pointer'}} onClick={() => handleFix(work._id, work.work, work.done)}>Fix</button></td>
                        <td><button style={{padding: '5px', width: '40px', cursor: 'pointer'}} onClick={() => handleDelete(work._id)}>Del</button></td>
                    </tr>
                    ))}
         
                </table>
                
            </div>
            <div style={{ display: 'flex', justifyContent: 'center', width: '100%', marginTop: '30px' }}>
                {isFix && (
                    <div style={{ width: '30%', display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <input
                      type="text"
                      placeholder="Fix your item"
                      style={{ width: '120%' }}
                        value={workFix}
                        onChange={(e) => setWorkFix(e.target.value)}
                    />
                    <input type="checkbox" checked={doneFix} style={{width: '20%'}} onChange={(e) => setDoneFix(e.target.checked)}/>
                    <button style={{height: '40px', width: '40%', cursor: 'pointer'}} onClick={() => handleChange()}>Change</button>
                    </div>
                )}
            </div>

        </>
    );
}

export default Home;