import { useState } from 'react';
import { AiOutlineCodepen, AiOutlineLoading3Quarters } from "react-icons/ai";
import { FaEdit, FaTrash, FaSave, FaTimes, FaRegUser, FaPlayCircle } from "react-icons/fa";
import axios from 'axios';
import { PromptHistorySchema } from '@/schemas/promptHistorySchema';    
import ReactMDView from './ReactMDView'; 

const Message = ({ message, onEdit, onDelete, onRerun, loading }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [editText, setEditText] = useState(message.text);

    const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);

    const handleEditClick = () => {
        setIsEditing(true);
        setEditText(message.text);
    };

    const handleSaveEdit = () => {
        onEdit(message.id, editText);
        setIsEditing(false);
    };

    const handleCancelEdit = () => {
        setIsEditing(false);
    };

    const handleDeleteClick = () => {
        setShowDeleteConfirmation(true);
    };

    const handleConfirmDelete = () => {
        setShowDeleteConfirmation(false);
        onDelete(message.id);
    };

    const handleCancelDelete = () => {
        setShowDeleteConfirmation(false);
    };


    return (
        <div className="mb-2 items-center bg-white w-full rounded-2xl shadow-md shadow-black/30 p-3 pb-4 ">
            <div className={`text-sm font-normal`}>
                <div className='flex justify-between items-center'>
                    <span className={` bg-green-700 px-2 py-2 text-md rounded-full  text-white`}>
                        {message.user === 'user' ? <FaRegUser /> : <AiOutlineCodepen />}
                    </span>
                    <div >
                        {isEditing && (
                            <div className="flex items-center">
                                <button
                                    className="px-2 py-2 text-md rounded-full text-white bg-green-700  mr-2"
                                    onClick={handleSaveEdit}
                                >
                                    <FaSave />
                                </button>
                                <button
                                    className="px-2 py-2 text-md rounded-full text-white bg-green-700 "
                                    onClick={handleCancelEdit}
                                >
                                    <FaTimes />
                                </button>
                            </div>
                        )}
                        {!isEditing && (
                            <div className='flex items-center mt-2'>
                                {message.user === 'user' && !loading &&
                                    <button
                                        className="px-2 py-2 text-md rounded-full text-white bg-green-700  mr-2"
                                        onClick={() => {
                                            onRerun(message.id);
                                        }}
                                    >
                                        <FaPlayCircle />
                                    </button>
                                }
                                {message.user === 'user' && loading &&
                                    <button
                                        className="px-2 py-2 text-md rounded-full text-white bg-green-700 mr-2"
                                    >
                                        <AiOutlineLoading3Quarters className='animate-spin font-bold' />

                                    </button>
                                }
                                <button
                                    className="px-2 py-2 text-md rounded-full text-white bg-green-700  mr-2"
                                    onClick={handleDeleteClick}
                                >
                                    <FaTrash />
                                </button>
                                <button
                                    className="px-2 py-2 text-md rounded-full text-white bg-green-700"
                                    onClick={handleEditClick}
                                >
                                    <FaEdit />
                                </button>
                            </div>
                        )}
                    </div>
                </div>
                <hr className='mt-2 mb-2 border-green-700' />
                {isEditing ? (
                    <div>
                        <textarea
                            value={editText}
                            onChange={(e) => setEditText(e.target.value)}
                            className="w-full rounded-xl shadow-md shadow-black/50 border bg-white p-2 pb-0 resize-none focus:outline-none focus:none hover:bg-green-100 transition-all duration-50 h-52 moderscroller"

                        />
                    </div>
                ) : (
                    <ReactMDView prompt={message.text} />
                )}
            </div>

            {showDeleteConfirmation && (
                <div className="fixed top-0 left-0 z-50 flex items-center justify-center w-screen h-screen bg-black/50">
                    <div className="bg-white px-4 py-4 rounded-lg shadow-md">
                        <p className="text-lg font-semibold mb-2">Delete this message?</p>
                        <div className="flex justify-end gap-2">
                            <button
                                className="px-2 py-1.5 text-md rounded-full text-green-700 w-16 "
                                onClick={handleConfirmDelete}
                            >
                                Yes
                            </button>
                            <button
                                className="px-2 py-1.5 text-md rounded-full text-green-700 w-16"
                                onClick={handleCancelDelete}
                            >
                                No
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

const ChatWindow = () => {
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState('');
    const [loading, setLoading] = useState(false);

    const handleInputChange = (e) => {
        setNewMessage(e.target.value);
    };

    const handleSend = async () => {
        if (newMessage.trim() !== '') {
            const newMessageId = messages.length > 0 ? Math.max(...messages.map(m => m.id)) + 1 : 1;
            setMessages([...messages, { id: newMessageId, user: 'user', text: newMessage }]);
            setNewMessage('');

            try {
                setLoading(true)
                const history = messages.map(message => ({
                    role: message.user === 'user' ? 'user' : 'model',
                    parts: [{ text: message.text }]
                }));

                const validatedHistory = PromptHistorySchema.safeParse(history);

                if (validatedHistory.success) {
                    const response = await axios.post('/api/gemini/chat', {
                        history: validatedHistory.data,
                        prompt: newMessage
                    });
                    console.log(response.data.message)
                    console.log(response.data)
                    setMessages([...messages, { id: newMessageId, user: 'user', text: newMessage }, { id: newMessageId + 1, user: 'model', text: response.data.message }]);

                } else {
                    console.error("Invalid chat history:", validatedHistory.error.message);
                }
            } catch (err) {
                console.log(err)
            }
            finally {
                setLoading(false)
            }
        }
    };

    const handleEditMessage = (messageId, newText) => {
        setMessages(messages.map(message => {
            if (message.id === messageId) {
                return { ...message, text: newText };
            }
            return message;
        }));
    };

    const handleDeleteMessage = (messageId) => {
        setMessages(messages.filter(message => message.id !== messageId));
    };



    const handleRerunMessage = async (messageId) => {
        const messageIndex = messages.findIndex(message => message.id === messageId);

        const history = messages.slice(0, messageIndex).map(message => ({
            role: message.user === 'user' ? 'user' : 'model',
            parts: [{ text: message.text }]
        }));
        const prompt = messages[messageIndex].text;

        try {
            setLoading(true)
            const validatedHistory = PromptHistorySchema.safeParse(history);

            if (validatedHistory.success) {
                const response = await axios.post('/api/gemini/chat', {
                    history: validatedHistory.data,
                    prompt: prompt
                });
                console.log(response.data.message)
                console.log(response.data)
                // check allmessage have modle message after index or not 
                let allmsghavemodlerespafterindex = false
                let indexofmodlereplacermessage = 0
                for (let i = messageIndex + 1; i < messages.length; i++) {
                    if (messages[i].user === 'model') {
                        allmsghavemodlerespafterindex = true
                        indexofmodlereplacermessage = i
                        break
                    }
                }
                if (allmsghavemodlerespafterindex) {
                    const updaedmessages = [...messages]
                    updaedmessages[indexofmodlereplacermessage] = { id: messageId + 1, user: 'model', text: response.data.message }
                    setMessages(updaedmessages)

                } else {
                    setMessages([...messages, { id: messageId + 1, user: 'model', text: response.data.message }])
                }

            } else {
                console.error("Invalid chat history:", validatedHistory.error.message);
            }
        } catch (err) {
            console.log(err);
        }
        finally {
            setLoading(false)
        }
    };

    return (
        <div className="flex flex-col h-full bg-secondary-color">
            <div className="flex flex-col grow overflow-auto p-2 moderscroller"

            >
                {messages.map((message, index) => (
                    <Message
                        key={index}
                        message={message}
                        onEdit={handleEditMessage}
                        onDelete={handleDeleteMessage}
                        onRerun={handleRerunMessage}
                        loading={loading}
                    />
                ))}
            </div>
            <div className=" p-2 w-full">
                <div className='w-full flex gap-2 rounded-3xl p-2 bg-white'>
                    <textarea
                        type="text"
                        className="max-h-52 min-h-20 rounded-2xl p-2 h-24 focus:outline-none focus:none grow moderscroller"
                        value={newMessage}
                        onChange={handleInputChange}
                        placeholder="Type your message..."
                        onKeyDown={(e) => {
                            if (e.ctrlKey && e.key === 'Enter') {
                                e.preventDefault();
                                handleSend();
                            }
                        }}
                    />
                    {!loading ? <button
                        className="mytextarea rounded-2xl bg-white focus:outline-none focus:none hover:bg-green-100 transition-all duration-50 shadow-md shadow-black/30 font-bold py-2 px-3 focus:shadow-outline text-center"
                        onClick={handleSend}
                    >
                        <AiOutlineCodepen className='text-green-700 text-xl sm:text-3xl' />
                    </button>
                        :
                        <button
                            className="mytextarea rounded-2xl bg-white focus:outline-none focus:none hover:bg-green-100 transition-all duration-50 shadow-md shadow-black/30 font-bold py-2 px-3 focus:shadow-outline text-center"
                            onClick={handleSend}
                        >
                            <AiOutlineLoading3Quarters className='text-green-700 text-xl sm:text-3xl animate-spin' />
                        </button>}
                </div>
            </div>
        </div>
    );
};

export default ChatWindow;