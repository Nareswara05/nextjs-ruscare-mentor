import { useState } from 'react';

export default function RescheduleModal({ isOpen, onClose, onSubmit }) {
    const [date, setDate] = useState('');
    const [time, setTime] = useState('');
    const [place, setPlace] = useState('');

    const handleSubmit = () => {
        onSubmit({ date, time, place });
        onClose();
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center z-50 text-textPrimary">
            <div className="bg-white p-6 rounded-lg shadow-lg w-[450px]">
                <h2 className="text-2xl font-bold mb-6">Jadwal Ulang Konseling</h2>
                
                <label className="block mb-2 font-medium">Tentukan Tanggal Baru:</label>
                <input
                    type="date"
                    className="w-full p-2 border rounded mb-4"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                />
                
                <label className="block mb-2 font-medium">Tentukan waktu baru:</label>
                <select
                    className="w-full p-2 border rounded mb-4"
                    value={time}
                    onChange={(e) => setTime(e.target.value)}
                >
                    <option value="">Pilih Waktu</option>
                    <option value="08.00 - 09.00">08.00 - 09.00</option>
                    <option value="10.00 - 11.00">10.00 - 11.00</option>
                    <option value="12.00 - 13.00">12.00 - 13.00</option>
                    <option value="14.00 - 15.00">14.00 - 15.00</option>
                </select>
                
                <label className="block mb-2 font-medium">Tentukan tempat baru:</label>
                <input
                    type="text"
                    className="w-full p-2 border rounded mb-4"
                    placeholder="Enter new place"
                    value={place}
                    onChange={(e) => setPlace(e.target.value)}
                />
                
                <div className="flex justify-end">
                    <button 
                        className="bg-gray-500 text-white px-4 py-2 rounded mr-2" 
                        onClick={onClose}
                    >
                        Cancel
                    </button>
                    <button 
                        className="bg-primary font-semibold text-white px-4 py-2 rounded" 
                        onClick={handleSubmit}
                    >
                        Reschedule
                    </button>
                </div>
            </div>
        </div>
    );
}
