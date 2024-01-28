import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';
import logo from 'assets/logo.png';

import '@/renderer/styles/global.css';
import { Channel } from '@/common/channel';
import { FormEvent, useState } from 'react';

function Hello() {
    const [databaseResponse, setDatabaseResponse] = useState();

    const [formData, setFormData] = useState({
        name: '',
        passcode: '',
    });

    const handleOnSubmit = async (e: FormEvent) => {
        e.preventDefault();
        const response = await window.electron.ipcRenderer.invoke(
            Channel.CREATE_USER,
            {
                name: formData.name,
                passcode: formData.passcode,
            }
        );

        console.log('response', response);
        setDatabaseResponse(response);
    };

    const handleChange = (e: any) => {
        setFormData((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
        }));
    };

    return (
        <div className="w-full h-full bg-yellow-400">
            <img width="24px" height="24px" src={logo} />
            <div
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
            >
                <form
                    style={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '10px',
                    }}
                    onSubmit={handleOnSubmit}
                >
                    <div>
                        <label htmlFor="name">Name: </label>
                        <input
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                        />
                    </div>
                    <div>
                        <label htmlFor="passcode">Passcode: </label>
                        <input
                            id="passcode"
                            name="passcode"
                            value={formData.passcode}
                            onChange={handleChange}
                        />
                    </div>

                    <button type="submit">Create user</button>
                </form>
            </div>
            {databaseResponse && JSON.stringify(databaseResponse)}
        </div>
    );
}

export default function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Hello />} />
            </Routes>
        </Router>
    );
}
