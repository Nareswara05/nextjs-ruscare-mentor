"use client"

import React, { useState, useEffect } from 'react';
import ActionMailbox from './components/action-mailbox';
import MailList from './components/mail-list';
import SearchMailbox from './components/search-mailbox';
import MailDetailPopup from './components/detail-mail-popup';
import getMailboxMentor from '@/app/lib/service/endpoint/mentor/mailbox-mentor';
import { ClipLoader } from 'react-spinners';

const Page = () => {
    const [mails, setMails] = useState([]);
    const [selectedMail, setSelectedMail] = useState(null);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        const fetchMails = async () => {
            const data = await getMailboxMentor();
            setMails(data);
            setLoading(false);
        };

        fetchMails();
    }, []);

    const handleMailClick = (mail) => {
        setSelectedMail(mail);
    };

    const handleClosePopup = () => {
        setSelectedMail(null);
    };

    

    return (
        <div className='p-4 bg-white'>
            {/* <div className='flex justify-between'>
                <SearchMailbox />
                <ActionMailbox />
            </div> */}
            {loading ? (
                <div className="bg-white h-screen flex justify-center items-center">
                    <ClipLoader size={50} color={"#123abc"} loading={loading} />
                </div>) : (
                mails.map((mail) => (
                    <MailList
                        key={mail.id}
                        data={mail}
                        onClick={() => handleMailClick(mail)}
                    />
                ))
            )}
            <MailDetailPopup data={selectedMail} onClose={handleClosePopup} />
        </div>
    );
};

export default Page;
