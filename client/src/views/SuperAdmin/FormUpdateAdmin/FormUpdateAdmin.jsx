import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { updateAdministrator } from '../../../redux/actions'; // Import the action to update an admin

function DashboardSuperAadmins() {
    // ...existing code...

    const [selectedAdmin, setSelectedAdmin] = useState(null);

    function handleEdit(row) {
        setSelectedAdmin(row);
    }

    function handleUpdateAdmin(updatedAdmin) {
        dispatch(updateAdministrator(updatedAdmin));
        setSelectedAdmin(null); // Clear the selected admin after updating
    }

    return (
        <>
            {/* ...existing code... */}
            {selectedAdmin && <UpdateAdminForm admin={selectedAdmin} onUpdate={handleUpdateAdmin} />}
        </>
    );
}

function UpdateAdminForm({ admin, onUpdate }) {
    const [name, setName] = useState(admin.name);
    const [mail, setMail] = useState(admin.mail);
    const [club, setClub] = useState(admin.club);
    const [status, setStatus] = useState(admin.status);

    function handleSubmit(e) {
        e.preventDefault();
        onUpdate({ ...admin, name, mail, club, status });
    }

    return (
        <form onSubmit={handleSubmit}>
            <label>
                Name:
                <input type="text" value={name} onChange={e => setName(e.target.value)} />
            </label>
            <label>
                Email:
                <input type="email" value={mail} onChange={e => setMail(e.target.value)} />
            </label>
            <label>
                Club:
                <input type="text" value={club} onChange={e => setClub(e.target.value)} />
            </label>
            <label>
                Status:
                <input type="text" value={status} onChange={e => setStatus(e.target.value)} />
            </label>
            <button type="submit">Update Admin</button>
        </form>
    );
}

export default DashboardSuperAadmins;