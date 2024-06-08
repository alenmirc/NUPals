import React from 'react';
import './Message.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Nav from '../../Components/Navigation/Nav';

const Message = () => {
    return (
      <>
        <Nav/>
       
        <main className="content">
        <div className="container p-0">
            <h1 className="h3 mb-3">Messages</h1>

            <div className="card">
                <div className="row g-0">
                    <div className="col-12 col-lg-5 col-xl-3 border-right">
                        <div className="px-4 d-none d-md-block">
                            <div className="d-flex align-items-center">
                                <div className="flex-grow-1">
                                    <input type="text" className="form-control my-3" placeholder="Search..." />
                                </div>
                            </div>
                        </div>

                        {[
                            {
                                name: 'Vanessa Tucker',
                                img: 'https://bootdey.com/img/Content/avatar/avatar5.png',
                                status: 'Online',
                                badge: 5,
                            },
                            {
                                name: 'William Harris',
                                img: 'https://bootdey.com/img/Content/avatar/avatar2.png',
                                status: 'Online',
                                badge: 2,
                            },
                            {
                                name: 'Sharon Lessman',
                                img: 'https://bootdey.com/img/Content/avatar/avatar3.png',
                                status: 'Online',
                            },
                            {
                                name: 'Christina Mason',
                                img: 'https://bootdey.com/img/Content/avatar/avatar4.png',
                                status: 'Offline',
                            },
                            {
                                name: 'Fiona Green',
                                img: 'https://bootdey.com/img/Content/avatar/avatar5.png',
                                status: 'Offline',
                            },
                            {
                                name: 'Doris Wilder',
                                img: 'https://bootdey.com/img/Content/avatar/avatar2.png',
                                status: 'Offline',
                            },
                            {
                                name: 'Haley Kennedy',
                                img: 'https://bootdey.com/img/Content/avatar/avatar4.png',
                                status: 'Offline',
                            },
                            {
                                name: 'Jennifer Chang',
                                img: 'https://bootdey.com/img/Content/avatar/avatar3.png',
                                status: 'Offline',
                            },
                        ].map((user, index) => (
                            <a href="#" key={index} className="list-group-item list-group-item-action border-0">
                                {user.badge && <div className="badge bg-success float-right">{user.badge}</div>}
                                <div className="d-flex align-items-start">
                                    <img src={user.img} className="rounded-circle mr-1" alt={user.name} width="40" height="40" />
                                    <div className="flex-grow-1 ml-3">
                                        {user.name}
                                        <div className="small">
                                            <span className={`fas fa-circle chat-${user.status.toLowerCase()}`}></span> {user.status}
                                        </div>
                                    </div>
                                </div>
                            </a>
                        ))}

                        <hr className="d-block d-lg-none mt-1 mb-0" />
                    </div>
                    <div className="col-12 col-lg-7 col-xl-9">
                        <div className="py-2 px-4 border-bottom d-none d-lg-block">
                            <div className="d-flex align-items-center py-1">
                                <div className="position-relative">
                                    <img src="https://bootdey.com/img/Content/avatar/avatar3.png" className="rounded-circle mr-1" alt="Sharon Lessman" width="40" height="40" />
                                </div>
                                <div className="flex-grow-1 pl-3">
                                    <strong>Sharon Lessman</strong>
                                    <div className="text-muted small"><em>Typing...</em></div>
                                </div>
                                <div>
                                    <button className="btn btn-primary btn-lg mr-1 px-3">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-phone feather-lg">
                                            <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                                        </svg>
                                    </button>
                                    <button className="btn btn-info btn-lg mr-1 px-3 d-none d-md-inline-block">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-video feather-lg">
                                            <polygon points="23 7 16 12 23 17 23 7"></polygon>
                                            <rect x="1" y="5" width="15" height="14" rx="2" ry="2"></rect>
                                        </svg>
                                    </button>
                                    <button className="btn btn-light border btn-lg px-3">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-more-horizontal feather-lg">
                                            <circle cx="12" cy="12" r="1"></circle>
                                            <circle cx="19" cy="12" r="1"></circle>
                                            <circle cx="5" cy="12" r="1"></circle>
                                        </svg>
                                    </button>
                                </div>
                            </div>
                        </div>

                        <div className="position-relative">
                            <div className="chat-messages p-4">
                                {[
                                    {
                                        align: 'right',
                                        img: 'https://bootdey.com/img/Content/avatar/avatar1.png',
                                        time: '2:33 am',
                                        name: 'You',
                                        text: 'Lorem ipsum dolor sit amet, vis erat denique in, dicunt prodesset te vix.',
                                    },
                                    {
                                        align: 'left',
                                        img: 'https://bootdey.com/img/Content/avatar/avatar3.png',
                                        time: '2:34 am',
                                        name: 'Sharon Lessman',
                                        text: 'Sit meis deleniti eu, pri vidit meliore docendi ut, an eum erat animal commodo.',
                                    },
                                    {
                                        align: 'right',
                                        img: 'https://bootdey.com/img/Content/avatar/avatar1.png',
                                        time: '2:35 am',
                                        name: 'You',
                                        text: 'Cum ea graeci tractatos.',
                                    },
                                    {
                                        align: 'left',
                                        img: 'https://bootdey.com/img/Content/avatar/avatar3.png',
                                        time: '2:36 am',
                                        name: 'Sharon Lessman',
                                        text: 'Sed pulvinar, massa vitae interdum pulvinar, risus lectus porttitor magna, vitae commodo lectus mauris et velit. Proin ultricies placerat imperdiet. Morbi varius quam ac venenatis tempus.',
                                    },
                                    {
                                        align: 'left',
                                        img: 'https://bootdey.com/img/Content/avatar/avatar3.png',
                                        time: '2:37 am',
                                        name: 'Sharon Lessman',
                                        text: 'Cras pulvinar, sapien id vehicula aliquet, diam velit elementum orci.',
                                    },
                                    {
                                        align: 'right',
                                        img: 'https://bootdey.com/img/Content/avatar/avatar1.png',
                                        time: '2:38 am',
                                        name: 'You',
                                        text: 'Lorem ipsum dolor sit amet, vis erat denique in, dicunt prodesset te vix.',
                                    },
                                    {
                                        align: 'left',
                                        img: 'https://bootdey.com/img/Content/avatar/avatar3.png',
                                        time: '2:39 am',
                                        name: 'Sharon Lessman',
                                        text: 'Sit meis deleniti eu, pri vidit meliore docendi ut, an eum erat animal commodo.',
                                    },
                                ].map((message, index) => (
                                    <div key={index} className={`chat-message-${message.align} pb-4`}>
                                        <div>
                                            <img src={message.img} className="rounded-circle mr-1" alt={message.name} width="40" height="40" />
                                            <div className="text-muted small text-nowrap mt-2">{message.time}</div>
                                        </div>
                                        <div className="flex-shrink-1 bg-light rounded py-2 px-3 mr-3">
                                            <div className="font-weight-bold mb-1">{message.name}</div>
                                            {message.text}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="flex-grow-0 py-3 px-4 border-top">
                            <div className="input-group">
                                <input type="text" className="form-control" placeholder="Type your message" />
                                <button className="btn btn-primary">Send</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </main>
);
};
</>
    );
};

export default Message;
